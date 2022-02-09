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
