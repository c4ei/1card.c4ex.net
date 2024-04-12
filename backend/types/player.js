/** 
 * @typedef {import("./common.js").GamePlayerSeatIndex}
 */

/** 
 * @typedef {PlayerStatus} 플레이어状态. 0:게으른，1: 게임房间기다리다中, 2: 게임中
 * @type {0 | 1 | 2}
*/

/**
 * @typedef RedisCachePlayer Redis中的플레이어信息。对应key:player。
 * @type {object}
 * @property {number} id - 플레이어id
 * @property {string} username -  플레이어用户名
 * @property {string} nickname - 昵称
 * @property {number} player_loc - 플레이어所在房间id
 * @property {PlayerStatus} player_status - 플레이어状态. 0:게으른，1: 게임房间기다리다中, 2: 게임中
 * @property {number} avatar_id - 플레이어아바타id
 */

/**
 * @typedef RedisCachePlayerInRoom Redis中的在房间中的플레이어信息。对应key:room
 * @type {object}
 * @property {number} id - 플레이어id
 * @property {number} cards -  총 수집된 카드 수
 * @property {number} win - 우승게임수
 * @property {number} loss - 당기기게임수
 * @property {boolean} ready - 是否준비완료
 */

/**
 * @typedef RedisCachePlayerInGame Redis中的在게임中的플레이어信息。对应key:game
 * @type {object}
 * @property {number} id - 플레이어id。
 * @property {string} nickname - 昵称。
 * @property {string} avatar_id - 플레이어아바타id。
 * @property {number} cards - 수집된 카드 수。
 * @property {number[]} remainCards - 플레이어手中余留牌的序号。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {boolean} online - 플레이어是否托管。
 * @property {number} offLineTime - 플레이어断连次数(自己该카드 놀이时没有카드 놀이的次数)，达到一定次数则进入托管状态。
 * @property {number} offLinePlayCard - 플레이어托管时出的牌。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} bianshen - 使用변신 카드 수。
 */

/** 
 * @typedef {import("./common.js").SequelizeCommon}
 */

/**
 * @typedef ModelAccount 数据库中的플레이어账号信息。对应table:accounts。
 * @type {object}
 * @property {number} id - 账号id。主key。
 * @property {string} username -  用户名
 * @property {string} password -  비밀번호
 * @property {string} nickname - 昵称
 * @property {number} avatar_id - 플레이어아바타id
 * @typedef {ModelAccount & SequelizeCommon} SequelizedModelAccount
 */

/**
 * @typedef ModelPlayer 数据库中的게임中플레이어信息。对应table:players。
 * @type {object}
 * @property {number} id - 主key，插入数据时不需要。
 * @property {string} nickname - 昵称。
 * @property {string} avatar_id - 플레이어아바타id。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} cards - 수집된 카드 수。
 * @property {number} max_combo - 一次얻다最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用변신 카드 수。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} accountId - 플레이어账号id。外键，对应table:accounts。
 * @property {number} gameId - 게임id。外键，对应table:games。
 * @typedef {ModelPlayer & SequelizeCommon} SequelizedModelPlayer
 */

/**
 * @typedef ModelAiPlayer 数据库中的게임中플레이어信息。对应table:aiplayers。
 * @type {object}
 * @property {number} id - 主key，插入数据时不需要。
 * @property {string} ai_player_id - 컴퓨터플레이어id，负数。
 * @property {GamePlayerSeatIndex} seat_index - 座位id，下标0-7。
 * @property {number} cards - 수집된 카드 수。
 * @property {number} max_combo - 一次얻다最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用변신 카드 수。
 * @property {number} joker - 使用如来、观音牌数。
 * @property {number} accountId - 플레이어账号id。外键，对应table:accounts。
 * @property {number} gameId - 게임id。外键，对应table:games。
 * @typedef {ModelAiPlayer & SequelizeCommon} SequelizedModelAiPlayer
 */

/** 
 * @typedef PlayerListWebsocketRequestData 플레이어列表的websocket请求信息。
 * @type {object} 
 * @property {string} nickname - 전송信息플레이어昵称。
 * @property {number} player_loc - 플레이어所在房间id
 * @property {PlayerStatus} player_status - 플레이어状态. 0:게으른，1: 게임房间기다리다中, 2: 게임中
 * @property {number} avatar_id - 플레이어아바타id
 * @property {string?} action - 请求类型。若不为空，则其余属性应为空。
 */

/**
 * @typedef ModelInvitationCode 数据库中的邀请码信息。对应table:invitationcodes
 * @type {object}
 * @property {string} invitation_code -  邀请码。
 * @property {boolean} is_used - 是否已使用。
 * @property {number} player_id - 使用该邀请码的플레이어id。
 * @typedef {ModelInvitationCode & SequelizeCommon} SequelizedModelInvitationCode
 */
