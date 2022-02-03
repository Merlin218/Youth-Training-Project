// 似乎没用了, 删掉也可以

export interface IcolDataDef {
	onEdit: boolean;
	defed: boolean;
	min: number;
	max: number;
	nn: boolean;
	top: number | null;
	last: number | null;
	[key: string]: any;
}

export interface ICols {
	cid: number;
	computed: boolean;
	cname: string;
	cKey: string;
	type: string;
	equition: string | null;
	selected: boolean;
	dataDef: IcolDataDef;
	dataSift: IcolDataDef;
	compareable: false;
	[key: string]: any;
}

export interface ITable {
	geted: boolean;
	title: string | null;
	data: any[];
	cols: ICols[];
}
