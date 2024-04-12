const { asyncGet, asyncExists, asyncMultiExec, asyncPttl, asyncSet } = require('../database/redis')
const chatHandler = require('../websocket/chatHandler.js')
const conf = require('../config/')
const { aiPlayerMetaData } = require('./playCard.js')
const logger = require('../common/log')
const poker = require('../common/poker.js')
const { getRandom } = poker
const gameHandler = require('../websocket/gameHandler')

/** 
 * @typedef {import('../types/game.js').RedisCacheGame}
 * @typedef {import('../types/game.js').GameWebsocketRequestData}
 * @typedef {import('../types/room.js').RedisCacheRoomInfo}
 * @typedef {import('../types/room.js').RoomChatWebsocketRequestData}
 * @typedef {import('../types/common.js').GamePlayerSeatIndex}
 * @typedef {import('../types/websocket.js').WebSocketRequestRawData}
 */

/** 
 * @summary 컴퓨터플레이어聊天的处理。
 * @param {number} id 게임房间id/게임id。
 * @param {WebSocketServerInfo} wss WebSocketServer信息，包含所有플레이어的WebSocket连接。
 * @returns {Promise<void>}
 */
async function chatIntervalHandler(id, wss) {
    const gameRes = await asyncGet(conf.redisCache.gamePrefix + id)
    if (gameRes === null) { // 게임不存在，则处理在房间中的聊天
        const gameRoomRes = await asyncGet(conf.redisCache.gameRoomPrefix + id)
        if (gameRoomRes === null) {
            return
        }
        /** @type {RedisCacheRoomInfo} */
        const gameRoom = JSON.parse(gameRoomRes)
        /** @type {number[]} */
        const aiPlayerIds = []
        for (let i = 0; i < Object.keys(gameRoom.playerList).length; i++) {
            /** @type {GamePlayerSeatIndex} */
            const iSeatIndex = i
            if (gameRoom.playerList[iSeatIndex].id < 0) {
                aiPlayerIds.push(gameRoom.playerList[iSeatIndex].id)
            }
        }
        if (aiPlayerIds.length === 0) { // 无컴퓨터플레이어存在则结束处理
            return
        }
        aiPlayerIds.forEach(async aiPlayerId => {
            if (await aiPlayerChatCooldown(id, aiPlayerId) === false) return
            const aiPlayerChatKey = conf.redisCache.aiChatPrefix + id + ':' + aiPlayerId // 发言前缀:房间id:컴퓨터플레이어id
            const aiPlayerIndex = -1 * (aiPlayerId + 1)
            const aiPlayerChatContent = aiPlayerChatContents[aiPlayerIndex]
            /** @type {string[]} */
            let chatContents = [].concat(commonChatContent)
            if (gameRoom.lastLoser === aiPlayerId) { chatContents = chatContents.concat(loserChatContent) }
            else if (gameRoom.lastWinner === aiPlayerId) { chatContents = chatContents.concat(winnerChatContent) }
            chatContents = chatContents.concat(aiPlayerChatContent.content)
            const results = await asyncMultiExec([['set', aiPlayerChatKey, aiPlayerId], ['expire', aiPlayerChatKey, 10 - aiPlayerChatContent.talkative]])()
            if (results === null) {
                logger.error(e)
            }
            /** @type {WebSocketRequestRawData & RoomChatWebsocketRequestData} */
            const chatResponseDto = {
                type: 'chat',
                userId: aiPlayerId,
                nickname: aiPlayerMetaData[aiPlayerIndex].nickname,
                player_loc: id,
                text: chatContents[Math.floor(Math.random() * chatContents.length)]
            }
            chatHandler(chatResponseDto, wss)
        })
        return
    }
    // 게임存在，则处理게임中聊天
    /** @type {RedisCacheGame} */
    const game = JSON.parse(gameRes)
    /** @type {[ {aiPlayerId: number, seatIndex: GamePlayerSeatIndex} ]} */
    const aiPlayerIdSeatIndexList = []
    for (let i = 0; i < Object.keys(game.gamePlayer).length; i++) {
        /** @type {GamePlayerSeatIndex} */
        const iSeatIndex = i
        if (game.gamePlayer[iSeatIndex].id < 0) {
            aiPlayerIdSeatIndexList.push({ aiPlayerId: game.gamePlayer[iSeatIndex].id, seatIndex: iSeatIndex })
        }
    }
    if (aiPlayerIdSeatIndexList.length === 0) { // 无컴퓨터플레이어存在则结束处理
        return
    }
    const playCardTimerkey = conf.redisCache.aiChatPrefix + id + ':' + conf.redisCache.playCardTimerKeyStr
    const playCardTimerPExpire = await asyncPttl(playCardTimerkey)
    if (playCardTimerPExpire > 0 && playCardTimerPExpire < (poker.waitTime * 0.6)) {
        const pushTimes = parseInt(await asyncGet(playCardTimerkey) || 0) // 催促次数，不超过컴퓨터플레이어的健谈程度
        aiPlayerIdSeatIndexList.forEach(async ({ aiPlayerId, seatIndex }) => {
            if (await aiPlayerChatCooldown(id, aiPlayerId) === false || game.currentPlayer === seatIndex) return
            const aiPlayerChatKey = conf.redisCache.aiChatPrefix + id + ':' + aiPlayerId // 发言前缀:房间id:컴퓨터플레이어id
            const aiPlayerIndex = -1 * (aiPlayerId + 1)
            const aiPlayerChatContent = aiPlayerChatContents[aiPlayerIndex]
            const playCardTimerExpire = playCardTimerPExpire / 1000
            if (getRandom(0, playCardTimerExpire) <= aiPlayerChatContent.talkative && pushTimes < aiPlayerChatContent.talkative) { // 所剩时间越少，컴퓨터플레이어越倾向于催促
                textToPlayerInGame(game, aiPlayerChatContent, aiPlayerGameMessages[1], seatIndex, game.currentPlayer, aiPlayerChatKey, wss)
                await asyncSet(playCardTimerkey, pushTimes + 1)
            }
        })
    }
    if (game.remainCards.length === 0) {
        aiPlayerIdSeatIndexList.forEach(async ({ aiPlayerId, seatIndex }) => {
            if (await aiPlayerChatCooldown(id, aiPlayerId) === false) return
            const aiPlayerChatKey = conf.redisCache.aiChatPrefix + id + ':' + aiPlayerId // 发言前缀:房间id:컴퓨터플레이어id
            const aiPlayerIndex = -1 * (aiPlayerId + 1)
            const aiPlayerChatContent = aiPlayerChatContents[aiPlayerIndex]
            if (game.gamePlayer[seatIndex].remainCards.length <= aiPlayerChatContent.talkative && getRandom(0, 50) <= aiPlayerChatContent.talkative) { // 컴퓨터플레이어牌越少越倾向于再来一국
                textToPlayerInGame(game, aiPlayerChatContent, aiPlayerGameMessages[3], seatIndex, -1, aiPlayerChatKey, wss)
            }
        })
    }
}


/** 
 * @summary 在게임中전송聊天语音信息。
 * @param {RedisCacheGame} game 게임。
 * @param {AiPlayerChatContent} aiPlayerChatContent 컴퓨터플레이어聊天属性。
 * @param {AiPlayerGameMessage} aiPlayerGameMessage 컴퓨터플레이어聊天信息。
 * @param {GamePlayerSeatIndex} sourceSeatIndex 发出信息컴퓨터플레이어座位。
 * @param {GamePlayerSeatIndex | -1} [targetSeatIndex = -1] 接받다信息플레이어座位，默认-1。
 * @param {string} aiPlayerChatKey 储存在redis中的컴퓨터플레이어key。
 * @param {WebSocketServerInfo} wss WebSocketServer信息，包含所有플레이어的WebSocket连接。
 * @returns {Promise<void>}
 */
async function textToPlayerInGame(game, aiPlayerChatContent, aiPlayerGameMessage, sourceSeatIndex, targetSeatIndex, aiPlayerChatKey, wss) {
    /** @type {GameWebsocketRequestData & WebSocketRequestRawData} */
    const data = {
        type: "game",
        userId: aiPlayerChatContent.id,
        action: "textToPlayer",
        id: game.id,
        source: sourceSeatIndex,
        target: targetSeatIndex,
        targetId: game.gamePlayer[targetSeatIndex]?.id || 0,
        sourceId: aiPlayerChatContent.id,
        text: aiPlayerGameMessage.text,
        soundSrc: aiPlayerGameMessage.music,
    }
    gameHandler(data, wss)
    const results = await asyncMultiExec([['set', aiPlayerChatKey, aiPlayerChatContent.id], ['expire', aiPlayerChatKey, 10 - aiPlayerChatContent.talkative]])()
    if (results === null) {
        logger.error(e)
    }
}


/** 
 * @summary 얻다컴퓨터플레이어是否可聊天的boolean。
 * @param {number} id 게임房间id/게임id。
 * @param {number} aiPlayerId 컴퓨터플레이어id。
 * @returns {Promise<boolean>}
 */
async function aiPlayerChatCooldown(id, aiPlayerId) {
    if (id === 0 || aiPlayerId >= 0) return false
    const aiPlayerChatKey = conf.redisCache.aiChatPrefix + id + ':' + aiPlayerId // 发言前缀:房间id:컴퓨터플레이어id
    const isAiPlayerHasChat = await asyncExists(aiPlayerChatKey)
    if (isAiPlayerHasChat > 0) { // 该컴퓨터플레이어尚有发言在缓存中，则不继续发言
        return false
    }
    const aiPlayerIndex = -1 * (aiPlayerId + 1)
    const aiPlayerChatContent = aiPlayerChatContents[aiPlayerIndex]
    if (Math.random() * 50 > aiPlayerChatContent.talkative) { // 若컴퓨터플레이어的健谈程度小于随机值则结束处理
        return false
    }
    return true
}

const commonChatContent = [
    '오늘 날씨가 좋네요.',
    '오늘도 좋은 하루입니다.',
    '시간 나실 때 오셔서 더 많이 놀아보세요.',
    '다음에 같이 놀자.',
    '경전을 배우기 위해 서부로 갈 준비가 되셨나요? ',
    '재미있게 게임하자! ',
    '난 준비됐어, 너는 어때? ',
    '편안하게 게임을 즐기세요. ',
    '나에게 패배할 준비가 되셨나요? ',
]

const winnerChatContent = [
    '잘자 오늘 밤엔 치킨 먹자。',
    '다음에 또 도전하러 오세요!',
    '다음번에는 행운을 빌어요!',
    '낙심하지 말고 계속해서 좋은 일을 하시기 바랍니다.',
    '모든 단계가 중요하므로 신중하게 선택하세요.',
    '나를 이기고 싶나요? 아직은 이르다!',
    '나에게 도전해 보세요. 나는 자비를 베풀지 않을 것입니다.',
    '승리는 정말 멋진 맛이고 당신도 그것을 맛볼 수 있기를 바랍니다.',
    '나는 이기고 너는 진다. 인생은 정말 멋지다!',
    '이것이 나의 힘이다.',
    '오늘은 운이 좋은 것 같아요.',
    '오늘은 행운의 여신이 내 편입니다.',
    '당신과 함께 플레이해서 즐거웠습니다.',
]

const loserChatContent = [
    '다음에는 더 좋은 일이 있었으면 좋겠습니다. ',
    '다음에는 꼭 이겨야 한다. ',
    '다음에도 잘 부탁해! ',
    '승패가 표준적인 문제입니다. ',
    '승패도 모두 게임의 일부이며, 그 과정을 즐기는 것이 가장 중요합니다. ',
    '오늘 정말 힘들다. ',
    '오늘 행운의 여신은 내 편이 아니다. ',
    '이제 시작하고 내가 반격하는 것을 기다리는 것이 문제입니다. ',
]

/** 
 * @typedef {object} AiPlayerChatContent
 * @property {number} id 컴퓨터플레이어的id
 * @property {1|2|3|4|5} talkative 健谈程度,值越高则说话越频繁。
 * @property {string[]} content 컴퓨터플레이어的聊天用语
*/

/** 
 * @type {AiPlayerChatContent[]}
 */
const aiPlayerChatContents = [
    { id: -1, talkative: 3, content: ['나의 늙은 소는 매우 강력합니다. ', '늙은 소를 화나게 하지 마세요. '], },
    { id: -2, talkative: 3, content: ['선생님, 주인님이 괴물에게 잡혔어요! ', '둘째 형, 주인님이 괴물에게 사로잡혔어요! '], },
    { id: -3, talkative: 1, content: ['나는 사실 용입니다. ', '짐이 너무 무거워요. '], },
    { id: -4, talkative: 3, content: ['선생님, 주인님이 괴물에게 잡혔어요! ', '이 증오는 영원히 지속됩니다...'], },
    { id: -5, talkative: 4, content: ['말을 보는 건 너무 지루해요. ', '평평한 복숭아 두 개를 훔쳐서 먹을 거예요. '], },
    { id: -6, talkative: 2, content: ['아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -7, talkative: 3, content: ['나는 모든 것을 꿰뚫어 볼 수 있습니다. ', '내 분별력을 벗어날 수 있는 것은 아무것도 없다. '], },
    { id: -8, talkative: 2, content: ['아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -9, talkative: 2, content: ['아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -10, talkative: 3, content: ['내 손자가 여기 있습니다. ', '내 늙은 손자가 떠난다. '], },
    { id: -11, talkative: 2, content: ['도살칼을 내려놓고 즉시 부처가 되라. ', '아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -12, talkative: 4, content: ['나는 진짜 원숭이 왕이다. ', '내가 진짜 손오공이다. '], },
    { id: -13, talkative: 3, content: ['나는 짐을 지고 있습니다. ', '나는 말을 잡고 있다. '], },
    { id: -14, talkative: 3, content: ['연인은 결국 결혼을 하게 됩니다. ', '눙, 달, 초승달. '], },
    { id: -15, talkative: 3, content: ['나는 동중국해의 용왕이다. ', '나는 비의 신이다. '], },
    { id: -16, talkative: 2, content: ['원숭이님, 또 문제가 생겼습니다. ', '오공아, 불쌍한 척 하지 마. '], },
    { id: -17, talkative: 5, content: ['내 72가지 변화를 보세요. ', '원숭이들아, 연습 시작해. '], },
    { id: -18, talkative: 2, content: ['내 우즈산에서 탈출할 수 있나요? ', '아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -19, talkative: 3, content: ['창어는 너무 아름답습니다. ', '사랑의 도래...'], },
    { id: -20, talkative: 2, content: ['아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -21, talkative: 2, content: ['나라를 지켜라. ', '긍휼히 여겨라. '], },
    { id: -22, talkative: 3, content: ['당승고기를 먹고 싶어요. ', '나는 백수의 왕이다. '], },
    { id: -23, talkative: 3, content: ['내가 이 나무를 심었고, 이곳은 내 통제하에 있습니다. ', '지금부터 살고 싶으면 돈을 두고 사세요. '], },
    { id: -24, talkative: 3, content: ['도는 하나를 낳고 둘을 낳고 둘은 셋을 낳고 셋은 만물을 낳느니라. ', '태극권은 두 개의 악기를 생성하고, 두 개의 악기는 네 개의 이미지를 생성합니다. '], },
    { id: -25, talkative: 3, content: ['나는 옥황상제입니다. ', '누군가 온다. 나를 위해 괴물 원숭이를 잡아라!', '가서 여래 부처님을 초대하라...'], },
    { id: -26, talkative: 4, content: ['내 운명은 신이 아니라 나에 의해 결정됩니다. ', '그 사람이야, 그 사람이야...'], },
    { id: -27, talkative: 3, content: ['아내를 구하고 싶어요. ', '내가 왜 이렇게 됐지...'], },
    { id: -28, talkative: 3, content: ['여기, 내 탑을 가져가세요. ', '나는 탑의 왕이다. '], },
    { id: -29, talkative: 4, content: ['안녕하세요! 괴물아, 어디로 달리고 있는 거야? ', '나의 늙은 손자에게서 막대기를 빼앗아라. '], },
    { id: -30, talkative: 2, content: ['아미타불. ', '좋아, 좋아, 좋아. '], },
    { id: -31, talkative: 3, content: ['소가 다시 암여우에게 갔다. ', '내 40미터짜리 부들잎 부채가 더 이상 버틸 수가 없어요. '], },
    { id: -32, talkative: 3, content: ['나는 황소마왕이다. ', '음...'], },
    { id: -33, talkative: 3, content: ['내 연인이 다채로운 상서로운 구름 아래서 나를 데리러 올 것입니다. ', '시작은 맞췄는데 끝은 몰랐다. '], },
    { id: -34, talkative: 3, content: ['볼 수는 없지만 시각 장애인은 아닙니다. '], },
    { id: -35, talkative: 3, content: ['이 세상에 사랑이 무엇인지 묻는다...', '만년이면 좋겠다...'], },
]

/** 
 * @typedef {object} AiPlayerGameMessage
 * @property {number} id 컴퓨터플레이어的id
 * @property {string} music 播放的音频文件名。
 * @property {string} text 播放的音频对应的文本内容。
*/

/** 
 * @type {AiPlayerGameMessage[]} 配置参考前端'src\components\chatRoom\tabs\SettingModule.vue' messageGroups
 */
const aiPlayerGameMessages = [
    { id: 1, music: "1", text: "카드를 아주 잘 사용하셨습니다." },
    { id: 2, music: "2", text: "꽃이 시들 때까지 기다렸습니다." },
    { id: 3, music: "3", text: "행복한 협력" },
    { id: 4, music: "4", text: "떠나지 마세요. 우리는 새벽까지 싸울 것입니다." },
    { id: 5, music: "5", text: "작은 작은 작은" },
    { id: 6, music: "6", text: "대대대大" },
    { id: 7, music: "7", text: "마스터 찾기" },
    { id: 8, music: "8", text: "행복하세요" },
    { id: 9, music: "9", text: "조향 요청" },
    { ID: 10, music: "10", text: "수락" },
    { id: 11, music: "11", text: "너무 힘들어요" },
    { id: 12, music: "12", text: "나는 사라졌습니다" },
    { id: 13, music: "13", text: "전략적 종결" }
]

module.exports = {
    chatIntervalHandler: chatIntervalHandler,
    commonChatContent: commonChatContent,
    winnerChatContent: winnerChatContent,
    loserChatContent: loserChatContent,
    aiPlayerChatContents: aiPlayerChatContents,
}