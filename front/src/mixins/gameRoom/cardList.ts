import Vue from 'vue'
import { Card } from '@/type/game'


export const cardList = Vue.extend({
    data: function () {
        return {
            cardList: [
                /* 行数-10即是下标数 */
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
            ] as Card[],
        }
    },

    methods: {
        getIndexOfCardList: function (index: number) {
            if (index < 100) {
                return this.cardList[index]
            }
            return this.cardList[index - 100]
        }
    },
})