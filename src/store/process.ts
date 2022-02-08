import { defineStore } from 'pinia';
import createRequest from '../api/axios';
import { ProTable } from '../pages/preproccess/preproccess/ProTable';

export interface IgetTableAPI {
	code: number;
	data: ProTable;
}

export const useTableStore = defineStore({
	id: 'process',
	// table: 获取的数据, tableExport用于下一阶段处理的数据
	state: () => ({
		table: new ProTable({ getted: false }),
		tableExport: null as any,
	}),
	actions: {
		getTable(projectId: string) {
			return createRequest({
				url: '/getProjectData',
				method: 'get',
				params: {
					t: Date.now(),
					project_id: projectId, // : '32958067-a627-4b64-abaa-43c52734b649',
				},
			}).then(
				(d: IgetTableAPI | any) => {
					if (!d.code) {
						const tableData = JSON.parse(d.result.data);
						this.table.bind({
							title: tableData.title,
							data: tableData.data || [],
							cols: tableData.cols,
						});
					} else {
						this.table.getted = false;
						return false;
					}
					return true;
				},
				() => {
					this.table.geted = false;
					return false;
				}
			);
		},
		putTable() {
			return createRequest({
				url: '/updateProjectData',
				method: 'post',
				data: {
					project_id: '32958067-a627-4b64-abaa-43c52734b649',
					data_string: JSON.stringify(this.tableExport),
				},
			});
		},
	},
});
