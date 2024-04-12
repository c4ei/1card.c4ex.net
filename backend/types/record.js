/** 
 * @typedef {import("./common.js").SequelizeCommon}
 */

/**
 * @typedef BasicRedisCachePlayerRecord Redis中的플레이어战绩信息。对应key:playerRecord
 * @type {object}
 * @property {number} id - 플레이어战绩id。主key。
 * @property {number} num_of_game -  플레이어总局数 
 * @property {number} most_game - 拉跨局数
 * @property {number} least_game - 吃鸡局数
 * @property {number} experience - 经验值
 * @property {number} experienced_cards - 总收牌数
 * @property {number} max_card - 最多收牌比时的收牌数
 * @property {number} max_card_amount - 最多收牌比时该局플레이어平均收牌数
 * @property {number} min_card - 最少收牌比时的收牌数
 * @property {number} min_card_amount - 最少收牌比时该局플레이어平均收牌数
 * @property {number} max_combo - 一次얻다最多的牌数
 * @property {number} least_cards - 一局얻다最少的牌数
 * @property {number} most_cards - 一局얻다最多的牌数
 * @property {number} accountId - 플레이어id。外键，对应table:accounts。
 * @typedef {BasicRedisCachePlayerRecord & SequelizeCommon} RedisCachePlayerRecord
 */

/**
 * @typedef {RedisCachePlayerRecord} SequelizedModelRecord 数据库中的中的플레이어战绩信息。对应table:records。结构与RedisCachePlayerRecord一致。
 */

/**
 * @typedef RedisCacheRankPlayer Redis中的플레이어信息。对应key:rank-topPlayersList。
 * @type {object}
 * @property {string} nickname - 昵称
 * @property {number} avatar_id - 플레이어화신id
 */

/**
 * @typedef RankType rank种类。
 * @type {'level'|'winner'|'loser'|'sum'|'combo'|'highest_rate'|'lowest_rate'|'least_cards'|'most_cards'}
 */

/**
 * @typedef ResponseRank Rank response中的的rank属性值类型。
 * @type {object}
 * @property {ResponseRankPlayerInfo} playerInfo - 请求플레이어的排名信息。
 * @property {ResponseRankTopPlayerInfo[]} rankList - 排行플레이어信息列表。
 */

/**
 * @typedef ResponseRankPlayerInfo Rank response中的的rank属性值中的playerInfo属性值类型。
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。
 */

/**
 * @typedef ResponseRankTopPlayerInfo Rank response中的的rank属性值中的rankList属性值类型。
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {number} record - 分数。
 * @property {number} rank - 排名。 
 * @property {string} nickname - 昵称。
 * @property {number} avatarId - 플레이어화신id。
 */

/** 
 * @typedef RedisWrapperResult checkGetRedisWrapper方法的返回值。
 * @type {object}
 * @property {boolean} result - 返回结果。
 * @property {string[]} topThreeList - 前三플레이어信息的字符串。
 * @property {string[]|null} resList - 获取排行플레이어的排行信息字符串。
 * @property {number} resRank - 获取排行플레이어的排行。
 */