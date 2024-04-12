import { GamePlayerSeatIndex, DbCommon } from '@/type/index'
import { PlayerStatus } from '@/type/index'

/**
 * @summary authorization返回的数据类型，不包括password和DbCommon中的属性。
 * @type {object}
 * @property {number} id - 账号id。主key。
 * @property {string} username -  用户名
 * @property {string} nickname - 닉네임
 * @property {number} avatar_id - 플레이어아바타id
 */
export interface Account {
    id: number,
    username: string,
    avatar_id: number,
    nickname: string
}

/**
 * @summary WebSocket传来的플레이어信息。对应key:player。
 * @type {object}
 * @property {number} id - 플레이어id
 * @property {string} username -  플레이어用户名
 * @property {string} nickname - 닉네임
 * @property {number} player_loc - 플레이어所在房间id
 * @property {PlayerStatus} player_status - 플레이어状态. 0:게으른，1: 게임房间기다리다中, 2: 게임中
 * @property {number} avatar_id - 플레이어아바타id
 */
export interface WebSocketPlayer {
    id: number,
    username: string,
    nickname: string,
    player_loc: number,
    player_status: PlayerStatus,
    avatar_id: number,
}


/**
 * @summary 数据库中的게임中플레이어信息。对应table:players。
 * @type {object}
 * @property {number} id - 게임中플레이어id。主key。
 * @property {string} nickname - 닉네임。
 * @property {string} avatar_id - 플레이어아바타id。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} cards - 수집된 카드 수。
 * @property {number} max_combo - 一次얻다最多的牌数。
 * @property {number} wukong - 오공을사용数。
 * @property {number} bajie - 바지에 사용数。
 * @property {number} shaseng - 드리프터 사용数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用변신 카드 수。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} accountId - 플레이어账号id。外键，对应table:accounts。
 * @property {number} gameId - 게임id。外键，对应table:games。
 */
export interface Player extends DbCommon {
    id: number,
    nickname: string,
    avatar_id: number,
    seat_index: GamePlayerSeatIndex,
    cards: number,
    max_combo: number,
    wukong: number,
    bajie: number,
    shaseng: number,
    tangseng: number,
    joker: number,
    bianshen: number,
    accountId: number,
    gameId: number,
}