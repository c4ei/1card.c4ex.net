/* 路由文件通用处理 */

const fs = require('fs')
const logger = require('./log')

const files = fs.readdirSync('./routers')

const js_files = files.filter((f) => {
    return f.endsWith('.js')
}, files)

//../routers/에서 파일을 가져와야 하는 경우 직접 가져오지 않고 모듈의 .router 이름을 통해 가져옵니다.
module.exports = {};

for (const f of js_files) {
    logger.log(`import router from file ${f}`)
    const name = f.substring(0, f.length - 3)
    module.exports[name] = require('../routers/' + f)
}