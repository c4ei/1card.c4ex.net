<template>
    <div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">배경 음악</span>
                <el-switch style="float: right" v-model="backgroundMusic" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{ 'font-size': fontSize }" style="line-height: 40px">음악 볼륨</span>
            <el-slider style="width: 70%; float: right;" v-model="bgmVolume" :disabled="!backgroundMusic"
                :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">음향 효과</span>
                <el-switch style="float: right" v-model="soundEffect" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
        <div class="setting_item" v-if="!isIphoneOrIpad">
            <span :style="{ 'font-size': fontSize }" style="line-height: 40px">볼륨</span>
            <el-slider style="width: 70%; float: right;" v-model="soundVolume" :disabled="!soundEffect"
                :show-tooltip="false"></el-slider>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">안내음</span>
                <el-switch style="float: right" v-model="youTurnVoice" active-color="#13ce66" inactive-color="#ff4949"
                    :disabled="!soundEffect"></el-switch>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }" style="line-height: 40px">SPEED</span>
                <el-select :multiple-limit="10" value-key="id" v-model="quickChat" multiple collapse-tags
                    style="float: right" placeholder="선택">
                    <el-option-group v-for="group in messageGroups" :key="group.label" :label="group.label">
                        <el-option v-for="item in group.options" :key="item.id" :label="item.text"
                            :value="item"></el-option>
                    </el-option-group>
                </el-select>
            </div>
        </div>
        <div class="setting_item">
            <div>
                <span :style="{ 'font-size': fontSize }">변신 카드 테두리</span>
                <el-switch style="float: right" v-model="bianshenSwitch" active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TextToPlayer } from '@/type/setting'
import { playBgm, modifyBgmVolume, modifySoundVolume } from '@/utils/soundHandler'

export default Vue.extend({
    data() {
        return {
            messageGroups: [
                {
                    label: '조소',
                    options:
                        [
                            { id: 1, music: "1", text: "당신은 카드를 너무 잘 썼어요" },
                            { id: 2, music: "2", text: "꽃이 시들 때까지 기다렸어요" },
                            { id: 3, music: "3", text: "행복한 협력" },
                            { id: 4, music: "4", text: "떠나지 마, 우리는 새벽까지 싸울 거야" }
                        ]
                },
                {
                    label: '도움',
                    options:
                        [
                            { id: 5, music: "5", text: "조금조금조금" },
                            { id: 6, music: "6", text: "대대대" },
                            { id: 7, music: "7", text: "스승을 구하라" },
                            { id: 8, music: "8", text: "레이맨을 구하라" },
                            { id: 9, music: "9", text: "차례를 묻는다" }
                        ]
                },
                {
                    label: '카드받다',
                    options:
                        [
                            { id: 10, music: "10", text: "받다" },
                            { id: 11, music: "11", text: "난 너무 힘들어" },
                            { id: 12, music: "12", text: "나는 사라졌다" },
                            { id: 13, music: "13", text: "전략적인 카드를 받다" }
                        ]
                },
                {
                    label: '방언',
                    options:
                        [
                            { id: 14, music: "14", text: "씻다" },
                            { id: 15, music: "15", text: "위치" },
                            { id: 16, music: "16", text: "롤롤롤" },
                            { id: 17, music: "17", text: "조금조금조금(구이)" },
                            { id: 18, music: "18", text: "대대대(구이)" },
                            { id: 19, music: "19", text: "나는 나쁘다" },
                            { id: 20, music: "20", text: "엉터리" },
                            { id: 21, music: "21", text: "탐닉" },
                            { id: 22, music: "22", text: "나는 너무 친절하다" },
                            { id: 23, music: "23", text: "오다" },
                        ]
                }
            ]
        }
    },

    props: {
        fontSize: { type: String, default: '' },
    },

    computed: {
        isIphoneOrIpad: function () {
            const u = navigator.userAgent
            return u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1
        },

        backgroundMusic: {
            get(): boolean {
                return this.$stock.state.setting.playBgm
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.playBgm = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        playBgm()
                    })
            }
        },

        soundEffect: {
            get(): boolean {
                return this.$stock.state.setting.playSound
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.playSound = value
                if (value === false) {
                    setting.youTurnVoice = value
                }
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        bgmVolume: {
            get(): number {
                return this.$stock.state.setting.bgmVolume
            },
            set(value: number): void {
                const setting = this.$stock.state.setting
                setting.bgmVolume = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        modifyBgmVolume(parseFloat((value / 100).toFixed(1)))
                    })
            }
        },

        soundVolume: {
            get(): number {
                return this.$stock.state.setting.soundVolume
            },
            set(value: number): void {
                const setting = this.$stock.state.setting
                setting.soundVolume = value
                this.$stock.dispatch('mutateSetting', setting)
                    .then(() => {
                        modifySoundVolume(parseFloat((value / 100).toFixed(1)))
                    })
            }
        },

        youTurnVoice: {
            get(): boolean {
                return this.$stock.state.setting.youTurnVoice
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.youTurnVoice = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        quickChat: {
            get(): TextToPlayer[] {
                return this.$stock.state.setting.textToPlayer
            },
            set(value: TextToPlayer[]): void {
                const setting = this.$stock.state.setting
                setting.textToPlayer = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },

        bianshenSwitch: {
            get(): boolean {
                return this.$stock.state.setting.bianshenBorder
            },
            set(value: boolean): void {
                const setting = this.$stock.state.setting
                setting.bianshenBorder = value
                this.$stock.dispatch('mutateSetting', setting)
            }
        },
    },
})
</script>

<style scoped>
.setting_item {
    margin-bottom: 5%;
    height: 15%;
}
</style>