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
		tableExport: null,
	}),
	actions: {
		getTable() {
			return createRequest({
				url: '/table',
				method: 'get',
				params: {
					t: Date.now(),
					tid: 123,
				},
			}).then(
				(d: IgetTableAPI | any) => {
					if (!d.code) {
						this.table.bind({
							title: d.data.title,
							data: d.data.data || [],
							cols: d.data.cols,
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
				url: '/table',
				method: 'put',
				data: {
					data: this.tableExport,
				},
			});
		},
	},
});
