import createRequest from '../axios';

const loginApi = {
	login: (params: any) =>
		createRequest({
			url: '/shibes',
			method: 'post',
			params,
		}),
};

loginApi.login;

export default loginApi;
