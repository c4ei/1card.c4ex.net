/* 게임模型 */

const db = require('../database/mysql')

const Game = db.defineModel('game',
    {
        /* 赢家player nickname */
        winner:
        {
            type: db.dataTypes.STRING(20),
            defaultValue: ''
        },
        /* 最少카드받다 */
        min_cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 输家playernickname */
        loser:
        {
            type: db.dataTypes.STRING(20),
            defaultValue: ''
        },
        /* 最多카드받다 */
        max_cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 플레이어수量 */
        player_num:
        {
            type: db.dataTypes.INTEGER(2),
            defaultValue: 0
        },
        /* 使用牌덱数 */
        cardNum:
        {
            type: db.dataTypes.INTEGER(2),
            defaultValue: 0
        },
        /* 최대 콤보数 */
        max_combo:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 최대 콤보数플레이어 */
        max_combo_player:
        {
            type: db.dataTypes.STRING(50),
            defaultValue: ''
        }
    })

module.exports = Game
