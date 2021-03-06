import { defineStore } from 'pinia';
import docCookies from '@/utils/cookie';

export const useMainStore = defineStore({
	id: 'user',
	state: () => ({
		username: docCookies.getItem('user'),
	}),
	actions: {
		// 支持同步或异步
		updateUsername(name: string) {
			this.username = name;
		},
	},
});
