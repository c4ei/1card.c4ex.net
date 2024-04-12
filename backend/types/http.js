/** 
 * @typedef {import("express").Request} ClientRequestRaw
 * @typedef {import("express").Response} ClientResponse
 * @typedef {import("./record").ResponseRank} ResponseRank
 * @typedef {import("./record").RankType} RankType
 * /

/** 
 * @typedef {import("./websocket").RedisCacheWebsocketInfo} RedisCacheWebsocketInfo
 * @typedef {RedisCacheWebsocketInfo} ClientRequestSessionInfo Request中的会话信息(附带플레이어信息)
 */

/** 
 * @typedef {{session: ClientRequestSessionInfo} & ClientRequestRaw} ClientRequest Request信息(附带플레이어信息)
 */

/**
 * @typedef RegisterRequestBody register的body信息
 * @type {object}
 * @property {string} username -  플레이어用户名
 * @property {string} password - 플레이어비밀번호
 */

/**
 * @typedef ModifyRequestBody modify的body信息
 * @type {object}
 * @property {string?} nickname -  新设置的昵称。
 * @property {string?} avatar_id - 新设置的화신id。
 */

/**
 * @typedef RankRequestQuery rank的query信息
 * @type {object}
 * @property {number} id - 获取排行的플레이어id。
 * @property {RankType} type - 排行类型。
 */

/**
 * @typedef RegisterRequestBody register的body信息
 * @type {object}
 * @property {string} nickname -  플레이어账号。
 * @property {string} invitationCode -  使用邀请码。
 * @property {string} password - 플레이어비밀번호。
 */