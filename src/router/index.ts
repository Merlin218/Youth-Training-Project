import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: '首页',
		component: () => import('../pages/index.vue'),
		children: [
			{
				path: '/login',
				name: '登录',
				component: () => import('../pages/login/index.vue'),
			},
			{
				path: '/start',
				name: '开始',
				component: () => import('../pages/start/index.vue'),
			},
			{
				path: '/visual',
				name: '可视化',
				component: () => import('../pages/visual/visual.vue'),
			},
			{
				path: '/publish',
				name: '发布',
				component: () => import('../pages/publish/index.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
