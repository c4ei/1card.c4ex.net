<template>
    <div class="button-box" v-if="whichPattern === 'vertical'">
        <el-button v-if="playerLocRoom.owner === $store.state.id" :type="isNotReady || isGamePlaying ? 'info' : 'success'"
            class="chat-room-aside-button" icon="el-icon-caret-right" :style="{ 'font-size': largeFontSize }"
            @click="emitStartGame" :size="buttonSize" :disabled="isNotReady || isGamePlaying">게임을 시작하다</el-button>
        <el-button v-else :type="isNotReady && !isGamePlaying ? 'success' : 'info'" class="chat-room-aside-button"
            :icon="!isNotReady ? 'el-icon-circle-check' : 'el-icon-caret-right'" :style="{ 'font-size': largeFontSize }"
            @click="emitReadyToStartGame" :size="buttonSize" :disabled="isGamePlaying">{{ !isNotReady ? '준비완료' : '준비하다'
            }}</el-button>
        <el-button :type="isGamePlaying ? 'info' : 'danger'" class="chat-room-aside-button" icon="el-icon-d-arrow-left"
            :style="{ 'font-size': largeFontSize }" @click="emitCancelLeaveDialog" :size="buttonSize"
            :disabled="isGamePlaying">방을 나가다</el-button>
    </div>
    <div style="height: 100%" v-else>
        <el-button :type="isGamePlaying ? 'info' : 'danger'" class="chat-room-header-button" icon="el-icon-d-arrow-left"
            :style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" @click="emitCancelLeaveDialog" :size="buttonSize"
            round :disabled="isGamePlaying">방을 나가다</el-button>
        <el-button v-if="playerLocRoom.owner === $store.state.id" :type="isNotReady || isGamePlaying ? 'info' : 'success'"
            class="chat-room-header-button" icon="el-icon-caret-right"
            :style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" @click="emitStartGame" :size="buttonSize"
            :disabled="isNotReady || isGamePlaying" round>게임을 시작하다</el-button>
        <el-button v-else :type="isNotReady && !isGamePlaying ? 'success' : 'info'" class="chat-room-header-button"
            :icon="!isNotReady ? 'el-icon-circle-check' : 'el-icon-caret-right'"
            :style="{ 'font-size': largeFontSize, 'padding': '0px 0px' }" @click="emitReadyToStartGame" :size="buttonSize"
            round :disabled="isGamePlaying">{{ !isNotReady ? '이미' : '' }}준비하다</el-button>
    </div>
</template>


<script lang="ts">
import Vue, { PropType } from 'vue'
import { GamePlayerSeatIndex } from '@/type/index'
import { WebSocketGameRoom } from '@/type/room'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        whichPattern: {
            type: String as PropType<'horizontal' | 'vertical'>,
            default: function () {
                if (document.body.clientWidth < 400) {
                    return 'horizontal'
                }
                return 'vertical'
            }
        },
        buttonSize: { type: String, default: '' },
        largeFontSize: { type: String, default: '' },
        playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },
        ws: { type: WebSocket, default: null },
    },

    computed: {
        isGamePlaying: function (): boolean {
            return this.playerLocRoom.status === 0 ? false : true
        },

        isNotReady: function (): boolean {
            /* 房主的情况下 */
            if (this.playerLocRoom.owner === this.$stock.state.id) {
                let isAllReady = true
                /* 至少两人才能开게임 */
                let playerNum = 0
                for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                    if (this.playerLocRoom.playerList[i as GamePlayerSeatIndex].id === 0) {
                        continue
                    }
                    else {
                        playerNum++
                    }
                }
                if (playerNum < 2) {
                    return true
                }
                /* 除房主之外的人都준비완료好 */
                for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                    if (this.playerLocRoom.playerList[i as GamePlayerSeatIndex].id === 0) {
                        continue
                    }
                    else if (this.playerLocRoom.playerList[i as GamePlayerSeatIndex].id !== this.$stock.state.id && this.playerLocRoom.playerList[i as GamePlayerSeatIndex].ready === false) {
                        isAllReady = false
                        break
                    }
                }
                return isAllReady === false ? true : false
            }
            else {
                for (let i = 0; i < Object.keys(this.playerLocRoom.playerList).length; i++) {
                    if (this.playerLocRoom.playerList[i as GamePlayerSeatIndex].id === this.$stock.state.id) {
                        return this.playerLocRoom.playerList[i as GamePlayerSeatIndex].ready ? false : true
                    }
                }
                return false
            }
        },
    },

    methods: {
        emitCancelLeaveDialog: function () {
            this.$emit('leaveRoomDialogVisible', true)
        },

        emitReadyToStartGame: function () {
            this.ws?.send(JSON.stringify({
                type: 'gameRoomList',
                id: this.playerLocRoom.id,
                action: 'ready',
            }))
        },

        emitStartGame: function () {
            this.ws?.send(JSON.stringify({
                type: 'game',
                id: this.playerLocRoom.id,
                action: 'initialize',
            }))
        }
    }
})
</script>

<style>
.button-box {
    margin-top: 5%;
    width: 80%;
    height: 20%;
    margin-left: 10%;
    border-radius: 4px;
}

.chat-room-header-button {
    float: right;
    width: 20%;
    margin-top: 2%;
    height: 80%;
}

.chat-room-header-button:first-of-type {
    margin-right: 5%;
}

.chat-room-aside-button {
    width: 100%;
    height: 40%;
    margin-bottom: 5%;
}
</style>