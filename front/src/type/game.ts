import { GamePlayerSeatIndex } from '@/type/index'
import { Player } from '@/type/player'

/**
 * @summary WebSocket传来的在游戏中的플레이어信息。对应key:game
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {string} nickname - 昵称。
 * @property {string} avatar_id - 플레이어아바타id。
 * @property {number} cards - 수집된 카드 수。
 * @property {number[]} remainCards - 플레이어手中余留牌的序号。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {boolean} online - 플레이어是否托管。
 * @property {number} offLineTime - 플레이어断连次数(自己该出牌时没有出牌的次数)，达到一定次数则进入托管状态。
 * @property {number} offLinePlayCard - 플레이어托管时出的牌。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} bianshen - 使用변신 카드 수。
 */
export interface WebSocketPlayerInGame {
    id: number,
    nickname: string,
    avatar_id: number,
    cards: number,
    remainCards: number[],
    maxCombo: number,
    online: boolean,
    offLineTime: number,
    offLinePlayCard: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number,
    joker: number,
    bianshen: number,
}

/**
 * @summary 游戏中所有플레이어状态。
 * @type { [key in GamePlayerSeatIndex]: WebSocketPlayerInGame }
*/
export type GamePlayers = { [key in GamePlayerSeatIndex]: WebSocketPlayerInGame }

/**
 * @summary Redis中的游戏信息。对应key:game。
 * @type {object}
 * @property {number} id - 游戏id
 * @property {boolean} clockwise - 游戏进行方向：true为顺时针，false为逆时针。
 * @property {GamePlayerSeatIndex | -1} currentPlayer - 现在出牌플레이어的座位号：0~7，初始为-1。
 * @property {number[]} currentCard - 现在牌池中的牌，按花色升序排列。
 * @property {GamePlayerSeatIndex | -1} currentCardPlayer - 打出现在牌池中的牌的플레이어的座位号：0~7，初始为-1。
 * @property {number[]} jokerCard - 现在牌池中的反弹牌。
 * @property {GamePlayerSeatIndex | -1} jokerCardPlayer - 打出现在牌池中的反弹牌的플레이어的座位号：0~7，初始为-1。
 * @property {number} cardNum - 使用牌덱数。
 * @property {number} metamorphoseNum - 每덱牌中변신 카드 수量。
 * @property {number} currentCombo - 现在的连击数。
 * @property {number} version - 数据的版本，用于确认플레이어有没有收到过期数据。
 * @property {number} timesCombo -连击数。
 * @property {number} timesCard - 连击牌得到的额外牌数量。
 * @property {number} timer - 计时器ID。
 * @property {GamePlayers} gamePlayer - 游戏中所有플레이어状态。
 * @property {number[]} gamePlayerId - 游戏中所有플레이어id。
 * @property {number} remainCards - 在服务器端时为牌堆中余留的牌序号(number[])，전송给客户端时转为该数组长度的数值牌堆中余留的牌数(number)。
 * @property {string[]} messages - 游戏信息。
 */
export interface WebSocketGame {
    id: number,
    clockwise: boolean,
    currentPlayer: GamePlayerSeatIndex | -1,
    currentCard: number[],
    currentCardPlayer: GamePlayerSeatIndex | -1,
    jokerCard: number[],
    jokerCardPlayer: GamePlayerSeatIndex | -1,
    cardNum: number,
    metamorphoseNum: number,
    currentCombo: number,
    version: number,
    timesCombo: number,
    timesCard: number,
    gamePlayer: GamePlayers,
    gamePlayerId: number[],
    remainCards: number,
    messages: string[],
}

/**
 * @summary 游戏结果的websocket响应信息。
 * @type {object}
 * @property {number} id - 游戏中플레이어id。
 * @property {string} nickname - 昵称。
 * @property {number} avatar_id - 플레이어아바타id。
 * @property {number} cards - 수집된 카드 수。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用변신 카드 수。
 * @property {number} joker - 使用如来、观音牌数。
 */

export interface PlayerRecordInGameResult {
    id: number,
    nickname: string,
    avatar_id: number,
    cards: number,
    seatIndex: GamePlayerSeatIndex,
    maxCombo: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number,
    joker: number,
    bianshen: number,
}

/** 
 * @summary 플레이어얻다经验值，id：플레이어id, exp：얻다经验值。
 * @type {object}
 * @property {number} id 플레이어id。
 * @property {number} exp 플레이어얻다经验值。
 */
export interface PlayerExp {
    id: number,
    exp: number,
}

/**
 * @summary WebSocket传来的游戏结果数据。
 * @type {object}
 * @property {number} id - 游戏id。
 * @property {string} winnerNickname -  吃鸡플레이어昵称。
 * @property {number} winnerCards -  吃鸡플레이어수집된 카드 수。
 * @property {string} loserNickname - 당기기플레이어昵称。
 * @property {number} loserCards - 당기기플레이어수집된 카드 수。
 * @property {number} playersNum - 플레이어数量。
 * @property {number} cardsNum - 使用牌덱数。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {string} maxComboPlayer - 一次얻다最多的牌数的플레이어昵称。
 * @property {PlayerRecordInGameResult[]} gameResultList - 플레이어各项数据列表。
 * @property {PlayerExp[]} playerExpList - 플레이어얻다经验值列表。
 */
export interface GameResult {
    id: number,
    winnerNickname: string,
    winnerCards: number,
    loserNickname: string,
    loserCards: number,
    playersNum: number,
    cardsNum: number,
    maxCombo: number,
    maxComboPlayer: string,
    gameResultList: PlayerRecordInGameResult[],
    playerExpList: PlayerExp[]
}

/** @summary 一场游戏中所有플레이어的战绩。*/
export type GameResultsList = Player[]


/**
 * @type {object}
 * @property {number} num - 牌点：如红桃2，为牌点为2。
 * @property {1|2|3|4} suit -  花色点数：黑桃4，红桃3，梅花或大王2，方块或小王1。
 * @property {string} src -  对应图片的source名：数字+字母，其中字母为黑桃A，红桃B，梅花C，方块D。
 * @property {string} name - 扑克牌名。
 */
export interface Card {
    num: number,
    suit: 1 | 2 | 3 | 4,
    src: string,
    name: string,
}