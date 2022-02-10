import createRequest from '../axios';

const publishApi = {
	updateCurrentChartPicExport: (data: any) =>
		createRequest({
			url: '/cms/updateCurrentChartPicExport',
			method: 'post',
			data,
		}),
	getProjectsData: (params: any) =>
		createRequest({
			url: '/cms/getProjectData',
			method: 'get',
			params,
		}),
	getChartPicHtmlString: (params: any) =>
		createRequest(
			{
				url: '/cms/getChartPicHtmlString',
				method: 'get',
				params,
			},
			{
				loading: false,
			}
		),
	getChartPicHtmlFile: (data: any) =>
		createRequest({
			url: '/cms/getChartPicHtmlFile',
			method: 'post',
			data,
		}),
};

export default publishApi;
