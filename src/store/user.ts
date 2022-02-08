import { defineStore } from 'pinia';

export const useMainStore = defineStore({
	id: 'user',
	state: () => ({
		name: '超级管理员',
		isLogin: false,
	}),
	actions: {
		// 支持同步或异步
		changeLoginStatus(status: boolean) {
			this.isLogin = status;
		},
	},
});
