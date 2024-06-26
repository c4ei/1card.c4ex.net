<template>
    <el-dialog title="방 만들기" :visible.sync="createGameRoomDialogVisible" :width="dialogWidth" center :modal="false"
        :close-on-click-modal="false" :before-close="closeCreateGameRoomDialog">
        <el-form :model="gameRoomValidateForm" ref="gameRoomValidateForm">
            <el-form-item label="방이름" prop="roomName" :rules="[{ required: true, message: '방이름을 입력해주세요', trigger: 'blur' }]">
                <el-input placeholder="방이름을 입력해주세요" type="text" v-model="gameRoomValidateForm.roomName" autocomplete="off"
                    maxlength="15" show-word-limit></el-input>
            </el-form-item>
            <el-form-item label="비밀번호" prop="password" :rules="[{ trigger: 'blur', validator: checkPassword }]">
                <el-input placeholder="선택사항, 4~8자리" v-model="gameRoomValidateForm.password" autocomplete="off" maxlength="8"
                    show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div>
            <span>사용된 카드 수：{{ gameRoomValidateForm.cardNum }}덱</span>
            <el-slider v-model="gameRoomValidateForm.cardNum" :min="2" :max="10" :step="1"
                :show-tooltip="false"></el-slider>
        </div>
        <div>
            <span>변신 카드 수：{{ gameRoomValidateForm.metamorphoseNum }}장/대리</span>
            <el-slider v-model="gameRoomValidateForm.metamorphoseNum" :min="0" :max="10" :step="2"
                :show-tooltip="false"></el-slider>
        </div>
        <div>
            <span>로봇 수：{{ gameRoomValidateForm.aiNum }}개</span>
            <el-slider v-model="gameRoomValidateForm.aiNum" :min="0" :max="7" :step="1"
                :show-tooltip="false"></el-slider>
        </div>
        <div slot="footer">
            <el-button @click="closeCreateGameRoomDialog" style="margin-right:10%">취소</el-button>
            <el-button type="success" @click="createGameRoom">만들다</el-button>
        </div>
    </el-dialog>
</template>


<script lang="ts">
import Vue from 'vue'
import { ExecuteValidator, ExecuteValidate } from '@/type/validator'
import { RoomPlayers, WebSocketGameRoom } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'
import { aiPlayerMetaData } from '@/mixins/gameRoom/aiPlayer'

const checkPassword: ExecuteValidator = (rule, value, callback) => {
    if (value === '') {
        callback();
    }
    else {
        const uPattern = /^[0-9]{4,8}$/
        if (!uPattern.test(value)) {
            callback(new Error('비밀번호须4到8位数字'));
        }
        else {
            callback();
        }
        callback();
    }
}
export default Vue.extend({
    data() {
        return {
            gameRoomValidateForm: {
                roomName: '',
                password: '',
                cardNum: 2,
                metamorphoseNum: 4,
                aiNum: 0,
            },
            checkPassword: checkPassword,
        }
    },

    props: {
        createGameRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        ws: { type: WebSocket, default: null },
    },

    watch: {
        createGameRoomDialogVisible: function (newVal: boolean) {
            if (newVal === true) {
                this.gameRoomValidateForm.roomName = this.$stock.state.nickname + ' 의 방'
            }
        }
    },

    methods: {
        createGameRoom: function () {
            if (this.$stock.state.avatar_id === 0) {
                this.$message.warning('아바타와 닉네임을 먼저 설정해주세요')
                return
            }
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.validate(valid => {
                if (valid) {
                    const playerList: RoomPlayers = {
                            0: { id: this.$stock.state.id, cards: 0, win: 0, loss: 0, ready: false },
                            1: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            2: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            3: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            4: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            5: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            6: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                            7: { id: 0, cards: 0, win: 0, loss: 0, ready: false },
                    }
                    if (this.gameRoomValidateForm.aiNum > 0) { // 추가컴퓨터플레이어
                        const aiPlayerLength = aiPlayerMetaData.length
                        const randomPickNums: number[] = []
                        for (let n = 0; n < aiPlayerLength; n++) {
                            randomPickNums.push(-1 * (n + 1))
                        }
                        for (let i = 0; i < this.gameRoomValidateForm.aiNum; i++) {
                            const seatIndex = i + 1 as GamePlayerSeatIndex
                            const randomPickNum = randomPickNums.splice(Math.floor(Math.random()*randomPickNums.length), 1)
                            playerList[seatIndex].id = randomPickNum[0]
                            playerList[seatIndex].ready = true
                        }
                    }
                    const createGameRoomDto: WebSocketGameRoom = {
                        id: NaN,
                        name: this.gameRoomValidateForm.roomName,
                        status: 0,
                        needPassword: this.gameRoomValidateForm.password.length > 0 ? true : false,
                        password: this.gameRoomValidateForm.password,
                        cardNum: this.gameRoomValidateForm.cardNum,
                        metamorphoseNum: this.gameRoomValidateForm.metamorphoseNum,
                        owner: this.$stock.state.id,
                        lastLoser: 0,
                        lastWinner: 0,
                        playerList: playerList
                    }
                    this.ws?.send(JSON.stringify({
                        type: 'gameRoomList',
                        ...createGameRoomDto,
                    }))
                    this.closeCreateGameRoomDialog()
                }
            })
        },

        closeCreateGameRoomDialog: function () {
            this.$emit('createGameRoomDialogVisible', false)
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.clearValidate()
            this.gameRoomValidateForm.roomName = this.$stock.state.nickname + ' 의 방'
            this.gameRoomValidateForm.password = ''
            this.gameRoomValidateForm.cardNum = 2
            this.gameRoomValidateForm.metamorphoseNum = 4
            this.gameRoomValidateForm.aiNum = 0
        },
    },

})
</script>