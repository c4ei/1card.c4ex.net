<template>
	<div id="login_root">
		<MusicButton></MusicButton>
		<el-row type="flex" justify="center">
		<el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
		</el-row>

		<el-row type="flex" justify="center">
		<el-card shadow="always">
			<h1 style="text-align: center;">로그인</h1>
			<el-divider></el-divider>
			<el-form :model="validateForm" label-width="100px" ref="validateForm" @keypress.native="enterLogin($event)">
			<el-form-item label="사용자 이름" prop="username" :rules="[{ required: true, validator: checkName, trigger: 'blur' },]">
				<el-input placeholder="사용자 이름을 입력하세요" type="text" v-model="validateForm.username" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="비밀번호" prop="password"
				:rules="[{ required: true, message: '비밀번호不能为空', trigger: 'blur' }, { min: 6, max: 15, message: '6~15자 길이', trigger: 'blur' }]">
				<el-input placeholder="비밀번호를 입력 해주세요" v-model="validateForm.password" show-password></el-input>
			</el-form-item>

			<el-form-item v-if="!isDevelopEnv" class="shortMargin" label="확인 코드" prop="vertificationCode"
				:rules="[{ required: true, trigger: 'blur', validator: vertificationCode }]">
				<el-input v-model="validateForm.vertificationCode" type="text" placeholder="인증번호를 입력해주세요"
				autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item v-if="!isDevelopEnv" class="shortMargin">
				<el-collapse-transition>
				<div v-show="vertificationCodeCorrect">
					<el-alert title="확인 성공" type="success" center show-icon :closable="false"></el-alert>
				</div>
				</el-collapse-transition>
			</el-form-item>

			<el-form-item v-if="!isDevelopEnv" class="shortMargin">
				<div class="shortHeight">
				<VerificationCodeModule :identifyCode="identifyCode"></VerificationCodeModule>
				<el-button @click="refreshCode" type='text'>잘 안보이면 바꿔주세요.</el-button>
				</div>
			</el-form-item>

			<el-button type="primary" @click="submitForm" class="two-button-margin">로그인</el-button>
			<el-button @click="goToRgister()">등록</el-button>
			</el-form>
		</el-card>
		</el-row>

		<el-row type="flex" justify="center">
		<el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
		</el-row>

		<el-row type="flex" justify="center">
		<el-link type="info" @click="left_drawer = true">이 사이트 정보</el-link>
		<el-link type="info" @click="right_drawer = true">사용자 지침</el-link>
		</el-row>

		<el-row type="flex" justify="center">
		<el-image class="media-icon" :src="require('@/assets/images/wechat-icon-min.png')" :fit="fit"
			v-on:click="openDialog('wechat')"></el-image>
		<el-image class="media-icon" :src="require('@/assets/images/line-icon-min.png')" :fit="fit"
			v-on:click="openDialog('line')"></el-image>
		<el-image class="media-icon" :src="require('@/assets/images/mail-icon-min.png')" :fit="fit"
			v-on:click="mailDialogVisible = true"></el-image>
		<el-image class="media-icon" :src="require('@/assets/images/github-icon-min.png')" :fit="fit"
			v-on:click="directToGit"></el-image>
		</el-row>

		<el-row type="flex" justify="center">
		<el-dialog title="연락하기" :visible.sync="qrDialogVisible" center width="50%">
			<span> 아래 QR코드를 스캔하세요</span>
			<el-divider></el-divider>
			<el-image class="qr-code-icon" :src="qrCodeUrl" :fit="fit"></el-image>
		</el-dialog>
		</el-row>

		<el-row type="flex" justify="center">
		<el-dialog title="연락하기" :visible.sync="mailDialogVisible" center width="50%">
			<span>email</span><i class="el-icon-s-promotion"></i>
			<el-link type="info" href="mailto:c4ei.net@gmail.com?subject = Hello">c4ei.net@gmail.com</el-link>
			<el-divider></el-divider>
			<el-image :src="require('@/assets/images/mail-background.png')" :fit="fit"></el-image>
		</el-dialog>
		</el-row>

		<el-drawer title="사용자 지침" :visible.sync="left_drawer" direction="ltr" size="300px" :with-header="false">
		<div style="height: 100%" class="drawer_background">
			<el-button style="float: right" icon="el-icon-back" size="small" type="info" effect="dark"
			@click="left_drawer = false"></el-button>
			<div class="drawer_background">
			<div style="margin-left: 3px;">
				<br>
				<br>
				<h2 style="text-align: center">이 사이트 정보</h2>
				<br>
				<span> 아래는 본 웹사이트에 대한 정보입니다. </span>
				<h4>웹사이트 구축의 원래 의도</h4>
				<p>서유기는 작가가 친구들과 자주 플레이하는 오프라인 보드&카드 게임이지만, 전염병의 영향으로 대면 오프라인 소통이 어려워졌습니다. </p>
				<p>온라인 체스와 카드 게임 플랫폼을 살펴본 결과, 저자는 현재 이 게임을 온라인으로 제공하는 플랫폼이 없다는 사실을 발견했습니다. </p>
				<p>향후 온라인에 진출할 것으로 예상되더라도 아마도 클라이언트를 다운로드하고 소품을 구입하기 위해 돈을 지출하는 등의 불편함이 잇따를 것입니다. </p>
				<p>그래서 이 웹사이트를 구축한 원래 의도는 전염병으로 인해 멀리 떨어져 있는 친구들이 함께 소통하고 즐길 수 있는 가볍고 수업 없는 게임 플랫폼을 가질 수 있도록 이러한 웹사이트를 구축하는 것입니다. 프로그래밍 기술을 연마할 수 있습니다. </p>
				<h4>웹사이트 포지셔닝</h4>
				<p>이 웹사이트는 승인된 사용자만이 여가 및 엔터테인먼트를 이용할 수 있는 비영리 비공개 웹사이트입니다. </p>
				<h4>정적 리소스</h4>
				<p>본 웹사이트에 사용된 사진과 음향 효과 리소스는 모두 인터넷상의 공개 리소스 또는 승인된 리소스에서 가져온 것이며 저자가 직접 제작한 것입니다. 침해 사항을 발견한 경우, 작성자에게 적시에 연락해 주십시오. 해당 리소스는 확인 후 서가에서 제거됩니다. </p>

				<h4>웹사이트 소스 코드</h4>
				<p>이 웹사이트에 사용된 소스 코드는 이 웹사이트의 작성자가 작성했으며 다른 사람들이 배우고 참조할 수 있도록 Github에 오픈 소스로 제공됩니다. </p>
				<h4>사용자 정보</h4>
				<p>본 웹사이트는 사용자의 개인정보를 존중하며 사용자의 개인정보를 공개, 유용 또는 판매하지 않습니다. </p>
				<h4>저자 소개</h4>
				<p>이 사이트의 작성자는 업계에 중도 입문하여 현재 배우고 있는 프로그래머입니다. 우리는 이 웹사이트를 통한 모든 종류의 기술 교류와 토론은 물론 건설적인 의견과 제안을 환영합니다. </p>
				<h4>특별한 감사</h4>
				<p>프로젝트 전반에 걸쳐 저자에게 지원과 격려를 해주신 Ms. H에게 감사드립니다. </p>
				<p>기술 지원을 해주신 Mr. W에게 감사드립니다. </p>
				<p>웹사이트 리뷰에 참여해주신 모든 친구들에게 감사드립니다. </p>
				<p>모두 감사합니다. </p>
				<br>
				<p>이 사이트의 작성자는 위 내용을 해석할 최종 권한을 갖습니다. </p>
			</div>
			</div>
		</div>
		</el-drawer>

		<el-drawer title="사용자 지침" :visible.sync="right_drawer" direction="rtl" size="300px" :with-header="false">
		<div style="height: 100%" class="drawer_background">
			<el-button icon="el-icon-right" size="small" type="info" effect="dark" @click="right_drawer = false"></el-button>
			<div class="drawer_background">
				<div style="margin-left: 3px;">
					<br>
					<br>
					<h2 style="text-align: center">사용자 지침</h2>
					<br>
					<span> 이용자는 본 웹사이트를 이용하시기 전에 다음 사항을 숙지하시기 바랍니다. </span>
					<h4>금지행위</h4>
					<p>본 웹사이트에서 제공하는 콘텐츠는 여가 및 오락의 목적으로만 제공됩니다. 본 웹사이트는 도박 등 불법적인 목적으로 사용될 수 없습니다. 불법적인 목적으로 인해 발생하는 손실이나 법적 책임에 대해 본 웹사이트는 책임을 지지 않습니다. </p>
					<h4>콘텐츠 게시</h4>
					<p>사용자는 자신이 위치한 국가의 관련 법률을 준수해야 하며 본 웹사이트에 불법, 괴롭힘, 비방, 욕설, 위협, 유해, 저속, 외설 또는 기타 유해한 발언이나 콘텐츠를 게시해서는 안 됩니다. </p>
					<p>자신이 게시한 콘텐츠에 대한 모든 법적 책임은 전적으로 사용자에게 있으며, 해당 콘텐츠로 인해 발생하는 어떠한 부작용이나 법적 책임에 대해서도 본 사이트는 책임을 지지 않습니다. </p>
					<h4>엄숙한 선언</h4>
					<p>본 웹사이트는 사전 통지 없이 웹사이트 정보를 수정하거나 웹사이트 이용을 중단할 수 있습니다. 본 사이트는 이용자에게 발생한 어떠한 손실에 대해서도 책임을 지지 않습니다. </p>
					<p>이 웹사이트는 사용자의 이 웹사이트 사용으로 인해 발생하는 직간접적인 악영향이나 손실에 대해 책임을 지지 않습니다. </p>
					<h4>링크 정보</h4>
					<p>이 웹사이트는 제3자 웹사이트로 링크될 수 있지만, 이 웹사이트는 해당 콘텐츠의 보안과 신뢰성에 대해 어떠한 책임도 지지 않습니다. </p>
					<br>
					<p>이 사이트의 작성자는 위 내용을 해석할 최종 권한을 갖습니다. </p>
				</div>
			</div>
		</div>
		</el-drawer>

	</div>
</template>

<script lang="ts">
import { ElLoadingComponent } from 'element-ui/types/loading'
import { ExecuteValidator, ExecuteValidate } from '@/type/validator'
import VerificationCodeModule from '@/components/topPage/VerificationCode.vue'
import MusicButton from '@/components/topPage/MusicButton.vue'
import { verificationLogic } from '@/mixins/topPage/verificationLogic'
import { login } from '@/api/login'

const checkName: ExecuteValidator = (rule, value, callback) => {
	if (value === '') {
		callback(new Error('사용자 이름을 입력하세요'));
	}
	else {
		const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
		if (!uPattern.test(value)) {
			callback(new Error('사용자 이름은 4~16자, 숫자, 밑줄, 빼기 기호로 구성되어야 합니다.'));
		}
		else {
			callback();
		}
		callback();
	}
}
export default verificationLogic.extend({
	name: 'Login',
	data() {
		return {
			fit: 'fill',
			validateForm: {
				username: '',
				password: '',
				vertificationCode: ''
			},
			qrDialogVisible: false,
			mailDialogVisible: false,
			duplicateLoginFlag: false,
			left_drawer: false,
			right_drawer: false,
			qrCodeUrl: '',
			checkName: checkName,
			loading: null as ElLoadingComponent | null,
		}
	},

	computed: {
		isDevelopEnv: function () {
			return process.env.NODE_ENV === 'development'
		},
	},

	beforeRouteEnter(to, from, next) {
		next(vm => {
			if (!from || from.name === null) {
				if ((vm?.$stock || vm.$store).state.setting.playBgm) {
					vm.$notify({ title: '배경음악이 재생됩니다', type: 'warning', dangerouslyUseHTMLString: true, message: '오른쪽 상단을 클릭하시면 됩니다<i class="el-icon-video-pause"></i>배경음악을 끄기', offset: 50, duration: 8000, })
				}
			}
		})
	},

	methods: {
		submitForm: function () {
			if (this.duplicateLoginFlag) return;
			this.duplicateLoginFlag = true
			const validateFormRef = this.$refs.validateForm as Element & ExecuteValidate
			validateFormRef.validate((valid: boolean) => {
				if (valid) {
				this.loading = this.$loading({
					lock: true,
					text: '로그인',
					spinner: 'el-icon-loading',
					background: 'rgba(255, 255, 255, 0.7)'
				})
				login({ username: this.validateForm.username, password: this.validateForm.password })
					.then((res) => {
						if (res.account) {
							this.$router.push({ name: 'ChatRoom' })
							this.$stock.dispatch('initialization', res.account)
						}
						else {
							this.loading?.close()
						}
					})
					.catch(() => {
						this.loading?.close()
					})
					.finally(() => {
						this.duplicateLoginFlag = false
					})
				}
				else {
					this.$message.error('로그인 정보를 정확하게 입력해주세요');
					this.duplicateLoginFlag = false
				}
			})
			this.refreshCode()
		},

		goToRgister: function () {
			this.$router.push({ name: 'Register' })
		},

		directToGit: function () {
			window.open('https://github.com/c4ei.net/journey-to-the-west')
		},

		openDialog: function (which: 'wechat' | 'line') {
			this.qrDialogVisible = true
			if (which === 'wechat') {
				this.qrCodeUrl = require('@/assets/images/wechat-qr-code-min.png')
			}
			else if (which === 'line') {
				this.qrCodeUrl = require('@/assets/images/line-qr-code-min.png')
			}
		},

		enterLogin: function (e: KeyboardEvent) {
			if (e.key === 'Enter') this.submitForm()
		},
	},

	components: {
		VerificationCodeModule,
		MusicButton,
	},

	mixins: [verificationLogic]
})
</script>

<style scoped>
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100vh;
}

.el-main {
  color: #333;
  text-align: center;
  line-height: 160px;
}

.el-card {
  border-radius: 30px;
  width: 350px;
}

.grid-content {
  border-radius: 4px;
  min-height: 80px;
}

.el-row {
  margin-bottom: 20px;
}

.el-form-item {
  width: 280px;
}

.el-link {
  margin-right: 2%;
}

.two-button-margin {
  margin-left: 20%;
  margin-right: 10%;
}

.media-icon {
  min-width: 30px;
  min-height: 30px;
  width: 3%;
  height: 3%;
  margin: 1%;
}

.media-icon:hover {
  cursor: pointer;
}

.qr-code-icon {
  min-width: 60px;
  min-height: 60px;
  width: 40%;
  height: 40%;
  margin-left: 30%;
}

.shortMargin {
  margin-bottom: 9px;
}

.shortHeight {
  line-height: 0px
}

.drawer_background {
  background-image: url('~@/assets/images/icon-select-background.png');
  background-size: 100% 100%;
}
</style>


<style>
.el-drawer__body {
  overflow: auto;
}
</style>