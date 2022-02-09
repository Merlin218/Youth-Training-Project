import createRequest from '../axios';
import docCookies from '@/utils/cookie';

const startApi = {
	addProject: (data: any) =>
		createRequest({
			url: '/cms/addProject',
			method: 'post',
			data: {
				user_name: docCookies.getItem('user'),
				...data,
			},
		}),
};

export default startApi;
