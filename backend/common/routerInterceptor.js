/* 路由拦截器 */

const conf = require('../config/')
const errors = require('./errors')
/** 
 * @typedef {import('../types/http').ClientRequest}
 * @typedef {import('../types/http').ClientResponse}
 * @typedef {import('express').NextFunction}
 */

module.exports =
    /** 
     * @param {ClientRequest} req
     * @param {ClientResponse} res
     * @param {NextFunction} next
     * @returns {void}
     */
    function (req, res, next) {
        res.header('Access-Control-Allow-Origin', conf.frontOrigin)
        res.header('Access-Control-Allow-Headers', conf.httpHeaders.allowHeaders)
        res.header('Access-Control-Allow-Methods', conf.httpHeaders.allowMethods)
        res.header('Access-Control-Allow-Credentials', conf.httpHeaders.allowCredentials)

        console.log("backend/common/routerInterceptor.js req._parsedUrl.path : " + req._parsedUrl.path);
        //요청한 경로가 로그인 또는 등록인 경우 통과
        // if (req._parsedUrl.path.indexOf('/rest/v1/login') !== -1 || req._parsedUrl.path.indexOf('/rest/v1/register') !== -1) {
        if (req._parsedUrl.path.indexOf('/v1/login') !== -1 || req._parsedUrl.path.indexOf('/v1/register') !== -1) {
            next();
            console.log("요청한 경로가 로그인 또는 등록인 경우 통과");
        }
        else {
            //요청이 다른 경로에 대한 것이고 요청에 session.username이 포함된 경우 전달합니다.
            if (req.session.username) {
                next();
                console.log("요청이 다른 경로에 대한 것이고 요청에 session.username이 포함된 경우 전달합니다. : "+req.session.username);
            }
            //그렇지 않으면 세션 만료 오류가 보고됩니다.
            else {
                console.log("그렇지 않으면 세션 만료 오류가 보고됩니다. errors.SESSION_TIMEOUT ");
                res.status(200).json(errors.SESSION_TIMEOUT);
            }
        }
    }