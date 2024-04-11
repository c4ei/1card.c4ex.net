const conf = require('../config/')
const { asyncKeys, asyncMget, asyncTtl, asyncExpire, asyncDel } = require('../database/redis')
const errors = require('../common/errors')
const logoutHandler = require('../websocket/logoutHandler')
const wss = require('../websocket/')
const logger = require('../common/log')
const Account = require('../models/account')
/** 
 * @typedef {import('../types/http').ClientRequest}
 * @typedef {import('../types/http').RegisterRequestBody}
 * @typedef {import('../types/player').SequelizedModelAccount}
 * @typedef {import('../types/websocket').RedisCacheWebsocketInfo}
 */

module.exports = {
    /** @type {(req: ClientRequest) => Promise<{code:number, message:string, account?: {id: number, username: string, avatar_id: number, nickname: string}}>} */
    login: async function (req) {
        try {
            console.log("/backend/services/loginService.js 19");
            /** @type {RegisterRequestBody} */
            const body = req.body
            /** @type {SequelizedModelAccount[]} */
            const accounts = await Account.findAll({ where: { username: body.username } })
            console.log("/backend/services/loginService.js 24");
            if (accounts.length === 0) {
                console.log("/backend/services/loginService.js 26");
                return errors.USERNAME_NOT_FOUND
            }
            if (accounts[0].password === body.password) {
                console.log("/backend/services/loginService.js 30");
                return await getSession(req, accounts[0])
            }
            console.log("/backend/services/loginService.js 33");
            return errors.WRONG_PASSWORD
        } catch (e) {
            console.log("/backend/services/loginService.js 36 : " + e);
            logger.error(e)
            throw new Error({ message: e })
        }
    },

    /** @type {(req: ClientRequest) => Promise<void>} */
    logout: async function (req) { await logoutHandler(wss, req) }
}

/** 
 * @param {ClientRequest} req
 * @param {SequelizedModelAccount} account
 * @returns {Promise<{code:number, message:string, account?: {id: number, username: string, avatar_id: number, nickname: string}}>}
 */
async function getSession(req, account) {
    try {
        console.log("/backend/services/loginService.js 53 - account : " + JSON.stringify(account));
        /* 인증 통과는 가능하지만, 중복 세션이 있는지 확인해야 합니다. */
        const list = await asyncKeys(conf.redisCache.sessionPrefix + '*');
        if (list.length === 0) {
            console.log("/backend/services/loginService.js 57");
            return { code: 200, message: '', account: { id: account.id, username: account.username, avatar_id: account.avatar_id, nickname: account.nickname } }
        }
        console.log("/backend/services/loginService.js 59");
        const sessionRes = await asyncMget(list)
        /** @type {RegisterRequestBody} */
        const body = req.body
        /** @type {RedisCacheWebsocketInfo[]} */
        const sessions = []
        let sessionIp = ''
        console.log("/backend/services/loginService.js 66");
        sessionRes.forEach(item => { sessions.push(JSON.parse(item)) })
        let hasLogin = false // 중복된 로그인이 있나요?
        let sessionId = ''  //이미 로그인의 세션 ID가 있습니다
        for (let i = 0; i < sessions.length; i++) {
            if (sessions[i].username === body.username) {
                sessionId = conf.redisCache.sessionPrefix + sessions[i].sessionID
                sessionIp = sessions[i].ip
                hasLogin = true
                break
            }
        }
        console.log("/backend/services/loginService.js 78");
        if (hasLogin) {
            /* 중복된 로그인이 있는 경우 이미 로그인 세션의 ttl을 가져옵니다. */
            const ttlRes = await asyncTtl(sessionId)
            /* 이미 로그인 세션의 ttl이 숫자압착 판단 시간보다 작을 경우 해당 세션을 삭제하고 상대방 로그인을 허용합니다. */
            if (ttlRes < conf.ws.forceLogoutTtl || req.ip === sessionIp) {
                await asyncDel(sessionId)
                return { code: 200, message: '', account: { id: account.id, username: account.username, avatar_id: account.avatar_id, nickname: account.nickname } }
            }
            /* 번호 압착 결정 시간보다 큰 경우 세션의 TTL을 번호 압착 결정 시간으로 설정합니다. */
            await asyncExpire(sessionId, conf.ws.forceLogoutTtl)
            return errors.DUBLICATE_ACCESS
        }
        console.log("/backend/services/loginService.js 91");
        /* 반복되는 로그인이 없다면 판단할 필요 없이 그냥 로그인 성공입니다. */
        return { code: 200, message: '', account: { id: account.id, username: account.username, avatar_id: account.avatar_id, nickname: account.nickname } }
    } catch (e) {
        console.log("/backend/services/loginService.js 95 - e " + e);
        logger.error(e)
        throw new Error({ message: e })
    }
}