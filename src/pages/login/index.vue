<template>
	<div class="login">
		<div class="login-form">
			<h1 style="color: #333; margin-bottom: 40px">登录</h1>
			<!-- <Form :label-width="80" @keyup.native.enter="handleSubmit"> -->
			<Form :label-width="80">
				<FormItem label="账号：">
					<!-- <template> -->
					<a-input placeholder="用户名" />
					<!-- <br />
					<br />
					<a-input-password placeholder="input password" />-->
					<!-- </template> -->
					<!-- <div class="components-input-demo-presuffix">
						<a-input ref="userNameInput" v-model="userName" placeholder="Username">
							<a-icon slot="prefix" type="user" />
							<a-tooltip slot="suffix" title="Extra information">
								<a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
							</a-tooltip>
						</a-input>
						<br />
						<br />
						<a-input-password placeholder="input password" />
					</div>-->
					<!-- <Input v-model="submit.username" type="text" placeholder="Username" /> -->
				</FormItem>
				<br />
				<br />
				<FormItem label="密码：">
					<!-- <template> -->
					<a-input-password placeholder="密码" />
					<!-- </template> -->
					<!-- <Input v-model="submit.password" type="password" /> -->
				</FormItem>
				<br />
				<br />
				<FormItem label="验证码：">
					<div class="flex">
						<a-input placeholder="验证码" style="width: 40%" />
						<!-- <Input v-model="code" type="text" style="width: 40%; margin-right: 30px" /> -->
						<canvas id="myCanvas"></canvas>
						<a-button @click="createCode">换一个</a-button>
						<!-- <Button type="text" style="margin-left: 10px" @click="createCode">换一个</Button> -->
					</div>
				</FormItem>
				<br />
				<br />
				<FormItem>
					<div>
						<a-button type="primary" style="margin-left: 8px" @click="handleSubmit">登陆</a-button>
						<a-button @click="handleReset">重置</a-button>
						<router-link to="/register" style="margin-left: 30px">去注册</router-link>
						<!-- <a-button type="link" to="/register">去注册</a-button> -->
					</div>
					<!-- <Button type="primary" @click="handleSubmit">登陆</Button>
					<Button style="margin-left: 8px" @click="handleReset">重置</Button> -->
				</FormItem>
			</Form>
		</div>
	</div>
</template>

<script>
// import mixins from './mixins';

export default {
	// mixins: [mixins],
	data() {
		return {
			userName: '',
			submit: {
				username: '',
				password: '',
			},
			createC: '',
			code: '',
		};
	},
	mounted() {
		this.createCode();
	},
	methods: {
		async handleSubmit() {
			if (this.code !== this.createC) {
				this.$Message.error('验证码输入错误');
				return;
			}
			this.$Spin.show();
			let res; // = await this.$ajax.post("/login", this.submit);
			this.$Spin.hide();
			if (res.data.token) {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('home_id', res.data.home_id);
				// this.$router.push({ path: "/admin" });
				this.$Message.success('登录成功,即将跳转到主页');
				setTimeout(() => this.$router.push({ path: `/home/${res.data.home_id}` }), 3000);
			}
		},
		createCode() {
			const c = document.getElementById('myCanvas');
			const ctx = c.getContext('2d');
			c.width = '120';
			c.height = '40';
			ctx.fillStyle = '#6adbcf';
			ctx.fillRect(0, 0, 120, 40);
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.shadowBlur = 2;
			ctx.shadowColor = '#666666';
			ctx.font = '30px sans-serif';
			const codes = 'qwertyuioplkjhgfdsazxcvbnm1234567890';
			const bgColor = ['#f5f5f5', '#666', '#bcbcbc', 'yellow'];
			for (let i = 0; i < 4; i += 1) {
				const r = Math.floor(Math.random() * codes.length);
				const x = 10 + i * 20;
				const y = 20 + Math.random() * 10;
				this.createC += codes[r];
				const b = Math.floor(Math.random() * bgColor.length);
				ctx.fillStyle = bgColor[b];
				ctx.fillText(codes[r], x, y);
			}
		},
		handleReset() {
			this.submit = {};
		},
		emitEmpty() {
			this.$refs.userNameInput.focus();
			this.userName = '';
		},
	},
};
</script>

<style>
.login {
	/* background: url("../assets/login.jpg") center center; */
	background: #f8f8f9;
	width: 100vw;
	height: 100vh;
	background-size: cover;
	display: flex;
	justify-content: center;
}
.login-form {
	text-align: center;
	padding: 20px;
	border-radius: 10px;
	color: #fff !important;
	margin-top: 4rem;
}
.flex {
	display: flex;
	align-items: center;
}
</style>
