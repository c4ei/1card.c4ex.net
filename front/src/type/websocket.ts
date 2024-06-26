import { WebSocketChat, WebSocketChangeSeat } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'


/** 
 * @summary WebSocket共通响应的信息。
 * @type {object}
 * @property {number} userId - 전송请求的플레이어id。
 */
interface WebSocketResponseRawData { userId: number }

/** 
 * @type {object} 
 * @property {'chat'} type - 操作类型。
 */
export interface WebSocketChatResponseJsonData extends WebSocketChat, WebSocketResponseRawData {
    type: 'chat',
}

/** 
 * @type {object} 
 * @property {'gameRoomList'} type - 操作类型。
 * @property {string[]} data - 返回的字符串数组可Json parse转换为WebSocketGameRoom。
 */
export interface WebSocketGameRoomListResponseJsonData extends WebSocketResponseRawData {
    type: 'gameRoomList',
    data: string[] // turned to be WebSocketGameRoom after Json.parse
}

/** 
 * @type {object} 
 * @property {'message'} type - 操作类型。
 * @property {number} player_loc - 플레이어所在房间id
 * @property {'success' | 'info' | 'warning' | 'error'} subType - 文本类型。
 * @property {string} text - message文本。
 */
export interface WebSocketMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'message',
    player_loc: number,
    subType: 'success' | 'info' | 'warning' | 'error',
    text: string,
}

/** 
 * @type {object} 
 * @property {'error' | 'system'} type - 操作类型。
 * @property {number} player_loc - 플레이어所在房间id
 * @property {string} text - message文本。
 */
export interface WebSocketExceptionMessageResponseJsonData extends WebSocketResponseRawData {
    type: 'error' | 'system',
    player_loc: number,
    text: string,
}

/** 
 * @type {object} 
 * @property {'askChangeSeat'} type - 操作类型。
 * @property {WebSocketChangeSeat} data - 返回的交换座位信息。
 */
export interface WebSocketChangeSeatResponseJsonData extends WebSocketResponseRawData {
    type: 'askChangeSeat',
    data: WebSocketChangeSeat,
}

/** 
 * @type {object} 
 * @property {'playerList'} type - 操作类型。
 * @property {string[]} data - 返回的字符串数组可Json parse转换为WebSocketPlayer。
 */
export interface WebSocketPlayerListResponseJsonData extends WebSocketResponseRawData {
    type: 'playerList',
    data: string[] // turned to be WebSocketPlayer after Json.parse
}

/** @summary 所有通过WebSocket返回的数据信息的并集 */
export type WebSocketGameResponseJsonData = InitializeGameResponseJsonData | ShiftOnlineGameResponseJsonData | TextToPlayerGameResponseJsonData | DeleteGameResponseJsonData | ResultGameResponseJsonData | GetGameResponseJsonData

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'initialize'} action - 타겟 게임에 동작하는 액션
 * @property {string} data - 返回的字符串可Json parse转换为WebSocketGame。
 */
interface InitializeGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'initialize',
    data: string, // turned to be WebSocketGame after Json.parse
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'shiftOnline'} action - 对目标게임操作的动作。
 * @property {GamePlayerSeatIndex} seatIndex - 플레이어的좌석번호。
 * @property {boolean} online - 플레이어是否在线。
 */
interface ShiftOnlineGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'shiftOnline',
    seatIndex: GamePlayerSeatIndex,
    online: boolean,
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'textToPlayer'} action - 对目标게임操作的动作。
 * @property {TextToPlayerGameData} data - 返回的数据。
 */
interface TextToPlayerGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'textToPlayer',
    data: TextToPlayerGameData,
}

/** 
 * @type {object} 
 * @property {GamePlayerSeatIndex|-1} target - 전송게임内信息플레이어的目标플레이어좌석번호，-1时向所有플레이어전송。textToPlayer时不为空。
 * @property {number} targetId - 전송게임内信息目标플레이어的的플레이어id，0时向所有플레이어전송。textToPlayer时不为空。
 * @property {GamePlayerSeatIndex} source - 전송게임内信息플레이어的좌석번호。textToPlayer时不为空。
 * @property {number} sourceId - 전송게임内信息플레이어的的플레이어id。textToPlayer时不为空。
 * @property {string} soundSrc - 전송게임内信息对应的语音文件路径。textToPlayer时不为空。
 * @property {string} text - 전송게임内信息对应的信息。textToPlayer时不为空。
 */
export interface TextToPlayerGameData {
    target: GamePlayerSeatIndex | -1,
    targetId: number,
    source: GamePlayerSeatIndex,
    sourceId: number,
    soundSrc: string,
    text: string,
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'delete'} action - 对目标게임操作的动作。
 */
interface DeleteGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'delete',
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'result'} action - 对目标게임操作的动作。
 * @property {string} data - 返回的字符串可Json parse转换为WGameResult。
 */
interface ResultGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'result',
    data: string, // turned to be GameResult after Json.parse
}

/** 
 * @type {object} 
 * @property {'game'} type - 操作类型。
 * @property {'update' | 'get'} action - 对目标게임操作的动作。
 * @property {string} data - 返回的字符串可Json parse转换为WebSocketGame。
 */
interface GetGameResponseJsonData extends WebSocketResponseRawData {
    type: 'game',
    action: 'update' | 'get',
    data: string, // turned to be WebSocketGame after Json.parse
}


