import { ElMessage } from 'element-ui/types/message'
import VueRouter from 'vue-router'
import { Store } from 'vuex'
import { SystemSetting } from '@/type/setting'
import { PlayerStatus } from '@/type/index'

/**
 * @type {object}
 * @property {number} id - 账号id。
 * @property {string} username -  用户名
 * @property {number} avatar_id - 플레이어아바타id
 * @property {string} nickname - 닉네임
 * @property {boolean} isMobile - 是否是移动端
 * @property {number} player_loc - //0为게임大厅，其余为게임房间号
 * @property {PlayerStatus} player_status - //0: 게으른，1: 房间中기다리다，2: 게임中
 * @property {SystemSetting} setting - 系统설정
 */
type State = {
    id: number,
    username: string,
    avatar_id: number,
    nickname: string,
    isMobile: boolean,
    player_loc: number,
    player_status: PlayerStatus,
    setting: SystemSetting,
}


declare module 'vue/types/vue' {
    interface Vue {
        $message: ElMessage,
        $router: VueRouter,
        $stock: Store<State>
    }
}

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}
