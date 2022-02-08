/*
 * @Author: Merlin218
 * @Date: 2022-02-03 21:26:54
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-06 21:13:02
 * @Description: 请填写简介
 */
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
	history: createWebHistory(),
	routes,
});

export default router;
