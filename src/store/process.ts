/* eslint-disable camelcase */
import { defineStore } from 'pinia';
import createRequest from '../api/axios';
import { ProTable } from '../pages/preprocess/preprocess/ProTable';
import { data } from '@/data';
import { removeSpace, toTable } from '@/utils/preprocess';

export interface IgetTableAPI {
	code: number;
	data: ProTable;
	project_id: null;
}

export const useTableStore = defineStore({
	id: 'process',
	// table: 获取的数据, tableExport用于下一阶段处理的数据
	state: () => ({
		table: new ProTable({ getted: false }),
		// tableExport: null as any,
		tableExport: data as any,
	}),
	actions: {
		getTable(projectId: string) {
			return createRequest({
				url: '/cms/getProjectData',
				method: 'get',
				params: {
					t: Date.now(),
					project_id: projectId, // : '32958067-a627-4b64-abaa-43c52734b649',
				},
			}).then(
				(d: IgetTableAPI | any) => {
					if (!d.code) {
						let tableData = JSON.parse(d.result.data);
						const isTable = tableData.cols;
						if (!isTable) {
							tableData = toTable(removeSpace(tableData));
							console.log(tableData);
						}
						this.table.bind({
							title: tableData.title || '未命名表格',
							data: tableData.data || [],
							cols: tableData.cols,
						});
						if (!isTable) {
							this.tableExport = this.table.exportTable(false, false);
							this.putTable(this.project_id);
						}
					} else {
						this.table.getted = false;
						return false;
					}
					return true;
				},
				() => {
					this.table.getted = false;
					return false;
				}
			);
		},
		putTable(projectId: string) {
			return createRequest({
				url: '/cms/updateProjectData',
				method: 'post',
				data: {
					project_id: projectId, // '32958067-a627-4b64-abaa-43c52734b649',
					data_string: JSON.stringify(this.tableExport),
				},
			});
		},
	},
});
