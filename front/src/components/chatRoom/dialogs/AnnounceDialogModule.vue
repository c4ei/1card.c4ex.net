<template>
    <el-dialog title="게시판" :visible.sync="announceDialogVisible" :width="dialogWidth" center :close-on-click-modal="false"
        :before-close="closeAnnounceDialog">
        <el-divider></el-divider>
        <h3 :style="{ 'font-size': fontSize }">2024년 4월 12일 업데이트됨</h3>
        <h4 :style="{ 'font-size': fontSize }"><i class="el-icon-circle-plus"></i>추가된 변신 카드 메커니즘:</h4>
        <p :style="{ 'font-size': fontSize }">●여러 장의 카드를 다룰 때 플레이어는 필요에 따라 변신 카드를 사용할 수 있습니다.</p>
        <p :style="{ 'font-size': fontSize }">●새 방을 만들거나 방 설정을 수정할 때 집주인은 각 덱의 변신 카드 수(0~10)를 선택할 수 있습니다.</p>
        <p :style="{ 'font-size': fontSize }">●게임 기록에 변신 카드에 대한 새로운 통계가 추가되었습니다.</p>
        <P :style="{ 'font-size': fontSize }">●변신 카드의 구체적인 규칙 및 사용법은 오른쪽 하단의 "도움말--게임 규칙--변신 카드"를 참조하십시오.</P>
        <div slot="footer">
            <el-button type="primary" @click="closeAnnounceDialog">닫기</el-button>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        announceDialogVisible: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '' },
        avatarSize: { type: Number, default: 20 },
        fontSize: { type: String, default: '' },
    },

    methods: {
        closeAnnounceDialog: function () {
            this.$emit('announceDialogVisible', false)
        }
    },
})
</script>