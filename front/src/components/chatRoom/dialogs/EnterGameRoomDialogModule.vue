<template>
    <el-dialog title="房间비밀번호" :visible.sync="enterGameRoomDialogVisible" :width="dialogWidth" center :modal="false"
        :close-on-click-modal="false" :before-close="closeEnterGameRoomDialog">
        <el-form :model="gameRoomValidateForm" ref="gameRoomValidateForm" @submit.native.prevent="enterGameRoom">
            <el-form-item label="비밀번호" prop="password" :rules="[{ trigger: 'blur', validator: checkPassword }]">
                <el-input placeholder="4到8位数字" v-model="gameRoomValidateForm.password" autocomplete="off" maxlength="8"
                    show-word-limit></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button @click="closeEnterGameRoomDialog" style="margin-right:10%">취소</el-button>
            <el-button type="success" @click="enterGameRoom">확인</el-button>
        </div>
    </el-dialog>
</template>



<script lang="ts">
import Vue, { PropType } from 'vue'
import { EnterRoomDto } from '@/type/room'
import { ExecuteValidator, ExecuteValidate } from '@/type/validator'

const checkPassword: ExecuteValidator = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('비밀번호不能为空'));
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
                password: '',
            },
            checkPassword: checkPassword,
        }
    },

    props: {
        enterGameRoomDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        enterRoomDto: { type: Object as PropType<EnterRoomDto>, default: null },
        ws: { type: WebSocket, default: null },
    },

    watch: {
        enterGameRoomDialogVisible: function (newVal: boolean) {
            if (!this.$refs.gameRoomValidateForm) return
            if (newVal === true) {
                this.gameRoomValidateForm.password = ''
                const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
                gameRoomValidateFormRef.clearValidate()
            }
        }
    },

    methods: {
        enterGameRoom: function () {
            if (this.$stock.state.avatar_id === 0) {
                this.$message.warning('请先设置头像和昵称')
                return
            }
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.validate(valid => {
                if (valid) {
                    this.ws?.send(JSON.stringify({
                        type: 'gameRoomList',
                        id: this.enterRoomDto.id,
                        seatIndex: this.enterRoomDto.seatIndex,
                        password: this.gameRoomValidateForm.password,
                        aiPlayerId: 0,
                        action: 'enter',
                    }))
                    this.closeEnterGameRoomDialog()
                }
            })
        },

        closeEnterGameRoomDialog: function () {
            this.$emit('enterGameRoomDialogVisible', false)
            this.gameRoomValidateForm.password = ''
            const gameRoomValidateFormRef = this.$refs.gameRoomValidateForm as Element & ExecuteValidate
            gameRoomValidateFormRef.clearValidate()
        },
    }
})
</script>