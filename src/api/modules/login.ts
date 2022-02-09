import createRequest from '../axios';

const loginApi = {
	getImg: (params: any) =>
		createRequest(
			{
				url: '/login/getcaptcha',
				method: 'get',
				params,
			},
			{
				loading: false,
			}
		),
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

export default loginApi;
