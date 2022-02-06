<template>
	<div class="login">
		<div class="login-form">
			<h1 style="color:#333;margin-bottom:40px;">Myblog Admin Register</h1>
			<!-- <Form
				:label-width="80"
				:rules="ruleInline"
				ref="submit"
				:model="submit"
				@keyup.native.enter="handleSubmit"
			> -->
				<FormItem label="账号：" :label-width="100" prop="username">
					<Input type="text" placeholder="请输入 不能超过十六位" v-model="submit.username">
						<!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
					</Input>
				</FormItem>
				<FormItem label="密码：" :label-width="100" prop="password">
					<Input type="password" v-model="submit.password" password>
						<!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
					</Input>
				</FormItem>
				<FormItem label="确认密码：" :label-width="100" prop="confirmPassword">
					<Input type="password" v-model="submit.confirmPassword" password>
						<!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
					</Input>
				</FormItem>
				<FormItem label="验证码：" :label-width="100">
					<div class="flex">
						<Input type="text" style="width:40%;margin-right:30px" v-model="verCode">
							<!-- <Icon type="ios-megaphone-outline" slot="prepend"></Icon> -->
						</Input>
						<canvas id="myCanvas"></canvas>
						<Button type="text" style="margin-left:10px" @click="createCode">换一个</Button>
					</div>
				</FormItem>
				<FormItem>
					<Button type="primary" @click="handleSubmit">注册</Button>
					<router-link to="/" style="margin-left:30px;">返回首页</router-link>
				</FormItem>
			<!-- </Form> -->
		</div>
	</div>
</template>

<script>
// import mixins from "../mixins/index";
export default {
	mixins: [mixins],
	data() {
		return {
			submit: {
				username: "",
				password: "",
				confirmPassword: "",

			},
			createC: "",
			verCode: '',
			ruleInline: {
				username: [
					{
						required: true,
						trigger: "blur",
						validator: (rule, value, callback) => {
							let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
							if (reg.test(value)) {
								callback(new Error("不能含有中文字符"));
							} else if (value.length > 16) {
								callback(new Error("账号长度不能超过十六位"));
							} else if (/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
								callback();
							} else if (value.length < 6) {
								callback(new Error("账号长度不能小于六位"));
							} else {
								callback(new Error("账号格式不正确"));
							}
						}
					}
				],
				password: [
					{
						required: true,
						trigger: "blur",
						validator: (rule, value, callback) => {
							if (value === "") {
								callback(new Error("请输入密码"));
							} else if (value.length < 6) {
								callback(new Error("密码格式不正确"));
							} else {
								if (this.submit.confirmPassword !== "") {
									// 对第二个密码框单独验证
									this.$refs.submit.validateField("confirmPassword");
								}
								callback();
							}
						}
					}
				],
				confirmPassword: [
					{
						required: true,
						trigger: "blur",
						validator: (rule, value, callback) => {
							if (value === "") {
								callback(new Error("请再次输入密码"));
							} else if (value.length < 6) {
								callback(new Error("密码格式不正确"));
							} else if (value !== this.submit.password) {
								callback(new Error("两次密码不匹配"));
							} else {
								callback();
							}
						}
					}
				],
			}
		};
	},
	mounted() {
		this.createCode();
	},
	methods: {
		handleSubmit() {
			this.$refs["submit"].validate(valid => {
				if (valid) {
					if (this.verCode !== this.createC) {
						this.$Message.warning('验证码输入错误')
						return
					}
					delete this.submit['confirmPassword']
					// this.$ajax.post('/blog/register', this.submit).then(res => {
					// 	if (res.success) {
					// 		this.$Message.success(res.message, '请登录')
					// 		this.$router.push('/login')
					// 		return
					// 	}
					// 	this.$Message.warning(res.message)
					// 	this.createCode()
					// 	this.verCode = '';
					// 	this.submit.username = '';
					// })
				}
			});
		},
		createCode() {
			this.createC = '';
			var c = document.getElementById("myCanvas");
			var ctx = c.getContext("2d");
			c.width = "120";
			c.height = "40";
			ctx.fillStyle = "#6adbcf";
			ctx.fillRect(0, 0, 120, 40);
			ctx.shadowOffsetX = 2;
			ctx.shadowOffsetY = 2;
			ctx.shadowBlur = 2;
			ctx.shadowColor = "#666666";
			ctx.font = "30px sans-serif";
			var codes = "qwertyuioplkjhgfdsazxcvbnm1234567890";
			var bgColor = ["#f5f5f5", "#666", "#bcbcbc", "yellow"];
			for (let i = 0; i < 4; i++) {
				var r = Math.floor(Math.random() * codes.length);
				var x = 10 + i * 20,
					y = 20 + Math.random() * 10;
				this.createC += codes[r];
				var b = Math.floor(Math.random() * bgColor.length);
				ctx.fillStyle = bgColor[b];
				ctx.fillText(codes[r], x, y);
			}
		}
	}
};
</script>

<style >
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