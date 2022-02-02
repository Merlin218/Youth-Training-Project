<template>
	<div class="login-vue" :style="bg">
		<div class="container">
			<p class="title">登录系统</p>
			<div class="input-c">
				<Input
					prefix="ios-contact"
					v-model="username"
					placeholder="用户名"
					clearable
					@on-blur="verifyUsername"
				/>
				<p class="error">{{ usernameError }}</p>
			</div>
			<div class="input-c">
				<Input
					type="password"
					v-model="password"
					prefix="md-lock"
					placeholder="密码"
					clearable
					@on-blur="verifyPassword"
				/>
				<p class="error">{{ passwordError }}</p>
			</div>
			<Button
				:loading="isShowLoading"
				class="submit"
				type="primary"
				@click="loginByUserNameAndPassWord"
			>登录</Button>
			<!--<p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>-->
		</div>
	</div>
</template>

<script>
import { LoginByUserNameAndPassWord } from "../../../api/login";

export default {
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			usernameError: '',
			passwordError: '',
			isShowLoading: false,
			bg: {
				backgroundImage: 'url(' + require('../../../assets/bg04.jpg'),
				backgroundPosition: 'center center',
				backgroundRepeat: "no-repeat",
				backgroundSize: "cover",
			}
		}
	},
	mounted() {
		document.onkeydown = e => {
			if (e.keyCode == 13) {
				this.loginByUserNameAndPassWord()
			}
		}
	},
	methods: {
		verifyUsername(e) {
			if (this.username === '') {
				this.usernameError = '用户名不能为空！'
			} else {
				this.usernameError = ''
			}
		},
		verifyPassword(e) {
			if (this.password === '') {
				this.passwordError = '密码不能为空！'
			} else {
				this.passwordError = ''
			}
		},
		faceLogin() {
			this.$router.replace({ name: 'FaceLogin' });
		},
		loginByUserNameAndPassWord() {
			if (this.username !== '' && this.password !== '') {
				this.isShowLoading = true;
				return new Promise(((resolve, reject) => {
					LoginByUserNameAndPassWord(this.username, this.password).then(response => {
						if (response.status === 201) {
							document.onkeydown = undefined;
							this.$Message.success("登录成功，即将跳转到主页!");
							// 登录成功，设置用户信息
							this.$store.commit('setUser', {
								userId: response.data.userId,
								userName: response.data.userName,
								userGender: response.data.userGender,
								userEmail: response.data.userEmail,
								userRoleName: response.data.userRoleName
							});
							this.isShowLoading = false;
							this.$router.replace('index')
						} else {
							this.$Message.error(response.data.error);
							this.isShowLoading = false;
						}
					}).catch(error => {
						this.$Message.error(error.response.data.error);
						this.isShowLoading = false;
						reject(error);
					})
				}));
			} else {
				this.$Message.warning("请输入用户名和密码");
			}
		},
	}
}
</script>

<style>
.login-vue {
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}

.login-vue .container {
	background: rgba(255, 255, 255, 0.5);
	width: 360px;
	text-align: center;
	border-radius: 10px;
	padding: 50px;
}

.login-vue .ivu-input {
	background-color: transparent;
	color: #fff;
	outline: #fff;
	border-color: #fff;
}

.login-vue ::-webkit-input-placeholder {
	/* WebKit, Blink, Edge */
	color: rgba(255, 255, 255, 0.8);
}

.login-vue :-moz-placeholder {
	/* Mozilla Firefox 4 to 18 */
	color: rgba(255, 255, 255, 0.8);
}

.login-vue ::-moz-placeholder {
	/* Mozilla Firefox 19+ */
	color: rgba(255, 255, 255, 0.8);
}

.login-vue :-ms-input-placeholder {
	/* Internet Explorer 10-11 */
	color: rgba(255, 255, 255, 0.8);
}

.login-vue .title {
	font-size: 16px;
	margin-bottom: 20px;
}

.login-vue .input-c {
	margin: auto;
	width: 200px;
}

.login-vue .error {
	color: red;
	text-align: left;
	margin: 5px auto;
	font-size: 12px;
	padding-left: 30px;
	height: 20px;
}

.login-vue .submit {
	width: 200px;
}

.login-vue .account {
	margin-top: 30px;
}

.login-vue .account span {
	cursor: pointer;
}

.login-vue .ivu-icon {
	color: #eee;
}

.login-vue .ivu-icon-ios-close-circle {
	color: #777;
}
</style>

