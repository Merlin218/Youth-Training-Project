<template>
	<div class="tableWapper">
		<vxe-table height="100%" class="mytable-style" :edit-config="{ trigger: 'click', mode: 'cell' }" :data="mappedTable" :cell-style="cellStyle">
			<vxe-column :key="-1" field="rowId" title="ID"> </vxe-column>
			<vxe-column v-for="item in table.cols.filter(d => !d.computed)" :key="item.cid" :field="item.cKey" :title="item.cname" :edit-render="{ autofocus: '.vxe-input--inner' }">
				<template #edit="{ row }">
					<vxe-input v-model.lazy="row[item.cKey]" @blur="reCheck(item)"></vxe-input>
				</template>
			</vxe-column>
			<vxe-column v-for="item in table.cols.filter(d => d.computed)" :key="item.cid" :field="item.cKey" :title="item.cname"> </vxe-column>
		</vxe-table>
	</div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useTableStore } from '../../../store/process';

const store = useTableStore();
const { table } = store;

/**
 *
 * @description 表格内容修改后检查字段类型是否合法,
 * **** 若不合法则清空数据定义, 数据筛选
 * **** 若合法则判断数据定义与筛选是否被定义, 若被定义则不修改, 若未定义则重新计算数据定义与筛选默认值
 * @param record Table的列
 */
function reCheck(record: any) {
	record.errors.typeErr = record.checkType();
	if (record.dataDef.defed) record.checkColDefine();
	else record.initColDefine();
	if (!record.dataSift.defed) record.initColSift();
	record.errors.haveError = record.errors.haveError || record.errors.typeErr;
	table.refreshComputedTable();
}

/**
 * @description 筛选后的表格数据
 */
const mappedTable = computed(() => {
	return table.mappedTable();
});

/**
 * @description 非法属性标红
 * @param param0 {行对象, 行号, 列对象, 列号}
 */
function cellStyle({ row, rowIndex, column, columnIndex }: any) {
	const col = table.cols.find(d => column.field === d.cKey);
	if (col?.errors?.haveError && (col.errors.maxErr.has(row.rowId) || col.errors.minErr.has(row.rowId) || col.errors.nnErr.has(row.rowId)))
		return {
			backgroundColor: '#FF6A6A',
			color: '#fff',
		};
	return {};
}
</script>

<script lang="ts">
export default {
	name: 'TableEditor',
};
</script>

<style lang="less" scoped>
:deep(.vxe-input--inner) {
	background-color: inherit !important;
	color: inherit !important;
}

.tableWapper {
	height: 100%;
	width: 100%;
}
</style>
