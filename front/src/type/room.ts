import { GamePlayerSeatIndex } from '@/type/index'

/** 
 * @summary 在游戏房间中聊天框显示的信息。
 * @type {object}
 * @property {number} id 信息id。
 * @property {string} name - 플레이어昵称。
 * @property {'success' | 'info' | 'warning' | 'error'} type - 信息类型。
 * @property {string} text - 聊天信息。
 */
export interface ChatTextInfo {
    id: number,
    name: string,
    type: 'success' | 'info' | 'warning' | 'error',
    text: string,
}

/** 
 * @summary 플레이어在游戏房间中发信息时会在头上显示的信息。
 * @type {object}
 * @property {number} id 信息id。
 * @property {string} nickname - 플레이어昵称。
 * @property {string} text - 聊天信息。
 */
export interface PlayerLocRomTypeChatMessageObject {
    id: number,
    nickname: string,
    text: string,
}

/** 
 * @summary 游戏房间聊天的websocket请求信息。
 * @type {object} 
 * @property {string} nickname - 전송信息플레이어昵称。
 * @property {string} text - 聊天信息。
 * @property {number} player_loc - 目标房间id。
 */
export interface WebSocketChat {
    nickname: string,
    text: string,
    player_loc: number,
}

/** 
 * @summary 进入游戏房间的信息。
 * @type {object} 
 * @property {number} id - 房间id。
 * @property {number} seatIndex - 房间座位号。
 */
export interface EnterRoomDto {
    id: number,
    seatIndex: GamePlayerSeatIndex | -1, // 不指定座位号时seatIndex为-1
}

/**
 * @summary 房间中所有플레이어状态。
 * @type { [key in GamePlayerSeatIndex]: WebSocketPlayerInRoom }
*/
export type RoomPlayers = { [key in GamePlayerSeatIndex]: WebSocketPlayerInRoom }

/**
 * @summary WebSocket传来的의 방信息。对应key:room
 * @type {object}
 * @property {number} id - 房间id
 * @property {string} name -  방이름 
 * @property {0|1} status - 房间状态 0:기다리다开始, 1:游戏中
 * @property {boolean} needPassword - 是否需要비밀번호
 * @property {string} password - 비밀번호
 * @property {number} cardNum - 使用牌的덱数
 * @property {number} metamorphoseNum - 每덱牌변신 카드 수量
 * @property {number} owner - 房主的플레이어id
 * @property {number} lastLoser - 上국당기기的플레이어id
 * @property {number} lastWinner - 上국吃鸡的플레이어id
 * @property {number?} chatInterval - 控制电脑플레이어聊天的定时器, 방 만들기请求时并不需要传递该属性，所以该属性没有写在类型中。
 * @property {RoomPlayers} playerList - 플레이어信息列表，下标0~7
 */
export interface WebSocketGameRoom {
    id: number
    name: string
    status: 0 | 1
    needPassword: boolean
    password: string
    cardNum: number
    metamorphoseNum: number
    owner: number
    lastLoser: number
    lastWinner: number
    playerList: RoomPlayers
}

/**
 * @summary WebSocket传来的在房间中的플레이어信息。对应key:room
 * @type {object}
 * @property {number} id - 플레이어id
 * @property {number} cards -  总수집된 카드 수
 * @property {number} win - 吃鸡국数
 * @property {number} loss - 당기기국数
 * @property {boolean} ready - 是否已准备
 */
export interface WebSocketPlayerInRoom {
    id: number,
    cards: number,
    win: number,
    loss: number,
    ready: boolean,
}

/**
 * @summary 交换座位信息。
 * @type {object} 
 * @property {number} id - 目标房间id。
 * @property {'changeSeat'} action - 对目标房间操作的动作。id>0时不为空。
 * @property {number} targetSeatIndex - 更换座位请求플레이어的更换目标座位号。
 * @property {number} targetId - 更换座位请求目标플레이어的的플레이어id。
 * @property {number} sourceSeatIndex - 更换座位请求플레이어的现座位号。
 * @property {number} sourceId - 更换座位请求플레이어的的플레이어id。
 * @property {boolean} confirm - 更换座位是否需전송确认请求。
 */
export interface WebSocketChangeSeat {
    id: number,
    action: 'changeSeat',
    targetSeatIndex: number,
    targetId: number,
    sourceSeatIndex: number,
    sourceId: number,
    confirm: boolean,
}

/**
 * @summary 交换座位信息。
 * @type {object} 
 * @property {number} id - 目标房间id。
 * @property {'disagreeChangeSeat'} action - 对目标房间操作的动作。id>0时不为空。
 * @property {number} playerId - 被拒绝更换座位的플레이어id。disagree
 * @property {string} refusePlayerNickname - 拒绝更换座位的플레이어昵称。
 */
export interface WebSocketDisagreeChangeSeat {
    id: number,
    action: 'disagreeChangeSeat',
    playerId: number,
    refusePlayerNickname: string,
}