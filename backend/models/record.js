/* 游戏记录模型 */

const db = require('../database/mysql')
const Account = require('./account')

const Record = db.defineModel('record',
    {
        /* 总국数 */
        num_of_game:
        {
            type: db.dataTypes.INTEGER(11),
            defaultValue: 0
        },
        /* 牌最多的국数 */
        most_game:
        {
            type: db.dataTypes.INTEGER(11),
            defaultValue: 0
        },
        /* 牌最少的국数 */
        least_game:
        {
            type: db.dataTypes.INTEGER(11),
            defaultValue: 0
        },
        /* 经验值 */
        experience:
        {
            type: db.dataTypes.INTEGER(11),
            defaultValue: 0
        },
        /* 얻다的牌总数 */
        experienced_cards:
        {
            type: db.dataTypes.INTEGER(11),
            defaultValue: 0
        },
        /* 最多收牌比时的수집된 카드 수 */
        max_card:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 最多收牌比时该국플레이어平均수집된 카드 수 */
        max_card_amount:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 最少收牌比时的수집된 카드 수 */
        min_card:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 最少收牌比时该국플레이어平均수집된 카드 수 */
        min_card_amount:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 一次얻다最多的牌数 */
        max_combo:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
        /* 一국얻다最少的牌数 */
        least_cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: -1
        },
        /* 一국얻다最多的牌数 */
        most_cards:
        {
            type: db.dataTypes.INTEGER(4),
            defaultValue: 0
        },
    })

Account.hasOne(Record)
Record.belongsTo(Account)

module.exports = Record

