const poker = require('../common/poker')
const { strategy } = require('./strategy')

/**
* @typedef {import('../types/game.js').RedisCacheGame}
* @typedef {import('../types/game.js').GameWebsocketRequestData}
* @typedef {import('../types/common.js').GamePlayerSeatIndex}
*/

/** 
 * @summary 排列或组合多개元素
 * @param {number[]} allElements 所有元素
 * @param {number} count 需要选取的元素개数
 * @param {boolean} [isPermutation = true] 默认TRUE:排列,FALSE:组合
 * @returns {number[][]} 所有排列或组合的结果
 */
function permutationOrCombination(allElements, count, isPermutation = true) {

    /** @type {number[][]} */
    const result = []

    if (allElements.length < count || count === 0) {
        return result
    }

    allElements.forEach((element, index) => iteration(index, [element], allElements))
    /** 
     * @param {number} currentInedx 现在迭代的序数
     * @param {number[]} iterationArr 保存排列选取元素的数组
     * @param {number[]} arr 保存剩余迭代元素的数组
     */
    function iteration(currentInedx, iterationArr, arr) {
        if (iterationArr.length === count) { result.push(iterationArr) }
        const remainArr = arr.filter((element, index) => isPermutation ? index !== currentInedx : index > currentInedx)
        remainArr.forEach((element, index) => iteration(index, iterationArr.concat(element), remainArr))
    }

    return result
}

/** 
 * @summary 将排列组合去重。
 * @param {number[][]} allCombination 未去重的排列组合。
 * @returns {number[][]} 去重后的排列组合结果。
 */
function deDuplicatedCombination(allCombination) {

    /** @type {number[][]} */
    const tempResult = []

    const combinationsStrList = allCombination.map(combination => combination.toString())
    // 此阶段去掉的是플레이어手中有相同牌时造成的重复组合。如[1,2,2]取两장的情况下，组合[1,2],[2,1],[2,2]均会出现两次。
    const deDuplicatedCombinationsStrList = Array.from(new Set(combinationsStrList))
    deDuplicatedCombinationsStrList.forEach(combinationStr => { tempResult.push(combinationStr.split(",").map(str => parseInt(str))) })

    // 因为변환牌出现在基本牌或附属牌中意义不同，所以无须去重，直接将有변환牌的组合纳入结果中
    /** @type {number[][]} */
    const result = tempResult.filter(resItem => resItem.some(item => item >= 100))
    const orderedStrList = tempResult.filter(resItem => resItem.every(item => item < 100)).map(resItem => [...resItem].sort().toString())
    // 此阶段去掉的是牌型上的重复组合。如[1,2,2]取两장的情况下，组合[1,2],[2,1]只取其一即可，但有변환牌的组合则无须去重。
    const deDuplicatedOrderedStrList = Array.from(new Set(orderedStrList))
    deDuplicatedOrderedStrList.forEach(orderedStr => { result.push(orderedStr.split(",").map(str => parseInt(str))) })

    return result

}


/** 
 * @summary 过滤出排列组合中可打出的统一牌型。
 * @param {number[]} combination 排列组合。
 * @returns {boolean} 是否是可打出的统一牌型结果。
 */
function playCardFilter(combination) {
    if (combination.some(card => poker.getIndexOfCardList(card).num === 100)) {
        return combination.every(card => poker.getIndexOfCardList(card).num === 100) // 所有牌为반송 카드的情况返回TRUE
    }
    // 过滤出所有下标为1以上的牌的牌面等于基本牌的牌面或等于변환牌的牌型
    return combination.every((card, index) => index === 0 || (poker.getIndexOfCardList(card).num === poker.getIndexOfCardList(combination[0]).num || card >= 100))
}

/** 
 * @summary 获取指定장数时플레이어手中牌能打出的所有排列组合(仅去重和统一牌型，但不考虑牌型是否可管上现在牌池中的牌型)。
 * @description 只要定下了第一장基本牌，后面的牌均为附属牌，
 * 所以对于手中5장牌来说，取下标0,1,2,3,4分别作为基本牌，剩下的4장则作为附属牌来进行组合即可。
 * 所以若现有牌池为2장，플레이어手中牌为5장，则所有可打出的组合数为5*C4/2 = 30
 * @param {number[]} allCards 플레이어手中所有牌
 * @param {number} [count = 1] 需要打出的指定장数(小于等于플레이어플레이어手中所有牌장数，默认为1)
 * @returns {number[][]} 所有可打出的牌组合的结果(仅去重和统一牌型，但不考虑牌型是否可管上现在牌池中的牌型)
 */
function getPlayCardsListBySpecifiedCount(allCards, count = 1) {

    /** @type {number[][]} 플레이어手中牌能打出的所有排列组合(未去重) */
    const result = []
    if (allCards.length === 0) {
        return result
    }

    if (count === 1) {
        // 只打出1장的话，无须排列组合，直接遍历去重后的allCards数组即可。
        const tempList = Array.from(new Set(allCards))
        while (tempList.length > 0) {
            result.push([tempList.shift()])
        }
        return result
    }

    allCards.forEach((card, index) => {
        const allCardsExceptCurrentCard = allCards.filter((card, idx) => idx !== index) // 去除1장基本牌，剩下的牌作为附属牌
        const permutationOrCombinationResult = permutationOrCombination(allCardsExceptCurrentCard, count - 1, false) // 剩下的附属牌进行组合
        permutationOrCombinationResult.forEach(resItem => {
            resItem.unshift(card) // 将基本牌补回组合中
            result.push(resItem)
        })
    })

    /** @type {number[][]} 플레이어手中牌能打出的所有排列组合(去重) */
    const deDuplicatedResult = [] = deDuplicatedCombination(result)

    const playCardSListResult = deDuplicatedResult.filter(playCardFilter)

    return playCardSListResult

}


/** 
 * @summary 获取플레이어手中牌能打出的所有排列组合(去重统一且可管上现在牌池中的牌型,现在牌池中无牌时则获取所有可能장数牌能打出的所有排列组合)。
 * @description 与getPlayCardsListBySpecifiedCount的区别是不指定PLAY数，而是根据게임국势来指定。
 * @param {number[]} currentCard 现在牌池中的牌(>=0)。
 * @param {number[]} remainCards 플레이어手中所有牌(>0)。
 * @returns {number[][]} 各种能出的牌的组合。
 */
function getHigherPlayCardsList(currentCard, remainCards) {
    /** @type {number[][]} 各种能出的牌的组合，值为플레이어手中的该牌的序号 */
    let result = []
    if (currentCard.length === 0) { // 现在牌池中无牌时，不用考虑是否能管上，直接获取플레이어手中牌能打出的所有排列组合
        for (let i = 1; i <= remainCards.length; i++) {
            const playCards = getPlayCardsListBySpecifiedCount(remainCards, i)
            playCards.forEach(playCard => result.push(playCard))
        }
        return result
    }

    if (currentCard.length > remainCards.length) { // 现在牌池中的牌장数大于플레이어手中所有牌的장数。
        return result
    }

    const tempResult = getPlayCardsListBySpecifiedCount(remainCards, currentCard.length)
    const { num: currentCardNum } = poker.getIndexOfCardList(currentCard[0])

    result = tempResult.filter(tempResItem => {
        const { num: cardNum } = poker.getIndexOfCardList(tempResItem[0])
        if (cardNum === 100) { // 반송 카드的话纳入结果
            return true
        }
        if (currentCardNum < 30) { // 现在牌池中的牌为师傅以外的情况
            if (cardNum < currentCardNum) { // 过滤掉牌面小于牌池的牌组合
                return false
            }
            else if (cardNum > currentCardNum) { // 选取牌面大于牌池的牌组合
                return cardNum < 30 || currentCardNum > 20 // 牌面双方均不是师傅 或 现在牌池中是徒弟且打PLAY面是师傅
            }
        }
        // 现在牌池中的牌为师傅，选取牌面是요괴牌的牌组合
        if (currentCardNum === 31) {
            if (cardNum < 20) {
                return true
            }
            else if (cardNum < 30) {
                return false
            }
        }
        // 牌面等于现在牌池中牌面时，选取所有牌花色大于现在牌池中的牌花色的牌组合
        const compareItem = [...tempResItem].sort((a, b) => poker.getIndexOfCardList(a).suit - poker.getIndexOfCardList(b).suit)
        return compareItem.every((card, index) => poker.getIndexOfCardList(card).suit > poker.getIndexOfCardList(currentCard[index]).suit)
    })

    return result
}


/** 
 * @param {RedisCacheGame} game
 * @returns {GameWebsocketRequestData} PLAY的所有信息，action应为play。
 */
function aiPlay(game) {

    /** @type {GamePlayerSeatIndex} */
    const currentPlayer = game.currentPlayer
    const remainCards = game.gamePlayer[currentPlayer].remainCards
    const playCards = getHigherPlayCardsList(game.currentCard, remainCards)
    const playCard = strategy(game, playCards, remainCards)
    if (playCard.length > 0) {
        for (let i = 0; i < playCard.length; i++) {
            for (let j = 0; j < remainCards.length; j++) {
                if (remainCards[j] === playCard[i]) {
                    remainCards.splice(j, 1) // 把将要打出的牌从플레이어手中的牌移除
                    break
                }
            }
            if (poker.getIndexOfCardList(playCard[i]).num === 100) { // 반송 카드的话不作处理
                continue
            }
            if (playCard[i] >= 100) {
                if (i === 0) {
                    playCard[i] = playCard[i] - 100 //对首장牌进行处理，若为大于等于100的변환牌则减100作为基础牌
                    continue
                }
                if (poker.getIndexOfCardList(playCard[0]).num === poker.getIndexOfCardList(playCard[i]).num) {
                    if (Math.random() > 0.5) {
                        playCard[i] = playCard[i] - 100 //若附属的변환牌本身就等于基础牌，则有1/2几率作为基础牌，1/2几率作为변환牌
                        continue
                    }
                }
                //对附属的변환牌处理，牌面变为与原形牌相同，再加回100以示为변환牌
                playCard[i] = playCard[0] + poker.getIndexOfCardList(playCard[0]).suit - poker.getIndexOfCardList(playCard[i]).suit
                if (playCard[i] < 100) {
                    playCard[i] = playCard[i] + 100
                }
            }
        }
        playCard.sort((a, b) => {
            return poker.getIndexOfCardList(a).suit - poker.getIndexOfCardList(b).suit
        })
    }
    const result = {
        type: 'game',
        action: playCard.length > 0 ? 'play' : 'discard',
        id: game.id,
        seatIndex: currentPlayer,
        playCard: playCard,
        remainCards: remainCards
    }
    return result
}

const aiPlayerMetaData = [
    { id: -1,  username: '', nickname: '강한 왕 (AI)', player_loc: 0, player_status: 1, avatar_id: 1 },
    { id: -2,  username: '', nickname: '샤셍(AI)', player_loc: 0, player_status: 1, avatar_id: 2 },
    { id: -3,  username: '', nickname: '백룡마(AI)', player_loc: 0, player_status: 1, avatar_id: 3 },
    { id: -4,  username: '', nickname: '주 바지에(AI)', player_loc: 0, player_status: 1, avatar_id: 4 },
    { id: -5,  username: '', nickname: '부티마 웬(AI)', player_loc: 0, player_status: 1, avatar_id: 5 },
    { id: -6,  username: '', nickname: '당현장(AI)', player_loc: 0, player_status: 1, avatar_id: 6 },
    { id: -7,  username: '', nickname: '얼랑셴(AI)', player_loc: 0, player_status: 1, avatar_id: 7 },
    { id: -8,  username: '', nickname: '당승(AI)', player_loc: 0, player_status: 1, avatar_id: 8 },
    { id: -9,  username: '', nickname: '금나한(AI)', player_loc: 0, player_status: 1, avatar_id: 9 },
    { id: -10, username: '', nickname: '워커(AI)', player_loc: 0, player_status: 1, avatar_id: 10 },
    { id: -11, username: '', nickname: '싸우는 부처님 (AI)', player_loc: 0, player_status: 1, avatar_id: 11 },
    { id: -12, username: '', nickname: '여섯귀마카크(AI)', player_loc: 0, player_status: 1, avatar_id: 12 },
    { id: -13, username: '', nickname: '몽크 샤(AI)', player_loc: 0, player_status: 1, avatar_id: 13 },
    { id: -14, username: '', nickname: '웨라오(AI)', player_loc: 0, player_status: 1, avatar_id: 14 },
    { id: -15, username: '', nickname: '드래곤 킹(AI)', player_loc: 0, player_status: 1, avatar_id: 15 },
    { id: -16, username: '', nickname: '관음(AI)', player_loc: 0, player_status: 1, avatar_id: 16 },
    { id: -17, username: '', nickname: '원숭이왕(AI)', player_loc: 0, player_status: 1, avatar_id: 17 },
    { id: -18, username: '', nickname: '여래(AI)', player_loc: 0, player_status: 1, avatar_id: 18 },
    { id: -19, username: '', nickname: '티안펑 원수(AI)', player_loc: 0, player_status: 1, avatar_id: 19 },
    { id: -20, username: '', nickname: '현장(AI)', player_loc: 0, player_status: 1, avatar_id: 20 },
    { id: -21, username: '', nickname: '치궈왕(AI)', player_loc: 0, player_status: 1, avatar_id: 21 },
    { id: -22, username: '', nickname: '백호정령(AI)', player_loc: 0, player_status: 1, avatar_id: 22 },
    { id: -23, username: '', nickname: '토지(AI)', player_loc: 0, player_status: 1, avatar_id: 23 },
    { id: -24, username: '', nickname: '타이샹 라오쥔(AI)', player_loc: 0, player_status: 1, avatar_id: 24 },
    { id: -25, username: '', nickname: '옥황상제(AI)', player_loc: 0, player_status: 1, avatar_id: 25 },
    { id: -26, username: '', nickname: '나타(AI)', player_loc: 0, player_status: 1, avatar_id: 26 },
    { id: -27, username: '', nickname: '돼지 악마(AI)', player_loc: 0, player_status: 1, avatar_id: 27 },
    { id: -28, username: '', nickname: '킹 오브 토타(AI)', player_loc: 0, player_status: 1, avatar_id: 28 },
    { id: -29, username: '', nickname: '큭큭(AI)', player_loc: 0, player_status: 1, avatar_id: 29 },
    { id: -30, username: '', nickname: '탕삼장(AI)', player_loc: 0, player_status: 1, avatar_id: 30 },
    { id: -31, username: '', nickname: '철공주부채(AI)', player_loc: 0, player_status: 1, avatar_id: 31 },
    { id: -32, username: '', nickname: '황소마왕(AI)', player_loc: 0, player_status: 1, avatar_id: 32 },
    { id: -33, username: '', nickname: '자샤요정(AI)', player_loc: 0, player_status: 1, avatar_id: 33 },
    { id: -34, username: '', nickname: '블라인드맨(AI)', player_loc: 0, player_status: 1, avatar_id: 34 },
    { id: -35, username: '', nickname: '최고 보물(AI)', player_loc: 0, player_status: 1, avatar_id: 35 },
]

module.exports = {
    aiPlay: aiPlay,
    aiPlayerMetaData: aiPlayerMetaData
}
