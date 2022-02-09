import createRequest from '../axios';

const publishApi = {
	updateCurrentChartPicExport: (params: any) =>
		createRequest({
			url: '/cms/updateCurrentChartPicExport',
			method: 'post',
			params,
		}),
};

export default publishApi;
