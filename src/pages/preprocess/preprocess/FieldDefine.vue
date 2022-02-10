<template>
	<div class="title">
		<h3>定义您的数据</h3>
	</div>
	<div class="table">
		<a-table :row-key="(record:any) => record.cid" :pagination="false" :columns="colName" :data-source="colData">
			<template #defineType="{ record }">
				<a-select ref="select" v-model:value="record.type" :options="colType" @change="typeChange(record)"> </a-select>
			</template>
			<template #defineRange="{ record }">
				<a-button type="primary" :disabled="record?.errors?.typeErr" @click="toggleOnEdit(record.cid, 'dataDef')">点击定义</a-button>
				<FieldSift :col-id="record.cid" modal-type="dataDef"></FieldSift>
			</template>
			<template #defineSift="{ record }">
				<a-button type="primary" :disabled="record?.errors?.typeErr" @click="toggleOnEdit(record.cid, 'dataSift')">点击筛选</a-button>
				<FieldSift :col-id="record.cid" modal-type="dataSift"> </FieldSift>
			</template>
			<template #errors="{ record }">
				{{ errInfo(record) }}
			</template>
		</a-table>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import FieldSift from './FieldSift.vue';
import { useTableStore } from '../../../store/process';
import { ProTable } from './ProTable';

const colDefTableName = [
	{
		title: '字段',
		dataIndex: 'cname',
		key: 'cname',
	},
	{
		title: '数据类型',
		slots: { customRender: 'defineType' },
		key: 'defineType',
	},
	{
		title: '数据定义',
		slots: { customRender: 'defineRange' },
		key: 'defineRange',
	},
	{
		title: '筛选',
		slots: { customRender: 'defineSift' },
		key: 'defineSift',
	},
	{
		title: '错误',
		slots: { customRender: 'errors' },
		key: 'errors',
	},
];

const store = useTableStore();
const table = reactive(store.table);
// 获取所有被选中的字段
const colData = computed(() => table.cols.filter(d => d.selected));
const colName = colDefTableName;
// 生成数据类型options
const colType = reactive(
	ProTable.colType.map(d => ({
		value: d,
		label: d,
	}))
);

// 开关模态框
function toggleOnEdit(colId: number, modalType: string) {
	const record: any = table.cols.find((d: any) => d.cid === colId);
	if (!record) return;
	record[modalType].onEdit = !record[modalType].onEdit;
}

// 修改数据类型并检查
function typeChange(record: any) {
	record.initColDefine();
	record.initColSift();
	record.errors.typeErr = record.checkType();
	record.errors.haveError = record.errors?.maxErr?.size || record.errors?.minErr?.size || record.errors?.nnErr?.size || record.errors.typeErr;
}

// 生成错误信息
function errInfo(record: any) {
	if (!record.errors.haveError) return '未检查到错误';
	let res = ``;
	if (record.errors.typeErr) res += `不能定义为${record.type}类型`;
	if (record.errors?.maxErr?.size) {
		res += res.length ? ' / ID=' : 'ID=';
		record.errors.maxErr.forEach((d: any) => {
			res += `${d} `;
		});
		res += `大于最大值\n`;
	}
	if (record.errors?.minErr?.size) {
		res += res.length ? ' / ID=' : 'ID=';
		record.errors.minErr.forEach((d: any) => {
			res += `${d} `;
		});
		res += `小于最小值\n`;
	}
	if (record.errors?.nnErr?.size) {
		res += res.length ? ' / ID=' : 'ID=';
		record.errors.nnErr.forEach((d: any) => {
			res += `${d} `;
		});
		res += `存在空值`;
	}
	return res;
}
</script>

<script lang="ts">
export default {
	name: 'FieldDefine',
};
</script>

<style lang="less" scoped>
.title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 40px;
}
.table {
	max-height: calc(calc(100% - 40px));
	height: calc(calc(100% - 40px));
	overflow: auto;
}
</style>
