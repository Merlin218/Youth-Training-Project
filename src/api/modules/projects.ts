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
	addProject: (data: any) =>
		createRequest({
			url: '/cms/addProject',
			method: 'post',
			data: {
				user_name: docCookies.getItem('user'),
				data_string: '',
				...data,
			},
		}),
	deleteProject: (data: any) =>
		createRequest({
			url: '/cms/deleteProject',
			method: 'post',
			data,
		}),
};

export default projectsApi;
