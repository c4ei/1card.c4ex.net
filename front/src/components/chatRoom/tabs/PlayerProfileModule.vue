<template>
    <div class="player-profile-box">
        <el-image style="margin-left: 35%; width: 30%" :src="getAvatarUrl(playerProfile.avatar_id)"
            :fit="'fill'"></el-image>
        <p class="player-profile-line" v-if="playerProfile.id === $store.state.id">
            <el-tooltip effect="light" :content="'距下次升级：' + currentExp + ' / ' + nextLevelExp" placement="top">
                <el-progress :text-inside="true" :percentage="expPecent" :stroke-width="20" status="success"></el-progress>
            </el-tooltip>
        </p>
        <p class="player-profile-line">
            <span>레벨：</span>
            <span class="player-profile-line-right">{{ level }}级</span>
        </p>
        <p class="player-profile-line">
            <span>게임수：</span>
            <span class="player-profile-line-right">{{ playerProfile.record.num_of_game }}국</span>
        </p>
        <p class="player-profile-line">
            <el-tooltip effect="light" content="某국中수집된 카드 수最少" placement="right">
                <span>우승：</span>
            </el-tooltip>
            <span class="player-profile-line-right">{{ playerProfile.record.least_game }}국</span>
        </p>
        <p class="player-profile-line">
            <el-tooltip effect="light" content="某국中수집된 카드 수最多" placement="right">
                <span>당기기：</span>
            </el-tooltip>
            <span class="player-profile-line-right">{{ playerProfile.record.most_game }}국</span>
        </p>
        <p class="player-profile-line">
            <span>총 수집된 카드 수：</span>
            <span class="player-profile-line-right">{{ playerProfile.record.experienced_cards }}장</span>
        </p>
        <p class="player-profile-line">
            <span>평균 수집된 카드 수：</span>
            <el-tooltip effect="light"
                :content="playerProfile.record.experienced_cards + ' / ' + playerProfile.record.num_of_game"
                placement="left">
                <span class="player-profile-line-right">{{ playerProfile.record.num_of_game === 0 ? 0 :
                    (playerProfile.record.experienced_cards / playerProfile.record.num_of_game).toFixed(1) }}장</span>
            </el-tooltip>
        </p>
        <p class="player-profile-line">
            <span>최대 콤보 카드 수：</span>
            <span class="player-profile-line-right">{{ playerProfile.record.max_combo }}장</span>
        </p>
        <p class="player-profile-line">
            <span>최소 수집된 카드 수：</span>
            <span class="player-profile-line-right">{{ playerProfile.record.least_cards === -1 ? 0 :
                playerProfile.record.least_cards }}장</span>
        </p>
        <p class="player-profile-line">
            <el-tooltip effect="light" content="수집된 카드 수占该국플레이어平均수집된 카드 수的比例(小于100%)" placement="right">
                <span>최소 마감 비율：</span>
            </el-tooltip>
            <el-tooltip effect="light"
                :content="playerProfile.record.min_card + ' / ' + playerProfile.record.min_card_amount" placement="left">
                <span class="player-profile-line-right">{{ playerProfile.record.min_card_amount === 0 ? 0 :
                    (playerProfile.record.min_card * 100 / playerProfile.record.min_card_amount).toFixed(1) }}%</span>
            </el-tooltip>
        </p>
        <p class="player-profile-line">
            <span>최다 주문 수집된 카드 수：</span>
            <span class="player-profile-line-right">{{ playerProfile.record.most_cards }}장</span>
        </p>
        <p class="player-profile-line">
            <el-tooltip effect="light" content="수집된 카드 수占该국플레이어平均수집된 카드 수的比例(至少100%)" placement="right">
                <span>최고단일카드 마감비율：</span>
            </el-tooltip>
            <el-tooltip effect="light"
                :content="playerProfile.record.max_card + ' / ' + playerProfile.record.max_card_amount" placement="left">
                <span class="player-profile-line-right">{{ playerProfile.record.max_card_amount === 0 ? 0 :
                    (playerProfile.record.max_card * 100 / playerProfile.record.max_card_amount).toFixed(1) }}%</span>
            </el-tooltip>
        </p>
        <br>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { PlayerProfile } from '@/type/record'
import { calExperience } from '@/utils/calculator'

export default Vue.extend({
    data() {
        return {
            level: 0,
            expPecent: 0,
            currentExp: 0,
            nextLevelExp: 0,
        }
    },

    watch: {
        'playerProfile.record.experience': {
            immediate: true,
            handler: function (newVal: number) {
                const result = calExperience(newVal)
                this.currentExp = result.currentExp
                this.nextLevelExp = result.nextLevelExp
                this.level = result.level
                this.expPecent = result.expPecent
            }
        }
    },

    props: {
        playerProfile: { type: Object as PropType<PlayerProfile>, default: null },
    },

    methods: {
        getAvatarUrl: function (avatarId: number) {
            return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
        },
    },
})
</script>

<style>
.player-profile-box {
    background-image: url('~@/assets/images/icon-select-background.png');
    background-size: 100% 100%;
}

.player-profile-line {
    width: 80%;
    padding-left: 10%;
    padding-right: 10%;
    background-color: rgba(211, 197, 197, 0.2);
}

.player-profile-line:hover {
    background-color: rgba(243, 230, 230, 0.2);
}

.player-profile-line-right {
    float: right;
}
</style>