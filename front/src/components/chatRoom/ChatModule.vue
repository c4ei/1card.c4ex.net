<template>
    <el-main class="hide-scroll-bar" :style="{ backgroundImage: 'url(' + horizontalBackground + ')' }">
        <div class="chat-box" ref="chatBox">
            <el-alert class="chat-text" v-for="item in chatText" :key="item.id" :title="item.name + '：' + item.text"
                :type="item.type" :closable="false" show-icon></el-alert>
        </div>
        <el-input class="fill-width input-box" placeholder="채팅 내용을 입력해주세요" v-model="inputText"
            @keypress.native="enterSendText($event)" :size="buttonSize">
            <i slot="prefix" class="el-input__icon el-icon-edit"></i>
            <el-button id="input-button" slot="append" icon="el-icon-check" type="primary" @click="sendTextToServe()"
                :size="buttonSize" :disabled="inputText.length === 0">전송</el-button>
        </el-input>
    </el-main>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { ChatTextInfo } from '@/type/room'

export default Vue.extend({
    data() {
        return {
            inputText: '',
        }
    },

    props: {
        chatText: { type: Array as PropType<ChatTextInfo[]>, default: [] },
        horizontalBackground: { type: String, default: '' },
        buttonSize: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    methods: {
        enterSendText: function (e: KeyboardEvent) {
            if (e.key === 'Enter') this.sendTextToServe()
        },

        sendTextToServe: function () {
            if (this.inputText.length > 0) {
                this.ws?.send(JSON.stringify({ type: 'chat', nickname: this.$stock.state.nickname, text: this.inputText, player_loc: this.$stock.state.player_loc }))
                this.inputText = ""
            }
        },

        modifyScrollHeight: function () {
            const e = this.$refs.chatBox as Element
            e.scrollTop = e.scrollHeight
        },
    }
})
</script>