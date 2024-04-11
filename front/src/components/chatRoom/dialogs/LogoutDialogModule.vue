<template>
    <el-dialog title="힌트" :visible.sync="cancelLeaveDialogVisible" :width="dialogWidth" center
        :before-close="closeLeaveDialog">
        <i class="el-icon-question"></i>
        <span style="text-align:center">로그아웃하고 게임 로비에서 나가시겠습니까?</span>
        <span slot="footer">
            <el-button @click="closeLeaveDialog" style="margin-right:10%">취소</el-button>
            <el-button type="danger" @click="logOut">확인</el-button>
        </span>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
import { removeToken } from '@/utils/cookie'
import { logout } from '@/api/login'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        cancelLeaveDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
    },

    methods: {
        closeLeaveDialog: function () {
            this.$emit('cancelLeaveDialogVisible', false)
        },

        logOut: function () {
            this.$message({ message: '로그아웃하고 로그인 페이지로 돌아왔습니다.', type: 'info' });
            logout().finally(() => { removeToken() });
            this.$router.push({ name: 'Login' })
            this.closeLeaveDialog()
        },
    }
})
</script>