<template>
    <div v-if="isHorizontal" style="margin-left: 10%;" class="game-room-table-horizontal-box-middle-item">
        <transition leave-active-class="scale-out-top">
            <p v-show="gameInfo.remainCards > 0" class="white-color-font" :style="{ 'font-size': fontSize }">남은 카드 수</p>
        </transition>
        <transition leave-active-class="scale-out-top">
            <el-image v-show="gameInfo.remainCards > 0" :src="require('@/assets/images/poker/poker-pool.png')"
                style="max-width:3vw"></el-image>
        </transition>
        <div class="white-color-font"
            :style="{ 'font-size': fontSize, 'color': gameInfo.remainCards > 0 && gameInfo.remainCards < 10 ? 'red' : 'white' }">
            {{ gameInfo.remainCards > 0 ? gameInfo.remainCards + ' 장' : '이미 보냈습니다' }}</div>
    </div>
    <div v-else class="game-room-table-vertical-box-bottom-item">
        <transition leave-active-class="scale-out-top">
            <div v-show="gameInfo.remainCards > 0" class="white-color-font" :style="{ 'font-size': fontSize }">남은 카드 수</div>
        </transition>
        <transition leave-active-class="scale-out-top">
            <el-image v-show="gameInfo.remainCards > 0" :src="require('@/assets/images/poker/poker-pool.png')"
                style="max-width:3vw"></el-image>
        </transition>
        <div class="white-color-font"
            :style="{ 'font-size': fontSize, 'color': gameInfo.remainCards > 0 && gameInfo.remainCards < 10 ? 'red' : 'white' }">
            {{ gameInfo.remainCards > 0 ? gameInfo.remainCards + ' 장' : '이미 보냈습니다' }}</div>
    </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketGame } from '@/type/game'

export default Vue.extend({
    data() {
        return {

        }
    },

    props: {
        gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
        fontSize: { type: String, default: '' },
        isHorizontal: { type: Boolean, default: false },
    },
})
</script>

