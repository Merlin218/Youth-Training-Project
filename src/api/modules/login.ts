import createRequest from '../axios';

const loginApi = {
	login: (params: any) =>
		createRequest({
			url: '/login/validateUsr',
			method: 'post',
			params,
		}),
};

export default loginApi;
