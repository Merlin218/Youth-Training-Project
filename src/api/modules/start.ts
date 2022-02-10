import createRequest from '../axios';

const startApi = {
	updateProjectData: (data: any) =>
		createRequest({
			url: '/cms/updateProjectData',
			method: 'post',
			data,
		}),
	updateProjectStatus: (data: any) =>
		createRequest(
			{
				url: '/cms/updateProjectStatus',
				method: 'post',
				data: {
					first_finished: 1,
					second_finished: -1,
					third_finished: -1,
					...data,
				},
			},
			{
				loading: false,
			}
		),
};

export default startApi;
