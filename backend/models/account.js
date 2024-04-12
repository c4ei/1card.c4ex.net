/* 계정 모델 */

const db = require('../database/mysql')

module.exports = db.defineModel('account',
    {
        username:
        {
            type: db.dataTypes.STRING(20),
            unique: true,
        },
        password:
        {
            type: db.dataTypes.STRING(20),
        },
        nickname:
        {
            type: db.dataTypes.STRING(20),
            defaultValue: 'beginer'
        },
        avatar_id:
        {
            type: db.dataTypes.INTEGER(5),
            defaultValue: 0
        },
    })

