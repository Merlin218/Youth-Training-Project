import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { message } from 'ant-design-vue';
import docCookies from '@/utils/cookie';
import Index from '../pages/index.vue';
import Login from '../pages/login/index.vue';
import Register from '../pages/login/register.vue';
import Start from '@/pages/start/index.vue';
import Visual from '../pages/visual/visual.vue';
import NotFound from '@/pages/NotFound.vue';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: '首页',
		component: Index,
		redirect: '/projects',
		children: [
			{
				path: '/login',
				name: 'login',
				component: Login,
			},
			{
				path: '/register',
				name: 'register',
				component: Register,
			},
			{
				path: '/start',
				name: 'start',
				component: Start,
			},
			{
				path: '/visual',
				name: 'visual',
				component: Visual,
				redirect: '/visual/select',
				children: [
					{
						path: '/visual/select',
						name: 'visual_select',
						component: () => import('../pages/visual/components/ChartSelect.vue'),
					},
					{
						path: '/visual/config',
						name: 'visual_config',
						component: () => import('../pages/visual/components/ChartConfig.vue'),
					},
				],
			},
			{
				path: '/projects',
				name: 'projects',
				component: () => import('../pages/projects/index.vue'),
			},
			{
				path: '/publish',
				name: 'publish',
				component: () => import('../pages/publish/index.vue'),
			},
			{
				path: '/preprocess',
				name: 'preprocess',
				component: () => import('../pages/preprocess/index.vue'),
			},
		],
	},
	{
		path: '/:catchAll(.*)',
		component: NotFound,
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
