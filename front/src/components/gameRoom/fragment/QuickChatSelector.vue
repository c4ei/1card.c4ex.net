<template>
    <el-select size="medium" value-key="id" v-model="gameTextToPlayer" :placeholder="labelMessage"
        @change="emitSelectedTextToPlayer">
        <el-option :disabled="true" :label="labelMessage" value=""></el-option>
        <el-option v-for="item in $store.state.setting.textToPlayer" :key="item.id" :label="item.text"
            :value="item"></el-option>
    </el-select>
</template>

<script lang="ts">
import Vue from 'vue'
import { TextToPlayer } from '@/type/setting'

export default Vue.extend({
    data() {
        return {
            gameTextToPlayer: null as TextToPlayer | null,
        }
    },

    props: {
        labelMessage: { type: String, default: '플레이어가 말합니다.' },
    },

    methods: {
        emitSelectedTextToPlayer: function () {
            this.$emit('emitSelectedTextToPlayer', this.gameTextToPlayer)
            this.gameTextToPlayer = null
        },
    }
})
</script>