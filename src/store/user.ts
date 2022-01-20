import { defineStore } from 'pinia';

export const useMainStore = defineStore({
	id: 'user',
	state: () => ({
		name: '超级管理员',
	}),
	actions: {
		// 支持同步或异步
	},
});
