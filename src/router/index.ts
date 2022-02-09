/*
 * @Author: Merlin218
 * @Date: 2022-02-03 21:26:54
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 23:23:53
 * @Description: 请填写简介
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { message } from 'ant-design-vue';
import docCookies from '@/utils/cookie';
import Index from '../pages/index.vue';
import Login from '../pages/login/index.vue';
import Register from '../pages/login/register.vue';
import Start from '@/pages/start/index.vue';
import Visual from '../pages/visual/visual.vue';
import ChartSelect from '../pages/visual/components/ChartSelect.vue';
import ChartConfig from '../pages/visual/components/ChartConfig.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: '首页',
		component: Index,
		children: [
			{
				path: '/login',
				name: '登录',
				component: Login,
			},
			{
				path: '/register',
				name: '注册',
				component: Register,
			},
			{
				path: '/start',
				name: '开始',
				component: Start,
			},
			{
				path: '/visual',
				name: '可视化',
				component: Visual,
				redirect: '/visual/select',
				children: [
					{
						path: '/visual/select',
						name: '选择图表',
						component: ChartSelect,
					},
					{
						path: '/visual/config',
						name: '配置图表',
						component: ChartConfig,
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
				path: '/preprocess',
				name: '数据预处理',
				component: () => import('../pages/preprocess/index.vue'),
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory(),
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
