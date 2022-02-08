<template>
	<div class="login">
		<div class="login-form">
			<h1 style="color: #333; margin-bottom: 40px">登录</h1>
			<a-form>
				<a-form-item label="账号：">
					<a-input v-model="submit.user_name" placeholder="用户名">
						<template #prefix>
							<UserOutlined />
						</template>
						<template #suffix>
							<a-tooltip title="Extra information">
								<InfoCircleOutlined style="color: rgba(0, 0, 0, 0.45)" />
							</a-tooltip>
						</template>
					</a-input>
				</a-form-item>
				<a-form-item label="密码：">
					<a-input-password :value="submit.password" placeholder="密码" />
				</a-form-item>
				<a-form-item label="验证码：">
					<div class="flex">
						<a-input placeholder="验证码" style="width: 40%" @change="codeInput" />
						<img :src="imgUrl" />
						<a-button type="link" @click="refreshNum">换一个</a-button>
					</div>
				</a-form-item>
				<a-form-item>
					<div>
						<a-button type="primary" style="margin-left: 8px" @click="handleSubmit">登陆</a-button>
						<a-button @click="handleReset">重置</a-button>
						<router-link to="/register" style="margin-left: 30px">去注册</router-link>
					</div>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
import { loginApi } from '@/api';
import { useMainStore } from '@/store/user';

export default {
	// mixins: [mixins],
	components: { UserOutlined, InfoCircleOutlined },
	data() {
		return {
			submit: {
				user_name: '',
				password: '',
			},
			code: '',
			randomNum: 0.0,
		};
	},
	computed: {
		imgUrl() {
			return `https://datavis.all1024.com/login/getcaptcha?v=${this.randomNum}`;
		},
	},
	mounted() {
		// this.createCode();
	},
	methods: {
		refreshNum() {
			let newNum = 0;
			while (newNum === 0 || newNum === this.randomNum) {
				newNum = Math.random() * 10;
			}
			this.randomNum = newNum;
		},
		codeInput(e) {
			document.cookie = `captcha_client=${e.target.value}`;
		},
		async handleSubmit() {
			const store = useMainStore();

			// alexzhli 测试密码：123456
			console.log(this.submit);
			const fakeUser = {
				user_name: 'alexzhli',
				password: '123456',
			};
			const res = await loginApi.login(fakeUser);
			store.changeLoginStatus(true);
			console.log(store);
			if (res.code === 0) {
				this.$Message.success('登录成功,即将跳转到主页');
				setTimeout(() => this.$router.push({ path: `/projects` }), 3000);
			}
		},
		handleReset() {
			this.submit = {};
		},
	},
};
</script>

<style>
.login {
	/* background: url("../assets/login.jpg") center center; */
	width: 100%;
	height: 100%;
	background-size: cover;
	display: flex;
	justify-content: center;
}
.login-form {
	text-align: center;
	padding: 20px;
	border-radius: 10px;
	margin-top: 4rem;
}
.flex {
	width: 340px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
</style>
