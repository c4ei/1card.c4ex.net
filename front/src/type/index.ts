/** 플레이어좌석번호 */
export type GamePlayerSeatIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

/**
 * @summary 共通列名
 * @type {object}
 * @property {string} createdAt - 만들다时间
 * @property {string} updatedAt - 更新时间
 */
export interface DbCommon {
    createdAt: string,
    updatedAt: string,
}

/** @summary 0: 게으른，1: 房间中기다리다，2: 게임中 */
export type PlayerStatus = 0 | 1 | 2 