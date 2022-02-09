<template>
	<Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
		<FormItem label="新密码: " prop="passwd">
			<Input v-model="formCustom.passwd" type="password"></Input>
		</FormItem>
		<FormItem label="确认: " prop="passwdCheck">
			<Input v-model="formCustom.passwdCheck" type="password"></Input>
		</FormItem>
		<FormItem>
			<Button type="primary" @click="updatePassword('formCustom')">确认修改</Button>
			<Button style="margin-left: 8px" @click="handleReset('formCustom')">重置</Button>
		</FormItem>
	</Form>
</template>

<script>
// import { UpdatePassword } from '../../../api/user';
export default {
	name: 'ChangePassword',
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码!'));
			} else {
				if (this.formCustom.passwdCheck !== '') {
					// 对第二个密码框单独验证
					this.$refs.formCustom.validateField('passwdCheck');
				}
				callback();
			}
		};
		const validatePassCheck = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再输一次密码！'));
			} else if (value !== this.formCustom.passwd) {
				callback(new Error('两次输入的密码不匹配！'));
			} else {
				callback();
			}
		};

		return {
			formCustom: {
				passwd: '',
				passwdCheck: '',
			},
			ruleCustom: {
				passwd: [{ validator: validatePass, trigger: 'blur' }],
				passwdCheck: [{ validator: validatePassCheck, trigger: 'blur' }],
			},
		};
	},
	computed: {
		userId() {
			return this.$store.state.user.userId;
		},
	},
	methods: {
		updatePassword(name) {
			this.$refs[name].validate(valid => {
				if (valid) {
					// return new Promise((() => {
					//   UpdatePassword(this.userId, this.formCustom.passwd).then(response => {
					//     if (response.status === 201) {
					//       this.$Message.success("修改密码成功，请重新登录！");
					//       this.$store.commit('setUser', {
					//         userId: '',
					//         userName: '',
					//         userGender: '',
					//         userEmail: '',
					//         userRoleName: ''
					//       });
					//       this.$router.replace({name: 'Login'});
					//     } else {
					//       this.$Message.error(response.data);
					//     }
					//   })
					// }));
				} else {
					this.$Message.error('修改密码失败！');
				}
				return 0;
			});
		},
		handleReset(name) {
			this.$refs[name].resetFields();
		},
	},
};
</script>

<style scoped></style>
