/**
 * @summary rank种类。
 * @type {'level'|'winner'|'loser'|'sum'|'combo'|'highest_rate'|'lowest_rate'|'least_cards'|'most_cards'}
 */
export type RankType = 'level' | 'winner' | 'loser' | 'sum' | 'combo' | 'highest_rate' | 'lowest_rate' | 'least_cards' | 'most_cards'

/**
 * @summary Rank response中的的rank属性值中的playerInfo属性值类型。
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。
 */
export interface RankPlayerInfo {
    id: number,
    record: number,
    rank: number,
}

/**
 * @summary Rank response中的的rank属性值中的rankList属性值类型。
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。 
 * @property {string} nickname - 昵称。
 * @property {number} avatarId - 플레이어화신id。
 */
export interface RankTopPlayerInfo {
    id: number,
    record: number,
    rank: number,
    nickname: string,
    avatarId: number,
}

/**
 * @summary Rank response中的的rank属性值类型。
 * @type {object}
 * @property {RankPlayerInfo} playerInfo - 请求플레이어的排名信息。
 * @property {RankTopPlayerInfo[]} rankList - 排行플레이어信息列表。
 */
export interface RankInfo {
    playerInfo: RankPlayerInfo,
    rankList: RankTopPlayerInfo[],
}