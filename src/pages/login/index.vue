<template>
	<div class="login">
		<div>
			<h1 style="color: #333; margin-bottom: 40px; text-align: center">登录</h1>
			<a-form>
				<a-form-item label="账号：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					<a-input ref="username" placeholder="用户名">
						<template #prefix>
							<UserOutlined />
						</template>
					</a-input>
				</a-form-item>
				<a-form-item label="密码：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					<a-input-password ref="password" placeholder="密码" />
				</a-form-item>
				<a-form-item label="验证码：" :label-col="{ span: 4 }" :wrapper-col="{ span: 20 }">
					<div class="flex">
						<a-input placeholder="验证码" style="width: 40%" @change="codeInput" />
						<div id="svgWrapper"></div>
						<a-button type="link" @click="refreshImg">换一个</a-button>
					</div>
				</a-form-item>
				<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
					<div class="flex">
						<span></span>
						<a-button type="primary" style="margin-left: 8px" @click="handleSubmit">登陆</a-button>
						<a-button @click="handleReset">重置</a-button>
						<!-- <router-link to="/register" style="margin-left: 30px">去注册</router-link> -->
					</div>
				</a-form-item>
			</a-form>
		</div>
		<div class="bg__container">
			<div class="bg"></div>
		</div>
	</div>
</template>

<script>
import { message } from 'ant-design-vue';
import { UserOutlined } from '@ant-design/icons-vue';
import { loginApi } from '@/api';
import { useMainStore } from '@/store/user';
import docCookies from '@/utils/cookie';

export default {
	components: { UserOutlined },
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
	mounted() {
		this.refreshImg();
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
			docCookies.setItem('captcha_client', e.target.value, null, '/');
		},
		async refreshImg() {
			this.refreshNum();
			const svgWrapper = document.getElementById('svgWrapper');
			svgWrapper.innerHTML = '';
			const res = await loginApi.getImg({ v: this.randomNum });
			svgWrapper.innerHTML = res;
		},
		async handleSubmit() {
			const store = useMainStore();
			const form = {
				user_name: this.$refs.username.stateValue,
				password: this.$refs.password.input.stateValue,
			};
			let res = null;
			try {
				res = await loginApi.login(form);
			} catch (e) {
				//
			}
			store.updateStatus();
			switch (res?.code) {
				case 0:
					docCookies.setItem('jwt_token', res?.result.jwt_token, null, '/');
					docCookies.setItem('user', res?.result.user_name, null, '/');
					message.success('登录成功,即将跳转到主页');
					setTimeout(() => this.$router.push({ path: `/projects` }), 3000);
					break;
				default:
					this.refreshImg();
					break;
			}
		},
		handleReset() {
			this.submit = {};
		},
	},
};
</script>

<style lang="less" scoped>
.login {
	height: 80vh;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	position: relative;
	.bg__container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.bg {
			width: 500px;
			height: 300px;
			background-size: contain;
			background-repeat: no-repeat;
			background-image: url(https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/team.70peflw2sge8.webp);
		}
	}
}

.flex {
	width: 340px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
#svgWrapper {
	width: 123px;
	height: 43px;
	border: 1px solid rgba(0, 0, 0, 0.2);
}
</style>
