<template>
	<a-modal v-model:visible="recordData.onEdit" :title="title">
		<template v-if="modalType === 'dataDef'" #footer>
			<a-button key="reset" @click="initDef">重置</a-button>
			<a-button key="back" type="primary" @click="checkDef">确定</a-button>
		</template>
		<template v-else #footer>
			<a-button key="reset" @click="initSift">重置</a-button>
			<a-button key="back" type="primary" @click="toSift">确定</a-button>
		</template>
		<a-form v-if="modalType === 'dataDef'" :model="recordData" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-item label="最大值">
				<a-input v-model:value="recordData.max" :disabled="!isCompareable" @change="defFlag" />
			</a-form-item>
			<a-form-item label="最小值">
				<a-input v-model:value="recordData.min" :disabled="!isCompareable" @change="defFlag" />
			</a-form-item>
			<a-form-item label="非空">
				<a-switch v-model:checked="recordData.nn" @change="defFlag" />
			</a-form-item>
		</a-form>
		<a-form v-else :model="recordData" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-form-item label="最大值">
				<a-input v-model:value="recordData.max" :disabled="!isCompareable" @change="defSift" />
			</a-form-item>
			<a-form-item label="最小值">
				<a-input v-model:value="recordData.min" :disabled="!isCompareable" @change="defSift" />
			</a-form-item>
			<a-form-item label="前百分之(%)">
				<a-input v-model:value="recordData.top" :disabled="!isCompareable" @change="defSift" />
			</a-form-item>
			<a-form-item label="后百分之(%)">
				<a-input v-model:value="recordData.last" :disabled="!isCompareable" @change="defSift" />
			</a-form-item>
			<a-form-item label="非空">
				<a-switch v-model:checked="recordData.nn" @change="defSift" />
			</a-form-item>
		</a-form>
	</a-modal>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useTableStore } from '../../../store/process';

const props = defineProps({
	colId: { type: Number, required: true },
	modalType: { type: String, required: true },
});
const store = useTableStore();
const { table } = store;

// 模态框类型
// eslint-disable-next-line
const { modalType } = props;
// 字段对象
const recordCol = table.cols.find(d => d.cid === props.colId) || null;
// 字段筛选与定义状态
const recordData = recordCol ? recordCol[modalType] : null;
// 模态框标题
const title = computed(() => (modalType === 'dataDef' ? '定义您的数据' : '筛选您的数据'));
// 字段是否是可比较属性(如果不可比较仅支持非空定义与筛选)
const isCompareable = computed(() => (recordCol ? recordCol.compareable : null));
// 初始化数据定义状态
function initDef() {
	recordCol?.initColDefine();
}
// 初始化数据筛选状态
function initSift() {
	recordCol?.initColSift();
}
// 检查用户的定义是否合法
function checkDef() {
	recordCol?.checkColDefine();
	if (recordCol) recordCol.dataDef.onEdit = false;
}
// 打开数据筛选框
function toSift() {
	if (recordCol) recordCol.dataSift.onEdit = false;
}
// 标记定义状态被修改
function defFlag() {
	if (recordCol) recordCol.dataDef.defed = true;
}
// 标记筛选状态被修改
function defSift() {
	if (recordCol) recordCol.dataSift.defed = true;
}
</script>

<script lang="ts">
export default {
	name: 'FieldSift',
};
</script>
