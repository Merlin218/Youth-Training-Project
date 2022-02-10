import createRequest from '../axios';
import docCookies from '@/utils/cookie';

const commonApi = {
	getAllProjects: () =>
		createRequest(
			{
				url: '/cms/getAllProjects',
				method: 'get',
				params: {
					user_name: docCookies.getItem('user'),
				},
			},
			{
				loading: false,
			}
		),
};

export default commonApi;
