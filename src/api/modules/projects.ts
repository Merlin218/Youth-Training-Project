import createRequest from '../axios';
import docCookies from '@/utils/cookie';

const projectsApi = {
	getAllProjects: () =>
		createRequest({
			url: '/cms/getAllProjects',
			method: 'get',
			params: {
				user_name: docCookies.getItem('user'),
			},
		}),
	login: (data: any) =>
		createRequest({
			url: '/login/validateUsr',
			method: 'post',
			data,
		}),
	logout: () =>
		createRequest({
			url: '/login/logout',
			method: 'post',
		}),
};

export default projectsApi;
