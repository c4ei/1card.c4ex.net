/* 플레이어模型 */

const db = require('../database/mysql')
const Account = require('./account')
const Game = require('./game')

const Player = db.defineModel('player',
    {
        nickname:
        {
            type: db.dataTypes.STRING(20),
            defaultValue: '游客'
        },
        avatar_id:
        {
            type: db.dataTypes.INTEGER(5),
            defaultValue: 0
        },
        /* 座位 */
        seat_index:
        {
            type: db.dataTypes.INTEGER(1),
            defaultValue: 0
        },
        /* 총 수집된 카드 수 */
        cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 最大카드받다 */
        max_combo:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 오공 */
        wukong:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 바지에 */
        bajie:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 샤셍 */
        shaseng:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 당나라승려 */
        tangseng:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 리바운드 */
        joker:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 변환 */
        bianshen:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
    })

Account.hasMany(Player)
Player.belongsTo(Account)

Game.hasMany(Player)
Player.belongsTo(Game)

module.exports = Player