const express = require("express")
const session = require('./common/session').session
const app = express()
const http = require('http')
const wss = require('./websocket/')
const routers = require('./common/routers')
const routerInterceptor = require('./common/routerInterceptor')
const log4js = require("log4js")
const logger = require('./common/log')
const history = require('connect-history-api-fallback')
const path = require('path')
var cors = require('cors');
app.use(cors());
var corsOptions = {
	origin: 'https://poker.c4ex.net',
	optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));
/* 部署前端项目需要的插件 */
app.use(history())
app.use(express.static(path.join(__dirname, 'dist')))

/* 配置config */
const conf = require('./config/')
/*************/

/* 解析JSON */
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
/************/

/* session */
if (process.env.NODE_ENV !== 'development') {
  app.set('trust proxy', 1) // trust first proxy
}
app.use(session)
app.use('/', routerInterceptor)//拦截器
/**********/

/* 日志 */
app.use(log4js.connectLogger(logger, { level: 'error' }))

/* websocket */
const server = http.createServer(app)
server.on('upgrade', function (request, socket, head) {
  session(request, {}, () => {
    if (request.session.username === undefined || !request.session.username) {
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n')
      socket.destroy()
      return
    }
    wss.handleUpgrade(request, socket, head, function (ws) {
      wss.emit('connection', ws, request)
    })
  })
})
/************/

/* API*(라우팅) */
Object.keys(routers).forEach(key => {
  console.log("/backend/app.js [61] key:"+key);
  app.use(conf.APIRoot, routers[key])//경로에 루트 경로 추가
})
/*******/

const loginService = require('./services/loginService');
app.post('/v1/login',
    /** 
     * @param {ClientRequest} req
     * @param {ClientResponse} res
     */
    function (req, res) {
        console.log("73 app.js");
        loginService.login(req)
            .then(result => {
                /* 코드가 200이면 로그인에 성공하고 세션이 설정됩니다. */
                if (result.code === 200) {
                  console.log("78 app.js - result.code === 200");
                    sessionHandler(req, result.account)
                    res.status(200).json({ code: result.code, message: result.message, account: result.account })
                }
                else if (result.code === 409) {
                  console.log("83 app.js - result.code === 409");
                    req.session.destroy(() => { })
                    res.status(200).json({ code: result.code, message: result.message })
                }
                else {
                  console.log("88 app.js - ");
                    req.session.destroy(() => { })
                    res.status(200).json({ code: result.code, message: result.message })
                }
            })
            .catch(err => {
                req.session.destroy(() => { })
                logger.error(err.message)
                res.status(err.code ? err.code : 500).json({ message: err.message })
            })
    });

const registerService = require('./services/registerService')
app.post('/v1/register',
/** 
 * @param {ClientRequest} req
 * @param {ClientResponse} res
 */
function (req, res) {
    /** @type {RegisterRequestBody} */
    const body = req.body;
    console.log("app.js -106 body :"+JSON.stringify(body));
    registerService.register(body)
        .then(result => {
            /*  Status가 200인 경우에도 오류가 발생합니다. 주로 result.code의 상태 코드에 따라 다릅니다. */
            res.status(200).json({ code: result.code, message: result.message })
        })
        .catch(err => {
            logger.error(err.message)
            res.status(err.code ? err.code : 500).json({ message: err.message })
        })
});



/* 错误处理中间件 */
app.use(function (err, req, res, next) {
  logger.error(err)
})

/* 启动服务器 */
// app.listen( conf.port, () => {} )
server.listen(conf.port, () => { 
  console.log("Server port :" + conf.port +" start ");
})
/*************/

