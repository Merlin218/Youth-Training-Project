/*
 * @Author: Merlin218
 * @Date: 2022-02-03 21:26:54
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 19:49:46
 * @Description: 请填写简介
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { message } from 'ant-design-vue';
import docCookies from '@/utils/cookie';

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
				path: '/register',
				name: '注册',
				component: () => import('../pages/login/register.vue'),
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
				redirect: '/visual/select',
				children: [
					{
						path: '/visual/select',
						name: '选择图表',
						component: () => import('../pages/visual/components/ChartSelect.vue'),
					},
					{
						path: '/visual/config',
						name: '配置图表',
						component: () => import('../pages/visual/components/ChartConfig.vue'),
					},
				],
			},
			{
				path: '/projects',
				name: '项目',
				component: () => import('../pages/projects/index.vue'),
			},
			{
				path: '/publish',
				name: '发布',
				component: () => import('../pages/publish/index.vue'),
			},
			{
				path: '/preproccess',
				name: '数据预处理',
				component: () => import('../pages/preproccess/index.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		if (!docCookies.getItem('user')) {
			next();
		} else {
			router.push('/projects');
		}
	} else if (docCookies.getItem('user')) {
		next();
	} else {
		message.info('未登录，请先登录');
		router.push('/login');
	}
});

export default router;
