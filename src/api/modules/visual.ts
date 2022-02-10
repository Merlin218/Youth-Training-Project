/*
 * @Author: Merlin218
 * @Date: 2022-02-08 11:19:01
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 13:01:26
 * @Description: 可视化接口
 */

import createRequest from '../axios';

const getAllChartPic = (id: string) =>
	createRequest(
		{
			url: '/cms/getAllChartPic',
			method: 'GET',
			params: {
				project_id: id,
			},
		},
		{
			loading: false,
		}
	);

const updateChartPicConfig = (data: {
	chartpic_id: string; // 图表编号
	chart_type: string; // 图表类型
	chart_title: string; // 图表标题默认值
	vis_config: string; // 可视化配置json字符串默认值
	watermark_config: string; // 水印配置json字符串默认值
}) =>
	createRequest({
		url: '/cms/updateChartPicConfig',
		method: 'POST',
		data,
	});
const getProjectData = (projectId: string) =>
	createRequest({
		url: '/cms/getProjectData',
		method: 'get',
		params: {
			t: Date.now(),
			project_id: projectId,
		},
	});

export default {
	updateChartPicConfig,
	getAllChartPic,
	getProjectData,
};
