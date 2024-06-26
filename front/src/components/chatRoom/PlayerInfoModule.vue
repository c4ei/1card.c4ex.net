<template>
	<el-aside class="hide-scroll-bar" :width="subAsideWidth"
		:style="{ backgroundImage: 'url(' + verticalBackground + ')' }">
		<el-tooltip :disabled="$store.state.isMobile" effect="light" content="클릭하면 아바타 변경" placement="left">
		<div class="player-icon-box" @click="openEditAvatarDialog">
			<el-image v-if="gameInfo === null || gameInfo.currentPlayer === -1" class="aside-icon"
			:src="getAvatarUrl($store.state.avatar_id)"></el-image>
			<AnimatedAvatar v-else :avatarClass="'aside-icon'" :avatarUrl="getAvatarUrl($store.state.avatar_id)"
			:currentPlayerCards="getGamePlayer !== null ? getGamePlayer.cards : 0"
			:isCurrentPlayer="gameInfo.gamePlayer[gameInfo.currentPlayer].id === $store.state.id"
			:currentGameCombo="gameInfo.currentCombo"></AnimatedAvatar>
		</div>
		</el-tooltip>
		<el-tooltip :disabled="$store.state.isMobile" effect="light" content="닉네임변경하려면 클릭하세요" placement="left">
		<div class="player-nickname-box" :style="{ 'font-size': fontSize }" @click="openEditNicknameDialog">
			<span>{{ $store.state.nickname }}</span>
		</div>
		</el-tooltip>
		<div class="player-setting-box">
		<el-button class="setting-button" :style="{ 'font-size': fontSize }" type="info" icon="el-icon-view"
			@click="openViewModule">확인</el-button>
		<el-button class="help-button" :style="{ 'font-size': fontSize }" type="warning" icon="el-icon-s-opportunity"
			@click="openHelpModule">돕다</el-button>
		</div>

		<el-dialog title="변경아바타" :visible.sync="avatarDialogVisible" center :width="dialogWidth" :modal="false">
		<el-divider></el-divider>
		<div class="icon-select-box">
			<div class="icon-block" :class="{ 'icon-is-selected': temAvatarId === n }" v-for="n in iconNum" :key="n"
			@click="temAvatarId = n">
			<el-image :src="getAvatarUrl(n)" :fit="'fill'"></el-image>
			</div>
		</div>
		<span slot="footer">
			<el-button @click="avatarDialogVisible = false" style="margin-right:10%">취소</el-button>
			<el-button type="primary" @click="submitNewAvatar">변경</el-button>
		</span>
		</el-dialog>

		<el-dialog title="닉네임변경" :visible.sync="nicknameDialogVisible" center :width="dialogWidth"
		:close-on-click-modal="false" :modal="false">
		<el-form :model="nicknameForm" ref="nicknameForm" @submit.native.prevent="submitNewNickname">
			<el-form-item label="새로운 별명" prop="name" :rules="[{ required: true, validator: checkNickname, trigger: 'blur' }]">
			<el-input v-model="nicknameForm.name" autocomplete="off" placeholder="새로운 별명 입력" maxlength="10" show-word-limit>
				<i slot="prefix" class="el-input__icon el-icon-edit-outline"></i>
			</el-input>
			</el-form-item>
		</el-form>
		<div slot="footer">
			<el-button @click="cancelNicknameEdit" style="margin-right:10%">취소</el-button>
			<el-button type="primary" @click.stop.prevent="submitNewNickname">변경</el-button>
		</div>
		</el-dialog>

		<el-dialog title="확인" :visible.sync="viewModuleDialogVisible" center :width="playerInfoDialogWidth" :modal="false">
		<PlayerInfoTabModule :playerProfile="playerProfile" :fontSize="fontSize" :isShowing="viewModuleDialogVisible"
			@sendGameResultToPlayerInfo="function (value) { $emit('sendGameResultToChatRoom', value) }"></PlayerInfoTabModule>
		<span slot="footer" class="dialog-footer">
			<el-button type="danger" @click="viewModuleDialogVisible = false" :style="{ 'font-size': fontSize }"
			:size="buttonSize">닫기</el-button>
		</span>
		</el-dialog>

		<el-dialog title="돕다" :visible.sync="helpModuleDialogVisible" center :width="playerInfoDialogWidth" :modal="false">
		<HelpModule :isShowing="helpModuleDialogVisible" :fontSize="fontSize" :avatarSize="avatarSize"></HelpModule>
		<span slot="footer" class="dialog-footer">
			<el-button type="danger" @click="helpModuleDialogVisible = false" :style="{ 'font-size': fontSize }"
			:size="buttonSize">닫기</el-button>
		</span>
		</el-dialog>
	</el-aside>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { WebSocketGameRoom } from '@/type/room'
import { GamePlayerSeatIndex } from '@/type/index'
import { PlayerProfile } from '@/type/record'
import { WebSocketGame, WebSocketPlayerInGame } from '@/type/game'
import { InternalRuleItem, Value, ExecuteValidate } from '@/type/validator'
import { modifyAvatar, modifyNickname } from '@/api/modify'
import PlayerInfoTabModule from '@/components/chatRoom/PlayerInfoTabModule.vue'
import { getPlayerRecord } from '@/api/infoSearch'
import AnimatedAvatar from '@/components/gameRoom/fragment/AnimatedAvatar.vue'
import HelpModule from '@/components/chatRoom/HelpModule.vue'

export default Vue.extend({

	data() {
		return {
			avatarDialogVisible: false,
			nicknameDialogVisible: false,
			viewModuleDialogVisible: false,
			helpModuleDialogVisible: false,
			duplicateSubmitAvatarFlag: false,
			duplicateSubmitNicknameFlag: false,
			duplicateGetInfoFlag: false,
			activeViewModuleTabName: 'record',
			/* 아바타数量 */
			iconNum: 35,
			/* 暂时选择的아바타Id */
			temAvatarId: 0,
			nicknameForm: { name: '' },
			playerProfile: {
				id: 0,
				avatar_id: 0,
				nickname: '',
				record: {
				num_of_game: 0,
				most_game: 0,
				least_game: 0,
				experience: 0,
				experienced_cards: 0,
				max_card: 0,
				max_card_amount: 0,
				min_card: 0,
				min_card_amount: 0,
				least_cards: 0,
				most_cards: 0,
				}
			} as PlayerProfile,
			checkNickname: (rule: InternalRuleItem, value: Value, callback: (arg0?: Error) => void) => {
				if (value === '') {
					callback(new Error('닉네임을 입력해주세요'));
				}
				else if (value === this.$stock.state.nickname) {
					callback(new Error(' 변경 전과 후의 닉네임은 동일합니다.'));
				}
				callback()
			}
		}
	},

	props: {
		gameInfo: { type: Object as PropType<WebSocketGame>, default: null },
		subAsideWidth: { type: String, default: '' },
		verticalBackground: { type: String, default: '' },
		fontSize: { type: String, default: '' },
		dialogWidth: { type: String, default: '' },
		playerInfoDialogWidth: { type: String, default: '' },
		playerLocRoom: { type: Object as PropType<WebSocketGameRoom>, default: null },
		ws: { type: WebSocket, default: null },
		isHorizontal: { type: Boolean, default: false },
		buttonSize: { type: String, default: '' },
		avatarSize: { type: Number, default: 20 },
	},

  computed: {
    getGamePlayer: function (): WebSocketPlayerInGame | null {
		if (this.gameInfo === null) return null
		for (let i = 0 as GamePlayerSeatIndex; i < Object.keys(this.gameInfo.gamePlayer).length; i++) {
			if (this.gameInfo.gamePlayer[i].id === this.$stock.state.id) {
			return this.gameInfo.gamePlayer[i]
			}
		}
		return null
    },
  },

	methods: {
		getAvatarUrl: function (avatarId: number) {
			return require("@/assets/images/avatar/avatar_" + avatarId + "-min.png")
		},

		submitNewAvatar: function () {
			if (this.playerLocRoom && this.playerLocRoom.status === 1) {
				this.$message.warning('게임중엔 아바타 변경 불가')
				this.avatarDialogVisible = false
				return
			}
			if (this.duplicateSubmitAvatarFlag) return;
			this.duplicateSubmitAvatarFlag = true
			if (this.temAvatarId === this.$stock.state.avatar_id) {
				this.$message.error('기존과 동일합니다. 다시 선택해 주세요.')
				this.duplicateSubmitAvatarFlag = false
			}
			else {
				modifyAvatar({ avatar_id: this.temAvatarId })
				.then((res) => {
					if (res.code === 200) {
						this.$stock.dispatch('mutateAvatarId', this.temAvatarId)
							.then(() => {
								this.ws?.send(JSON.stringify({ type: 'playerList', nickname: this.$stock.state.nickname, avatar_id: this.$stock.state.avatar_id, player_loc: this.$stock.state.player_loc, player_status: this.$stock.state.player_status }))
							})
						this.$message.success('아바타 변경성공')
					}
					else {
						this.$message.error('변경하지 못했습니다. 나중에 다시 시도해 주세요')
					}
				})
				.catch(() => {
					this.$message.error('변경하지 못했습니다. 나중에 다시 시도해 주세요')
				})
				.finally(() => {
					this.avatarDialogVisible = false
					this.duplicateSubmitAvatarFlag = false
				})
			}
		},

		cancelNicknameEdit: function () {
			this.nicknameDialogVisible = false
			const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
			nicknameFormRef.clearValidate()
		},

		submitNewNickname: function () {
			if (this.playerLocRoom && this.playerLocRoom.status === 1) {
				this.$message.warning('게임중엔 닉네임 변경 불가')
				this.nicknameDialogVisible = false
				return
			}
			if (this.duplicateSubmitNicknameFlag) return
			this.duplicateSubmitNicknameFlag = true
			const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
			nicknameFormRef.validate(valid => {
				if (valid) {
				modifyNickname({ nickname: this.nicknameForm.name })
					.then((res) => {
					if (res.code === 200) {
						this.$stock.dispatch('mutateNickname', this.nicknameForm.name).then(() => {
						this.ws?.send(JSON.stringify({ type: 'playerList', nickname: this.$stock.state.nickname, avatar_id: this.$stock.state.avatar_id, player_loc: this.$stock.state.player_loc, player_status: this.$stock.state.player_status }))
						this.nicknameForm.name = this.$stock.state.nickname
						})
						this.$message.success('닉네임변경성공')
					}
					else {
						this.$message.error('변경하지 못했습니다. 나중에 다시 시도해 주세요')
					}
					})
					.catch(() => {
						this.$message.error('변경하지 못했습니다. 나중에 다시 시도해 주세요')
					})
					.finally(() => {
						this.nicknameDialogVisible = false
						this.duplicateSubmitNicknameFlag = false
					})
				}
				else {
					this.duplicateSubmitNicknameFlag = false
				}
			})
		},

		openViewModule: function () {
			this.viewModuleDialogVisible = true
			this.getPlayerRecord(this.$stock.state.id, this.$stock.state.avatar_id, this.$stock.state.nickname)
		},

		openHelpModule: function () {
			this.helpModuleDialogVisible = true
		},

		getPlayerRecord: function (id: number, avatar_id: number, nickname: string) {
			if (this.duplicateGetInfoFlag) return;
			this.duplicateGetInfoFlag = true
			this.playerProfile.id = id
			this.playerProfile.avatar_id = avatar_id
			this.playerProfile.nickname = nickname
			getPlayerRecord({ id: id })
				.then((res) => {
					this.playerProfile.record = res.record
				})
				.catch()
				.finally(() => {
					this.duplicateGetInfoFlag = false
				})
		},

		openEditAvatarDialog: function () {
			if (this.playerLocRoom !== null && this.playerLocRoom.status === 1) {
				this.$message.error('게임중엔 아바타 변경 불가')
				return
			}
			this.avatarDialogVisible = true
			this.temAvatarId = this.$stock.state.avatar_id
		},

		openEditNicknameDialog: function () {
			if (this.playerLocRoom !== null && this.playerLocRoom.status === 1) {
				this.$message.error('게임중엔 닉네임 변경 불가')
				return
			}
			this.nicknameDialogVisible = true
			this.nicknameForm.name = this.$stock.state.nickname
			this.$nextTick(() => {
				const nicknameFormRef = this.$refs.nicknameForm as Element & ExecuteValidate
				nicknameFormRef.clearValidate()
			})
		}
	},

	components: {
		PlayerInfoTabModule,
		AnimatedAvatar,
		HelpModule,
	}
})
</script>

<style>
.player-icon-box {
	width: 70%;
	height: 35%;
	margin-top: 4%;
	margin-left: 15%;
	border-radius: 5%;
	border-width: 5px;
	border-color: #e3e197;
	background-size: 100% 100%;
	background-image: url('~@/assets/images/icon_background-min.png');
}

.player-icon-box:hover {
	cursor: pointer;
}

.player-nickname-box {
	cursor: pointer;
	width: 85%;
	height: 15%;
	margin-top: 3%;
	margin-left: 7%;
	border-radius: 5px;
	border-style: solid;
	border-color: #e3e197;
	background-color: #ffffdd;
	text-align: center;
	padding-top: 5%;
	font-weight: 600;
	background-image: url('~@/assets/images/icon-background-min.png');
background-size: cover;
}

.player-setting-box {
	width: 85%;
	height: 20%;
	margin-top: 5%;
	margin-left: 7%;
}

.setting-button {
	height: 100%;
	float: left;
	width: 45%;
	padding: 0px;
}

.help-button {
	height: 100%;
	float: right;
	width: 45%;
	padding: 0px;
}


.aside-icon {
	width: 70%;
	height: 80%;
	margin-left: 15%;
	margin-top: 5%;
}

.icon-select-box {
	background-image: url('~@/assets/images/icon-select-background.png');
	background-size: 100% 100%;
}

.icon-is-selected {
	background-image: url('~@/assets/images/icon-select-circle.png');
	background-size: 100% 100%;
}

.icon-block {
	margin: 2%;
	padding: 2% 0;
	width: 15%;
	display: inline-block;
}

.icon-block {
	cursor: pointer;
}
</style>