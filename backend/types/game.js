/** 
 * @typedef {import("./common.js").SequelizeCommon}
 * @typedef {import("./common.js").GamePlayerSeatIndex}
 * @typedef {import("./player.js").RedisCachePlayerInGame}
 */

/**
 * @typedef RedisCacheGame Redis中的게임信息。对应key:game。
 * @type {object}
 * @property {number} id - 게임id
 * @property {boolean} clockwise - 게임进行方向：true为顺时针，false为逆时针。
 * @property {GamePlayerSeatIndex | -1} currentPlayer - 现在카드 놀이플레이어的座位号：0~7，初始为-1。
 * @property {number[]} currentCard - 现在牌池中的牌，按花色升序排列。
 * @property {GamePlayerSeatIndex | -1} currentCardPlayer - 打出现在牌池中的牌的플레이어的座位号：0~7，初始为-1。
 * @property {number} jokerCard - 现在牌池中的反弹牌。
 * @property {GamePlayerSeatIndex | -1} jokerCardPlayer - 打出现在牌池中的反弹牌的플레이어的座位号：0~7，初始为-1。
 * @property {number} cardNum - 使用牌덱数。
 * @property {number} metamorphoseNum - 每덱牌中변신 카드 수量。
 * @property {number} currentCombo - 现在的连击数。
 * @property {number} version - 数据的版本，用于确认플레이어有没有받다到过期数据。
 * @property {number} timesCombo -连击数。
 * @property {number} timesCard - 连击牌得到的额外牌数量。
 * @property {number} timer - 计时器ID。
 * @property {GamePlayers} gamePlayer - 게임中所有플레이어状态。
 * @property {number[]} gamePlayerId - 게임中所有플레이어id。
 * @property {number[] | number} remainCards - 在服务器端时为牌堆中余留的牌序号(number[])，전송给客户端时转为该数组长度的数值牌堆中余留的牌数(number)。
 * @property {string[]} messages - 게임信息。
 */


/**
 * @typedef ModelGame 数据库中的게임信息。对应table:games。
 * @type {object}
 * @property {number} id - 게임id。主key。
 * @property {string} winner -  우승플레이어昵称。
 * @property {string} min_cards -  우승플레이어수집된 카드 수。
 * @property {string} loser - 당기기플레이어昵称。
 * @property {string} max_cards - 당기기플레이어수집된 카드 수。
 * @property {string} player_num - 플레이어数量。
 * @property {string} cardNum - 使用牌덱数。
 * @property {string} max_combo - 一次얻다最多的牌数。
 * @property {string} max_combo_player - 一次얻다最多的牌数的플레이어昵称。
 * @typedef {ModelGame & SequelizeCommon} SequelizedModelGame
 */

/**
 * @typedef Poker 扑克牌。
 * @type {object}
 * @property {number} num - 牌点：如红桃2，为牌点为2。
 * @property {1|2|3|4} suit -  花色点数：黑桃4，红桃3，梅花或大王2，方块或小王1。
 * @property {string} src -  对应图片的source名：数字+字母，其中字母为黑桃A，红桃B，梅花C，方块D。
 * @property {string} name - 扑克牌名。
 */

/**
 * @typedef GamePlayers 게임中所有플레이어状态。
 * @type {{ [key in GamePlayerSeatIndex]: RedisCachePlayerInGame }}
 */

/**
 * @typedef {Poker[]} Pokers 扑克牌的配置,0~53序号。100+序号为变身牌，反弹牌没有变身牌。
 */

/** 
 * @typedef GameWebsocketRequestData 게임的websocket请求信息。
 * @type {object} 
 * @property {number} id - 目标게임id。
 * @property {GamePlayerSeatIndex?} seatIndex - 전송请求플레이어的座位号：0~7。play,discard,shiftOnline时不为空。
 * @property {number[]?} playCard - 플레이어打出的牌。play时不为空。
 * @property {number[]?} remainCards - 플레이어手中余留牌的序号。play时不为空。
 * @property {GamePlayerSeatIndex?|-1} target - 전송게임内信息플레이어的目标플레이어座位号，-1时向所有플레이어전송。textToPlayer时不为空。
 * @property {number?} targetId - 전송게임内信息目标플레이어的的플레이어id，0时向所有플레이어전송。textToPlayer时不为空。
 * @property {GamePlayerSeatIndex?} source - 전송게임内信息플레이어的座位号。textToPlayer时不为空。
 * @property {number?} sourceId - 전송게임内信息플레이어的的플레이어id。textToPlayer时不为空。
 * @property {string?} soundSrc - 전송게임内信息对应的语音文件路径。textToPlayer时不为空。
 * @property {string?} text - 전송게임内信息对应的信息。textToPlayer时不为空。
 * @property {'get'|'play'|'discard'|'shiftOnline'|'initialize'|'textToPlayer'} action - 请求类型。
 */


/**
 * @typedef PlayerRecordInGameResult 게임结果的websocket响应信息。
 * @type {object}
 * @property {number} id - 게임中플레이어id。
 * @property {string} nickname - 昵称。
 * @property {number} avatar_id - 플레이어아바타id。
 * @property {number} cards - 수집된 카드 수。
 * @property {GamePlayerSeatIndex} seatIndex - 座位id，下标0-7。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {number} wukong - 使用悟空数。
 * @property {number} bajie - 使用八戒数。
 * @property {number} shaseng - 使用沙僧数。
 * @property {number} tangseng - 使用师傅数。
 * @property {number} bianshen - 使用변신 카드 수。
 * @property {number} joker - 使用如来、观音牌数。
 */

/** 
 * @typedef PlayerExp 플레이어얻다经验值，id：플레이어id, exp：얻다经验值。
 * @type {object}
 * @property {number} id 플레이어id。
 * @property {number} exp 플레이어얻다经验值。
 */

/**
 * @typedef GameResultDto 게임结果数据。
 * @type {object}
 * @property {number} id - 게임id。
 * @property {string} winnerNickname -  우승플레이어昵称。
 * @property {number} winnerCards -  우승플레이어수집된 카드 수。
 * @property {string} loserNickname - 당기기플레이어昵称。
 * @property {number} loserCards - 당기기플레이어수집된 카드 수。
 * @property {number} playersNum - 플레이어数量。
 * @property {number} cardsNum - 使用牌덱数。
 * @property {number} maxCombo - 一次얻다最多的牌数。
 * @property {string} maxComboPlayer - 一次얻다最多的牌数的플레이어昵称。
 * @property {PlayerRecordInGameResult[]} gameResultList - 플레이어各项数据列表。
 * @property {PlayerExp[]?} playerExpList - 플레이어얻다经验值列表。
 */


