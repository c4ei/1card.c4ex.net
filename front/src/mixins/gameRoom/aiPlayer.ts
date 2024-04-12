import Vue from 'vue'
import { WebSocketPlayer } from '@/type/player'

export const aiPlayerMetaData : WebSocketPlayer[] = [
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
    { id: -29, username: '', nickname: '큭큭(I)', player_loc: 0, player_status: 1, avatar_id: 29 },
    { id: -30, username: '', nickname: '탕삼장(AI)', player_loc: 0, player_status: 1, avatar_id: 30 },
    { id: -31, username: '', nickname: '철공주부채(AI)', player_loc: 0, player_status: 1, avatar_id: 31 },
    { id: -32, username: '', nickname: '황소마왕(AI)', player_loc: 0, player_status: 1, avatar_id: 32 },
    { id: -33, username: '', nickname: '자샤요정(AI)', player_loc: 0, player_status: 1, avatar_id: 33 },
    { id: -34, username: '', nickname: '블라인드맨(AI)', player_loc: 0, player_status: 1, avatar_id: 34 },
    { id: -35, username: '', nickname: '최고 보물(AI)', player_loc: 0, player_status: 1, avatar_id: 35 },
]

export const aiPlayer = Vue.extend({
    data: function () {
        return {
            aiPlayerList: aiPlayerMetaData,
            currentAiPlayerIndexList: [] as number[],
        }
    },

})