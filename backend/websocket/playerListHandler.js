const WebSocket = require('ws')
const { asyncKeys, asyncMget, asyncGetset } = require('../database/redis')
const conf = require('../config/')
const logger = require('../common/log')
/**
 * @typedef {import('../types/websocket.js').WebSocketServerInfo}
 * @typedef {import('../types/websocket.js').WebSocketInfo}
 * @typedef {import('../types/player.js').RedisCachePlayer}
 * @typedef {import('../types/player.js').PlayerListWebsocketRequestData}
 */

/**
 * @param {PlayerListWebsocketRequestData} data 플레이어列表的前端请求信息。
 * @param {WebSocketServerInfo} wss WebSocketServer信息，包含所有플레이어的WebSocket连接。
 * @param {WebSocketInfo} ws 单一플레이어的WebSocket连接(附带플레이어信息)。
 * @returns {Promise<void>}
 */
module.exports = async function (data, wss, ws) {
    try {
        if (data.action && data.action === 'get') {
            const playerKeys = await asyncKeys(conf.redisCache.playerPrefix + '*')
            if (playerKeys.length > 0) {
                const playerList = await asyncMget(playerKeys)
                ws.send(JSON.stringify({ type: 'playerList', data: playerList }))
            }
        }
        else {
            /* 1，设置플레이어最新信息，覆盖掉旧信息 */
            const res = await asyncGetset(conf.redisCache.playerPrefix + ws.userId,
                JSON.stringify({
                    id: ws.userId,
                    username: ws.username,
                    nickname: data.nickname,
                    player_loc: data.player_loc,
                    player_status: data.player_status,
                    avatar_id: data.avatar_id
                }))
            /* 2，检查该key是否存在，不存在则是新上线，否则是刷新信息 */
            if (res === null) {
                const onlineStr = JSON.stringify({ type: 'system', player_loc: 0, text: '플레이어 ' + data.nickname + ' 上线了' })
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN && client.username !== ws.username) {
                        client.send(onlineStr)
                    }
                })
            }
            /* 对比新旧信息 */
            else {
                /** @type {RedisCachePlayer} */
                const oldPlayer = JSON.parse(res)
                if (data.player_loc !== oldPlayer.player_loc) {
                    if (data.player_loc > 0) {
                        const enterRoomStr = JSON.stringify({ type: 'system', player_loc: data.player_loc, text: '플레이어 ' + data.nickname + ' 进入了房间' })
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN && client.userId !== ws.userId) {
                                client.send(enterRoomStr)
                            }
                        })
                    }
                    else {
                        const exitRoomStr = JSON.stringify({ type: 'system', player_loc: oldPlayer.player_loc, text: '플레이어 ' + data.nickname + ' 离开了房间' })
                        wss.clients.forEach(client => {
                            if (client.readyState === WebSocket.OPEN && client.userId !== ws.userId) {
                                client.send(exitRoomStr)
                            }
                        })
                    }
                }
            }
            /* 3，获取所有player플레이어，전송广播 */
            const playerKeys = await asyncKeys(conf.redisCache.playerPrefix + '*')
            if (playerKeys.length > 0) {
                const playerList = await asyncMget(playerKeys)
                const playerListStr = JSON.stringify({ type: 'playerList', data: playerList })
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(playerListStr)
                    }
                })
            }
        }
    } catch (e) {
        logger.error(e)
        throw new Error({ message: e })
    }
}