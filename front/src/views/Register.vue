<template>
  <div id="login_root">
    <MusicButton></MusicButton>
    <el-row type="flex" justify="center">
      	<el-image :src="require('@/assets/images/head_icon.png')" :fit="fit"></el-image>
    </el-row>

    <el-row type="flex" justify="center">
		<el-card shadow="always">
			<h1 style="text-align: center;">등록</h1>
			<el-divider></el-divider>
			<el-form :model="validateForm" status-icon :rules="rules" ref="validateForm" label-width="100px">
			<el-form-item label="사용자 이름" prop="username">
				<el-input placeholder="사용자 이름을 입력하세요" id="username" type="text" v-model="validateForm.username" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="비밀번호" prop="password">
				<el-input placeholder="비밀번호를 입력 해주세요" id="password" type="password" v-model="validateForm.password" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="비밀번호 확인" prop="checkPassword">
				<el-input type="password" v-model="validateForm.checkPassword" autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item label="초대 코드" prop="invitationCode" :rules="[{ required: true, message: '초대 코드는 비워둘 수 없습니다.' },]">
				<el-input placeholder="초대코드를 입력해주세요" type="text" v-model="validateForm.invitationCode"
				autocomplete="off"></el-input>
			</el-form-item>

			<el-form-item v-if="!isDevelopEnv" class="shortMargin" label=" 확인 코드" prop="vertificationCode"
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

			<el-button type="primary" @click.stop.prevent="submitForm" class="two-button-margin">등록하다</el-button>
			<el-button @click="cancelDialogVisible = true">취소</el-button>
			</el-form>
		</el-card>
    </el-row>

    <el-row type="flex" justify="center">
        <el-image :src="require('@/assets/images/master_and_disciples.gif')" :fit="fit"></el-image>
    </el-row>

    <el-dialog title="힌트" :visible.sync="cancelDialogVisible" :width="dialogWidth" center>
     	<i class="el-icon-question"></i>
     	<span style="text-align:center"> 정말로 이 등록을 포기하시겠습니까?</span>
     	<span slot="footer">
     	  <el-button @click="cancelDialogVisible = false" style="margin-right:10%">취소</el-button>
     	  <el-button type="danger" @click="cancelRegister()">확인</el-button>
     	</span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { ElLoadingComponent } from 'element-ui/types/loading'
import { InternalRuleItem, Value, ExecuteValidate } from '@/type/validator'
import VerificationCodeModule from '@/components/topPage/VerificationCode.vue'
import MusicButton from '@/components/topPage/MusicButton.vue'
import { verificationLogic } from '@/mixins/topPage/verificationLogic'
import { register } from '@/api/register'

export default verificationLogic.extend({
	name: 'Register',
	data() {
		return {
		fit: 'fill',
		cancelDialogVisible: false,
		duplicateRegisterFlag: false,
		loading: null as ElLoadingComponent | null,
		validateForm: {
			username: '',
			password: '',
			checkPassword: '',
			invitationCode: '',
			vertificationCode: ''
		},
		}
	},

	methods: {
		submitForm: function () {
			if (this.duplicateRegisterFlag) return;
			this.duplicateRegisterFlag = true
			const validateFormRef = this.$refs.validateForm as Element & ExecuteValidate
			validateFormRef.validate(valid => {
				if (valid) {
					this.loading = this.$loading({
						lock: true,
						text: '등록중',
						spinner: 'el-icon-loading',
						background: 'rgba(255, 255, 255, 0.7)'
					})
					register({ username: this.validateForm.username, password: this.validateForm.password, invitationCode: this.validateForm.invitationCode })
						.then(() => {
							this.$message({ message: '등록이 완료되었습니다. 로그인하세요.', type: 'success' });
							this.$router.push({ name: 'Login' })
						})
						.catch()
						.finally(() => {
							this.duplicateRegisterFlag = false
							this.loading?.close()
						})
				}
				else {
				this.$message.error('등록정보를 정확하게 입력해주세요.');
				this.duplicateRegisterFlag = false
				}
			})
			this.refreshCode()
		},

		cancelRegister: function () {
			this.$message({
				message: ' 이미 등록되었습니다. 로그인 페이지로 돌아가세요.',
				type: 'info'
			});
			this.$router.push({ name: 'Login' })
			this.cancelDialogVisible = false
		},

		checkName: function (rule: InternalRuleItem, value: Value, callback: (arg0?: Error) => void) {
			if (value === '') {
				callback(new Error('사용자 이름을 입력하세요'));
			}
			else {
				const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
				if (!uPattern.test(value)) {
					callback(new Error('4~16자의 문자, 숫자, 밑줄, 빼기 기호를 사용하세요.'));
				}
				else {
					callback();
				}
				callback();
			}
		},

		validatePass: function (rule: InternalRuleItem, value: Value, callback: (arg0?: Error) => void) {
			if (value === '') {
				callback(new Error('비밀번호를 입력 해주세요'));
			} else {
				if (this.validateForm.checkPassword !== '') {
					const validateFormRef = this.$refs.validateForm as Element & ExecuteValidate
					validateFormRef.validateField('checkPassword');
				}
				callback();
			}
		},

		validatePass2: function (rule: InternalRuleItem, value: Value, callback: (arg0?: Error) => void) {
		if (value === '') {
			callback(new Error('비밀번호를 다시 입력해주세요'));
		} else if (value !== this.validateForm.password) {
			callback(new Error('두번째 비밀번호가 일치하지 않습니다.!'));
		} else {
			callback();
		}
		},

		rules: function () {
			return {
				username: [{ required: true, validator: this.checkName, trigger: 'blur' }],
				password: [{ required: true, validator: this.validatePass, trigger: 'blur' }, { min: 6, max: 15, message: '6~15자 길이', trigger: 'blur' }],
				checkPassword: [{ required: true, validator: this.validatePass2, trigger: 'blur' }],
			}
		},

	},

	computed: {
		dialogWidth: function () {
			const screen_width = document.body.clientWidth
			if (screen_width < 800) {
				return '60%'
			}
			else if (screen_width < 1024) {
				return '40%'
			}
			else if (screen_width < 1280) {
				return '30%'
			}
			else {
				return '20%'
			}
		},

		isDevelopEnv: function () {
			return process.env.NODE_ENV === 'development'
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
  overflow-x: hidden;
}

.el-form-item {
  width: 280px;
}

.two-button-margin {
  margin-left: 20%;
  margin-right: 10%;
}

.shortMargin {
  margin-bottom: 9px;
}

.shortHeight {
  line-height: 0px
}
</style>