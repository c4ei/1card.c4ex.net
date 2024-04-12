/**
 * @typedef {import('./player.js').RedisCachePlayerInRoom}
 * @typedef {import("./common.js").SequelizeCommon}
 * @typedef {import("./common.js").SequelizeCommon}
 * @typedef {import("./common.js").GamePlayerSeatIndex}
 */

/**
 * @typedef RoomPlayers 房间中所有플레이어状态。
 * @type {{ [key in GamePlayerSeatIndex]: RedisCachePlayerInRoom }}
 */

/**
 * @typedef RedisCacheRoomInfo Redis中의 방信息。对应key:room
 * @type {object}
 * @property {number} id - 房间id
 * @property {string} name -  방이름 
 * @property {0|1} status - 房间状态 0:기다리다开始, 1:게임中
 * @property {boolean} needPassword - 是否需要비밀번호
 * @property {string} password - 비밀번호
 * @property {number} cardNum - 使用牌的덱数
 * @property {number} metamorphoseNum - 每덱牌변신 카드 수量
 * @property {number} owner - 房主的플레이어id
 * @property {number} lastLoser - 上국당기기的플레이어id
 * @property {number} lastWinner - 上국우승的플레이어id
 * @property {number} chatInterval - 控制电脑플레이어聊天的定时器
 * @property {RoomPlayers} playerList - 플레이어信息列表，下标0~7
 */

/**
 * @typedef RoomWebsocketRequestData 게임房间的websocket请求信息。
 * @type {object} 
 * @property {number} id - 目标房间id 0为获取所有房间，NaN为만들다新房间，小于0为离开目标房间，大于0是对目标房间的操作。
 * @property {string?} name -  방이름。방 만들기,edit时不为空。
 * @property {(0|1)?} status - 房间状态 0:기다리다开始, 1:게임中。방 만들기时不为空。
 * @property {boolean?} needPassword - 是否需要비밀번호。방 만들기,edit时不为空。
 * @property {string?} password - 비밀번호。방 만들기，须비밀번호enter，edit时不为空。
 * @property {number?} aiPlayerId - 电脑플레이어id。enter时一般플레이어为0，컴퓨터에 연결플레이어为负数。
 * @property {number?} cardNum - 使用牌的덱数。방 만들기,edit时不为空。
 * @property {number?} metamorphoseNum - 每덱牌변신 카드 수量。방 만들기,edit时不为空。
 * @property {number?} owner - 房主的플레이어id。방 만들기时不为空。
 * @property {number?} lastLoser - 上국당기기的플레이어id。방 만들기时不为空。
 * @property {number?} lastWinner - 上국우승的플레이어id。방 만들기时不为空。
 * @property {RoomPlayers?} playerList - 플레이어信息列表，下标0~7。방 만들기时不为空。
 * @property {GamePlayerSeatIndex?} seatIndex - 目标座位号，下标0~7。为-1时则不指定位置。enter,방을 나가다时不为空。
 * @property {'enter'|'ready'|'edit'|'changeSeat'|'disagreeChangeSeat'} action - 对目标房间操作的动作。id>0时不为空。
 * @property {number?} targetSeatIndex - 更换座位请求플레이어的更换目标座位号。changeSeat时不为空。
 * @property {number?} targetId - 更换座位请求目标플레이어的的플레이어id。changeSeat时不为空。
 * @property {number?} sourceSeatIndex - 更换座位请求플레이어的现座位号。changeSeat时不为空。
 * @property {number?} sourceId - 更换座位请求플레이어的的플레이어id。changeSeat时不为空。
 * @property {boolean?} confirm - 更换座位是否需전송确认请求。changeSeat时不为空。
 * @property {number?} playerId - 被拒绝更换座位的플레이어id。disagreeChangeSeat时不为空。
 * @property {string?} refusePlayerNickname - 拒绝更换座位的플레이어昵称。disagreeChangeSeat时不为空。
 * @property {string?} nickname - 방을 나가다的플레이어昵称。방을 나가다时不为空。
 */

/** 
 * @typedef RoomChatWebsocketRequestData 게임房间聊天的websocket请求信息。
 * @type {object} 
 * @property {string} nickname - 전송信息플레이어昵称。
 * @property {string} text - 聊天信息。
 * @property {number} player_loc - 目标房间id。
 */


/**
 * @typedef ModelInvitationCode 数据库中的邀请码信息。对应table:invitationcodes。
 * @type {object}
 * @property {number} id - 邀请码id。主key。
 * @property {string} invitation_code - 邀请码
 * @property {string} is_used -  是否已使用
 * @property {string} player_id - 플레이어id
 * @property {number} avatar_id - 플레이어아바타id
 * @typedef {ModelInvitationCode & SequelizeCommon} SequelizedModelInvitationCode
 */