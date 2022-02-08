<template>
	<div class="login">
		<div class="login-a-form">
			<h1 style="color: #333; margin-bottom: 40px">Register</h1>
			<!-- <a-form
				:label-width="80"
				:rules="ruleInline"
				ref="submit"
				:model="submit"
				@keyup.native.enter="handleSubmit"
			> -->
			<a-form ref="submit" :label-width="80" :rules="ruleInline" :model="submit">
				<a-form-item label="账号：" :label-width="100" prop="username">
					<a-input v-model="submit.username" type="text" placeholder="请输入 不能超过十六位">
						<!-- <Icon type="ios-person-outline" slot="prepend"></Icon> -->
						<Icon type="ios-person-outline"></Icon>
					</a-input>
				</a-form-item>
				<a-form-item label="密码：" :label-width="100" prop="password">
					<a-input v-model="submit.password" type="password" password>
						<!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
						<Icon type="ios-lock-outline"></Icon>
					</a-input>
				</a-form-item>
				<a-form-item label="确认密码：" :label-width="100" prop="confirmPassword">
					<a-input v-model="submit.confirmPassword" type="password" password>
						<!-- <Icon type="ios-lock-outline" slot="prepend"></Icon> -->
						<Icon type="ios-lock-outline"></Icon>
					</a-input>
				</a-form-item>
				<a-form-item label="验证码：" :label-width="100">
					<div class="flex">
						<a-input v-model="verCode" type="text" style="width: 40%; margin-right: 30px">
							<!-- <Icon type="ios-megaphone-outline" slot="prepend"></Icon> -->
							<Icon type="ios-megaphone-outline"></Icon>
						</a-input>
						<canvas id="myCanvas"></canvas>
						<a-button type="text" style="margin-left: 10px" @click="createCode">换一个</a-button>
					</div>
				</a-form-item>
				<a-form-item>
					<a-button type="primary" @click="handleSubmit">注册</a-button>
					<router-link to="/" style="margin-left: 30px">返回首页</router-link>
				</a-form-item>
			</a-form>
		</div>
	</div>
</template>

<script>
// import mixins from './mixins';

export default {
	// mixins: [mixins],
	data() {
		return {
			submit: {
				username: '',
				password: '',
				confirmPassword: '',
			},
			createC: '',
			verCode: '',
			ruleInline: {
				username: [
					{
						required: true,
						trigger: 'blur',
						validator: (rule, value, callback) => {
							// const p = '(0?//d{1,2})[///-]0?//d{1,2}[///-]//d{4}';
							// const reg = new RegExp(p, 'g');
							const reg = new RegExp('[\\u4E00-\\u9FFF]+', 0);
							if (reg.test(value)) {
								callback(new Error('不能含有中文字符'));
							} else if (value.length > 16) {
								callback(new Error('账号长度不能超过十六位'));
							} else if (/^[a-zA-Z][a-zA-Z0-9_]{4,15}$/.test(value)) {
								callback();
							} else if (value.length < 6) {
								callback(new Error('账号长度不能小于六位'));
							} else {
								callback(new Error('账号格式不正确'));
							}
						},
					},
				],
				password: [
					{
						required: true,
						trigger: 'blur',
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请输入密码'));
							} else if (value.length < 6) {
								callback(new Error('密码格式不正确'));
							} else {
								if (this.submit.confirmPassword !== '') {
									// 对第二个密码框单独验证
									this.$refs.submit.validateField('confirmPassword');
								}
								callback();
							}
						},
					},
				],
				confirmPassword: [
					{
						required: true,
						trigger: 'blur',
						validator: (rule, value, callback) => {
							if (value === '') {
								callback(new Error('请再次输入密码'));
							} else if (value.length < 6) {
								callback(new Error('密码格式不正确'));
							} else if (value !== this.submit.password) {
								callback(new Error('两次密码不匹配'));
							} else {
								callback();
							}
						},
					},
				],
			},
		};
	},
	mounted() {},
	methods: {
		handleSubmit() {
			this.$refs.submit.validate(valid => {
				if (valid) {
					if (this.verCode !== this.createC) {
						this.$Message.warning('验证码输入错误');
						return;
					}
					delete this.submit.confirmPassword;
					// this.$ajax.post('/register', this.submit).then(res => {
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
	},
};
</script>

<style>
.login {
	width: 100%;
	height: 100%;
	background-size: cover;
	display: flex;
	justify-content: center;
}
.login-a-form {
	text-align: center;
	padding: 20px;
	border-radius: 10px;
	margin-top: 4rem;
}
.flex {
	display: flex;
	align-items: center;
}
</style>
