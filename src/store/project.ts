import { defineStore } from 'pinia';
import { ChartData } from '@/types/project/index';

export const useProjectStore = defineStore('project', {
	state: () => ({
		project_id: '' as string, // 当前项目 id（新建项目或从项目页点入会更新），可以在进入页面时没有 params 的时候使用
		chartData: [] as Array<ChartData>, // 项目图表信息数组
		title: '' as string, // 项目标题
		jsonContent: '' as string, // json 内容
		strContent: '' as string, // textarea 显示的内容
	}),
	actions: {
		updateJsonContent(jsonContent: string) {
			this.jsonContent = jsonContent;
		},
		updateStrContent(strContent: string) {
			this.strContent = strContent;
		},
		updateTitle(title: string) {
			this.title = title;
		},
		updateChartData(chartData: Array<ChartData>) {
			this.chartData = chartData;
		},
		updateProjectId(projectId: string) {
			this.project_id = projectId;
		},
	},
});

// strContent
// 学号	姓名	学历
// 10008	伍容华	本科
// 20010	王向容	硕士
// 20018	李丽	大专
// 102201	刘明	本科
// 102208	朱俊	硕士
// 108991	钟敏	硕士
// 111006	张石兵	本科
// 210678	林涛	大专
// 302566	李玉珉	本科
// 308759	叶凡	本科
// 504209	陈林琳	大专

// jsonContent
// [{"学号":"10008","姓名":"伍容华","学历":"本科"},{"学号":"20010","姓名":"王向容","学历":"硕士"},{"学号":"20018","姓名":"李丽","学历":"大专"},{"学号":"102201","姓名":"刘明","学历":"本科"},{"学号":"102208","姓名":"朱俊","学历":"硕士"},{"学号":"108991","姓名":"钟敏","学历":"硕士"},{"学号":"111006","姓名":"张石兵","学历":"本科"},{"学号":"210678","姓名":"林涛","学历":"大专"},{"学号":"302566","姓名":"李玉珉","学历":"本科"},{"学号":"308759","姓名":"叶凡","学历":"本科"},{"学号":"504209","姓名":"陈林琳","学历":"大专"}]
