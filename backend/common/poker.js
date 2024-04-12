/* 扑克牌配置文件 */
/** 
 * @typedef {import("../types/game.js").Pokers}
 */
/** 
 * @type {Pokers}
 */
const localCardList = [
    // 牌序数为行数-10, 如红桃요괴2为第11行，则序数为11-10=1
    { num: 2, suit: 4, src: '2A', name: '요괴2' },
    { num: 2, suit: 3, src: '2B', name: '요괴2' },
    { num: 2, suit: 2, src: '2C', name: '요괴2' },
    { num: 2, suit: 1, src: '2D', name: '요괴2' },
    { num: 4, suit: 4, src: '4A', name: '요괴4' },
    { num: 4, suit: 3, src: '4B', name: '요괴4' },
    { num: 4, suit: 2, src: '4C', name: '요괴4' },
    { num: 4, suit: 1, src: '4D', name: '요괴4' },
    { num: 6, suit: 4, src: '6A', name: '요괴6' },
    { num: 6, suit: 3, src: '6B', name: '요괴6' },
    { num: 6, suit: 2, src: '6C', name: '요괴6' },
    { num: 6, suit: 1, src: '6D', name: '요괴6' },
    { num: 7, suit: 4, src: '7A', name: '요괴7' },
    { num: 7, suit: 3, src: '7B', name: '요괴7' },
    { num: 7, suit: 2, src: '7C', name: '요괴7' },
    { num: 7, suit: 1, src: '7D', name: '요괴7' },
    { num: 9, suit: 4, src: '9A', name: '요괴9' },
    { num: 9, suit: 3, src: '9B', name: '요괴9' },
    { num: 9, suit: 2, src: '9C', name: '요괴9' },
    { num: 9, suit: 1, src: '9D', name: '요괴9' },
    { num: 11, suit: 4, src: '11A', name: '요괴J' },
    { num: 11, suit: 3, src: '11B', name: '요괴J' },
    { num: 11, suit: 2, src: '11C', name: '요괴J' },
    { num: 11, suit: 1, src: '11D', name: '요괴J' },
    { num: 12, suit: 4, src: '12A', name: '요괴Q' },
    { num: 12, suit: 3, src: '12B', name: '요괴Q' },
    { num: 12, suit: 2, src: '12C', name: '요괴Q' },
    { num: 12, suit: 1, src: '12D', name: '요괴Q' },
    { num: 13, suit: 4, src: '13A', name: '요괴K' },
    { num: 13, suit: 3, src: '13B', name: '요괴K' },
    { num: 13, suit: 2, src: '13C', name: '요괴K' },
    { num: 13, suit: 1, src: '13D', name: '요괴K' },
    { num: 14, suit: 4, src: '1A', name: '요괴A' },
    { num: 14, suit: 3, src: '1B', name: '요괴A' },
    { num: 14, suit: 2, src: '1C', name: '요괴A' },
    { num: 14, suit: 1, src: '1D', name: '요괴A' },
    { num: 21, suit: 4, src: '3A', name: '샤셍' },
    { num: 21, suit: 3, src: '3B', name: '샤셍' },
    { num: 21, suit: 2, src: '3C', name: '샤셍' },
    { num: 21, suit: 1, src: '3D', name: '샤셍' },
    { num: 22, suit: 4, src: '8A', name: '바지에' },
    { num: 22, suit: 3, src: '8B', name: '바지에' },
    { num: 22, suit: 2, src: '8C', name: '바지에' },
    { num: 22, suit: 1, src: '8D', name: '바지에' },
    { num: 23, suit: 4, src: '5A', name: '오공' },
    { num: 23, suit: 3, src: '5B', name: '오공' },
    { num: 23, suit: 2, src: '5C', name: '오공' },
    { num: 23, suit: 1, src: '5D', name: '오공' },
    { num: 31, suit: 4, src: '10A', name: '당나라승려' },
    { num: 31, suit: 3, src: '10B', name: '당나라승려' },
    { num: 31, suit: 2, src: '10C', name: '당나라승려' },
    { num: 31, suit: 1, src: '10D', name: '당나라승려' },
    { num: 100, suit: 1, src: 'black-joker', name: '리바운드' },
    { num: 100, suit: 2, src: 'red-joker', name: '리바운드' },
]

module.exports = {
    /** 扑克牌数组。 */
    cardList: localCardList,

    /** 
     * @description 获取扑克牌的信息
     * @param {number} index 序号
     * @returns {Poker} 除去可能存在的변환牌+100后的牌信息
     */
    getIndexOfCardList: function (index) {
        if (index < 100) {
            return localCardList[index]
        }
        return localCardList[index - 100]
    },

    /** 
     * @description 洗牌处理
     * @param {number[]} array 扑克牌序号数组
     * @param {number} size 洗牌后的数组大小，默认为array的长度
     * @returns {void}
     */
    shuffle: function (array, size) {
        let index = -1
        const length = array.length
        const lastIndex = length - 1

        size = size === undefined ? length : size
        while (++index < size) {
            const rand = index + Math.floor(Math.random() * (lastIndex - index + 1))
            value = array[rand]
            array[rand] = array[index]
            array[index] = value
        }
        array.length = size
    },

    /** 
    * @summary 获取给定范围中的随机整数。
    * @param {number} min 最小值
    * @param {number} max 最大值
    * @returns {number} 最小值与最大值之间闭区间的整数值。
    */
    getRandom: function (min, max) {
        const floatRandom = Math.random()

        const difference = max - min

        // 介于 0 和差值之间的随机数
        const random = Math.round(difference * floatRandom)

        const randomWithinRange = random + min

        return randomWithinRange
    },

    /** 每一轮PLAY기다리다的时间 */
    waitTime: 20000,
    /** 플레이어호스팅时기다리다的时间 */
    offLineWaitTime: 1000,
    /** 컴퓨터플레이어PLAY时기다리다的基础时间 */
    aiPlayBasicWaitTime: 1500,
    /** 컴퓨터플레이어PLAY时기다리다的附加时间的随机值 */
    aiPlayerRandomWaitTime: 1000,
}