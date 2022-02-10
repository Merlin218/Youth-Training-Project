import { ProTable } from '@/pages/preprocess/preprocess/ProTable';

export function toTable(data: never[]) {
	const cols: any = [];
	let cid = 0;
	if (data.length > 0) {
		cols.push(
			...Object.keys(data[0]).map(d => {
				cid += 1;
				return {
					cid,
					cKey: d,
					cname: d,
					type: 'string',
				};
			})
		);
	}
	const table = new ProTable({
		title: '',
		data,
		cols,
	});
	table.cols.forEach(d => {
		const { typeName }: any = d.tryType();
		d.type = typeName;
		d.formatType();
	});
	return table.exportTable(false, false);
}

export function addRowId(table: ProTable) {
	let rowId = 0;
	table.data.forEach(d => {
		d.rowId = rowId;
		rowId += 1;
	});
}

export function removeSpace(data) {
	const newData = data.map(d => {
		const dataItem = {};
		Object.keys(d).forEach(dd => {
			dataItem[dd.replaceAll(/[ $]/g, '_')] = d[dd];
		});
		return dataItem;
	});
	return newData;
}

export function sortKeys(table, key) {
	const tab = new ProTable({
		title: table.title,
		data: table.data,
		cols: table.cols,
	});
	const col = tab.cols.find(d => d.cKey === key || d.cname === key);
	if (!col) return;
	const { typeObj } = col.getColTypeData();
	tab.data.sort((a, b) => 0.5 - typeObj.isLeq(a[key], b[key]));
	table.data = tab.data;
}
