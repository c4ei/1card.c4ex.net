/* 플레이어模型 => 플레이어 모델 */

const db = require('../database/mysql')
const Game = require('./game')

const AiPlayer = db.defineModel('aiPlayer',
    {
        /* 컴퓨터 플레이어 ID */
        ai_player_id:
        {
            type: db.dataTypes.INTEGER(2),
            defaultValue: 0
        },
        /* 座位 좌석 */
        seat_index:
        {
            type: db.dataTypes.INTEGER(1),
            defaultValue: 0
        },
        /* 총 수집된 카드 수 수집된 총 카드 수 */
        cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 最大받다牌  최대 마감 카드 */
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
        /* 리바운드 리바운드 */
        joker:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 변환 변환 */
        bianshen:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
    })

Game.hasMany(AiPlayer)
AiPlayer.belongsTo(Game)

module.exports = AiPlayer