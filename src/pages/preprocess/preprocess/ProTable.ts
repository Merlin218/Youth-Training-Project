/* eslint max-classes-per-file: ["error", 99] */
// 这个文件有点大, 不想分文件了

import { evaluate } from 'mathjs';

// 列上错误记录
interface IColErr {
	haveError: boolean; // 有错误
	maxErr?: any; // 有值大于最大值(Set(colId))
	minErr?: any; // 有值小于最小值(Set(colId))
	nnErr?: any; // 有值为空值(要求为非空)(Set(colId))
	typeErr?: boolean; // 数据类型不合法
}

/**
 * @description 数据类型或筛选用属性
 */
export class TableColDataDef {
	onEdit: boolean; // 编辑中

	defed: boolean; // 用户手动修改过

	min: any; // 最小值

	max: any; // 最大值

	nn: boolean; // 非空?

	top: number | null; // 前百分之多少

	last: number | null; // 后百分之多少

	topV: number | null; // 前百分之多少对应多大

	lastV: number | null; // 后百分之多少对应多大

	constructor({ onEdit = false, defed = false, min = null, max = null, nn = true, top = null, last = null, topV = null, lastV = null }) {
		this.onEdit = onEdit;
		this.defed = defed;
		this.min = min;
		this.max = max;
		this.nn = nn;
		this.top = top;
		this.last = last;
		this.topV = topV;
		this.lastV = lastV;
	}
}

export class TableCol {
	cid: number; // 列ID

	computed: boolean; // 是否是计算属性字段

	cname: string; // 展示的名字

	cKey: string; // key

	type: string; // 数据类型

	equation: string | null; // 计算属性的公式

	selected: boolean; // 字段被选中

	dataDef: TableColDataDef; // 数据定义

	dataSift: TableColDataDef; // 数据筛选

	compareable: boolean; // 这个字段类型是否是可比较的(boolean date number)

	data: any[]; // link到表格数据方便操作

	errors: IColErr; // 列中所有error

	editable?: boolean;

	constructor({ cid, cname, cKey, type = 'string', data, equation = null, computed = false }) {
		this.cid = cid;
		this.computed = computed;
		this.cname = cname;
		this.cKey = cKey;
		this.type = type.trim().toLowerCase();
		this.equation = equation;
		this.selected = false;
		this.dataDef = new TableColDataDef({});
		this.dataSift = new TableColDataDef({});
		this.compareable = false;
		this.data = data;
		this.editable = true;
		if (!this.computed) {
			// 如果不是计算属性就检查类型, 初始化数据定义与筛选, 计算错误
			this.errors = { haveError: null, typeErr: this.checkType() };
			this.checkType();
			this.initColDefine();
			this.initColSift();
			this.checkColDefine();
		} else {
			// 计算下计算属性值
			this.refreshComputedValue();
		}
	}

	// 定义每一个属性的: 属性名, 判断是否是该属性函数, 重载<=, 可比较类型?
	static colType = [
		{
			typeName: 'number',
			checkType: v => !Number.isNaN(+v),
			isLeq: (a, b) => +a <= +b,
			parase: v => +v,
			compareable: true,
		},
		{
			typeName: 'boolean',
			checkType: v => {
				if (['boolean', 'number'].includes(typeof v)) return true;
				if (typeof v === 'string') return ['true', 'false'].includes(v.trim().toLowerCase());
				return false;
			},
			isLeq: (a, b) => (a.trim().toLowerCase() !== 'false' && !!a) <= (b.trim().toLowerCase() !== 'false' && !!b),
			parase: v => !!v,
			compareable: true,
		},
		{
			typeName: 'string',
			checkType: () => true,
			isLeq: () => true,
			parase: v => String(v),
			compareable: false,
		},
		{
			typeName: 'date',
			checkType: v => !Number.isNaN(new Date(v).getTime()),
			isLeq: (a, b) => a <= b,
			parase: v => new Date(v),
			compareable: true,
		},
	];

	tryType() {
		const type = TableCol.colType.find(d => {
			const invIdx = this.data.findIndex(dd => !d.checkType(dd[this.cKey]));
			return invIdx === -1;
		});
		return type;
	}

	formatType() {
		const type = TableCol.colType.find(d => d.typeName === this.type);
		this.data.forEach(d => {
			d[this.cKey] = type.parase(d[this.cKey]);
		});
	}

	// 获取这一列的类型对象与本列数据(v), 行ID(rowId)
	getColTypeData() {
		const typeObj = TableCol.colType.find(d => d.typeName === this.type.toLowerCase()) || TableCol.colType.slice(-1)[0];
		const colData = this.data.map(d => {
			return { v: d[this.cKey], rowId: d.rowId };
		});
		return { typeObj, colData };
	}

	// 检查类型
	checkType() {
		const { typeObj, colData } = this.getColTypeData();
		this.compareable = typeObj.compareable;
		return !!(colData.findIndex(d => !typeObj.checkType(d.v)) + 1);
	}

	// 初始化数据定义对象
	initColDefine(): void {
		const { typeObj, colData } = this.getColTypeData();
		this.compareable = typeObj.compareable;
		const tmpArr = [...colData];
		tmpArr.sort((a, b) => 0.5 - (typeObj.isLeq(a.v, b.v) as unknown as number));
		this.dataDef.nn = !(tmpArr.findIndex(d => d.v === null || d.v === undefined || d.v === '') + 1);
		this.dataDef.min = this.compareable ? tmpArr.slice(0, 1).shift().v : null;
		this.dataDef.max = this.compareable ? tmpArr.slice(-1).shift().v : null;
		this.dataDef.defed = false;
	}

	// 初始化数据定义对象并检查错误
	checkColDefine() {
		const errs: IColErr = {
			haveError: false,
			maxErr: new Set(),
			minErr: new Set(),
			nnErr: new Set(),
			typeErr: this.checkType(),
		};
		const { typeObj, colData } = this.getColTypeData();
		colData.forEach(d => {
			if (d.v === undefined || d.v === null || d.v === '') {
				errs.nnErr.add(d.rowId);
				return;
			}
			if (!typeObj.isLeq(d.v, this.dataDef.max)) errs.maxErr.add(d.rowId);
			if (!typeObj.isLeq(this.dataDef.min, d.v)) errs.minErr.add(d.rowId);
		});
		errs.haveError = errs.maxErr.size || errs.minErr.size || errs.nnErr.size || errs.typeErr;
		this.errors = errs;
		return errs.haveError;
	}

	// 初始化数据筛选
	initColSift() {
		const { typeObj, colData } = this.getColTypeData();
		this.compareable = typeObj.compareable;
		const tmpArr = [...colData];
		tmpArr.sort((a, b) => 0.5 - (typeObj.isLeq(a.v, b.v) as unknown as number));
		this.dataSift.nn = !(tmpArr.findIndex(d => d.v === null || d.v === undefined || d.v === '') + 1);
		this.dataSift.min = this.compareable ? tmpArr.slice(0, 1).shift().v : null;
		this.dataSift.max = this.compareable ? tmpArr.slice(-1).shift().v : null;
		this.dataSift.top = this.compareable ? 100 : null;
		this.dataSift.last = this.compareable ? 100 : null;
		this.dataSift.defed = false;
	}

	// 返回被筛选掉的数据
	filteColSift() {
		const { typeObj, colData } = this.getColTypeData();
		const disableRow = [];
		colData.forEach(d => {
			if (this.dataSift.nn && (d.v === null || d.v === undefined || d.v === '')) {
				disableRow.push(d.rowId);
			} else if (this.compareable && !this.errors.typeErr) {
				const orderArr = [...colData];
				orderArr.sort((a, b) => 0.5 - (typeObj.isLeq(a.v, b.v) as unknown as number));
				if (!orderArr.length) return;
				const lowIdx = Math.ceil((orderArr.length * this.dataSift.last) / 100 - 1);

				const highIdx = orderArr.length - 1 - Math.ceil((orderArr.length * this.dataSift.last) / 100 - 1);

				this.dataSift.lastV = orderArr.slice(lowIdx).length ? orderArr.slice(lowIdx)?.shift().v : orderArr.slice(0).shift().v - 1;
				this.dataSift.topV = orderArr.slice(highIdx).length ? orderArr.slice(highIdx)?.shift().v : orderArr.slice(-1).shift().v + 1;
				if (!(typeObj.isLeq(d.v, this.dataSift.max) && typeObj.isLeq(this.dataSift.min, d.v) && (typeObj.isLeq(d.v, this.dataSift.lastV) || typeObj.isLeq(this.dataSift.topV, d.v)))) {
					disableRow.push(d.rowId);
				}
			}
		});
		return disableRow;
	}

	// 刷新列的计算属性值
	refreshComputedValue() {
		if (!this.computed) return;
		this.data.forEach(d => {
			let e = this.equation;
			const numCol = e.match(/\$[^ $]+\$/g);
			if (numCol) {
				numCol.forEach(dd => {
					if (Object.prototype.hasOwnProperty.call(d, dd.slice(1, -1))) e = e.replaceAll(dd, Number.parseFloat(d[dd.slice(1, -1).trim()] || 0));
				});
			}
			d[this.cKey] = evaluate(e);
		});
	}
}

export class ProTable {
	geted: boolean; // 成功获取

	title: string; // 表名

	data: any[]; // 数据

	cols: TableCol[]; // 列定义

	// 目前支持的数据类型
	static colType = ['string', 'number', 'boolean', 'date'];

	// static rowCounter = 0; // 行计数
	rowCounter: number; // 行计数

	static colCounter = 0; // 列计数

	constructor({ getted = true, title = '', data = [], cols = [] }) {
		this.geted = getted;
		this.title = title;
		this.data = data;
		this.rowCounter = 1;
		// eslint-disable-next-line
		this.data.forEach(d => (d.rowId = this.rowCounter++));
		this.cols = cols.map(d => {
			// eslint-disable-next-line
			ProTable.colCounter = Math.max(++ProTable.colCounter, d.cid);
			return new TableCol(Object.assign(d, { data }));
		});
	}

	// 新增数据
	bind({ getted = true, title = '', data = [], cols = [] }) {
		this.geted = getted;
		this.title = title;
		this.data = data;
		// eslint-disable-next-line
		this.data.forEach(d => (d.rowId = this.rowCounter++));
		this.cols = cols.map(d => {
			// eslint-disable-next-line
			ProTable.colCounter = Math.max(++ProTable.colCounter, d.cid);
			return new TableCol(Object.assign(d, { data }));
		});
	}

	// 获取筛选之后的数据
	mappedTable() {
		const disableRow = [];
		this.cols.forEach(d => {
			disableRow.push(...d.filteColSift());
		});
		const disableRowSet = new Set(disableRow);
		const mappedData = this.data.filter(d => !disableRowSet.has(d.rowId));
		return mappedData;
	}

	// 属性表格的计算属性
	refreshComputedTable() {
		this.cols.forEach(d => {
			if (d.computed) d.refreshComputedValue();
		});
	}

	// 添加计算属性列
	addComputedValue({ cid = null, equation, cname, type = 'number' }) {
		// eslint-disable-next-line
		++ProTable.colCounter;
		cid = cid || ProTable.colCounter;
		const cKey = cname.replaceAll(/[ $]/g, '_'); // `comp${cid}`;		// Opps not a good change
		this.data.forEach(d => {
			d[cKey] = null;
		});
		const ccol = new TableCol({
			cid,
			cname: cname.replaceAll(/[ $]/g, '_'),
			type,
			data: this.data,
			cKey,
			equation,
			computed: true,
		});
		this.cols.push(ccol);
	}

	// 导出数据表(用于存储/下一步)
	exportTable(selected, shifted) {
		const res = {
			title: this.title,
			data: [],
			cols: [],
		};
		res.cols = this.cols.filter(d => (selected ? d.selected || d.computed : true));
		res.cols = res.cols.map(d => ({
			cid: d.cid,
			cKey: d.cKey,
			cname: d.cname,
			type: d.type,
		}));
		let data = shifted ? this.mappedTable() : this.data;
		data = JSON.parse(JSON.stringify(data));
		data.forEach(d => {
			const dataInv = {};
			let cnt = 0;
			res.cols.forEach(dd => {
				if (Object.prototype.hasOwnProperty.call(d, dd.cKey)) {
					dataInv[dd.cKey] = d[dd.cKey];
					// eslint-disable-next-line
					cnt++;
				}
			});
			// eslint-disable-next-line
			delete d._X_ID;
			delete d.rowId;
			if (cnt) res.data.push(dataInv);
		});
		return res;
	}
}
