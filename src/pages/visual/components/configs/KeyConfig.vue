<!--
 * @Author: Merlin218
 * @Date: 2022-02-01 19:26:42
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 12:40:04
 * @Description: 字段配置
-->
<template>
	<a-form :model="fieldConfig">
		<a-form-item label="x轴字段">
			<a-select v-model:value="fieldConfig.xField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([fieldConfig.yField, fieldConfig.seriesField, 'rowId'])"></a-select>
		</a-form-item>
		<a-form-item label="y轴字段">
			<a-select v-model:value="fieldConfig.yField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([fieldConfig.xField, fieldConfig.seriesField, 'rowId'])"></a-select>
		</a-form-item>
		<a-form-item v-show="canSeries" label="分组字段">
			<a-select
				v-model:value="fieldConfig.seriesField"
				placeholder="请选择字段"
				:allow-clear="true"
				:options="getOptions([fieldConfig.xField, fieldConfig.yField, 'rowId'], 'string')"
			></a-select> </a-form-item
	></a-form>
</template>

<script setup lang="ts">
import { ComputedRef, computed, ref, watch } from 'vue';
import { useVisualStore } from '@/store/visual';
import { Mutable } from '@/types/common';
import { ChartOptionsType } from '@/types/visual/charts';
// import { sortKeys } from '@/utils/preprocess';

const store = useVisualStore();

const options: ComputedRef<ChartOptionsType | undefined> = computed(() => store.chartInstance?.options);

// eslint-disable-next-line no-nested-ternary
const canSeries = computed(() => (options.value ? (options.value.data.length > 0 ? Object.keys(options.value.data[0]).length > 2 : false) : false));

const fieldConfig = ref<Mutable<Partial<ChartOptionsType>>>({
	xField: '',
	yField: '',
	seriesField: '',
	...options.value,
});

watch(
	() => fieldConfig.value,
	value => {
		store.update({ ...value });
	},
	{ deep: true }
);

/**
 * @description: 过滤获取select的options
 * @param {*} filter 过滤项
 * @param {*} such 保留指定类型的示例值，例如保留string类型的key，则传任意一个字符串即可，用于typeof判断
 * @return {*}
 */
const getOptions = (filter?: (string | undefined)[], such?: any) => {
	if (!options.value?.data[0]) return [];
	let data = Object.keys(options.value.data[0]);
	if (typeof filter !== 'undefined') {
		filter.forEach(item => {
			if (item) {
				data = data.filter(x => x !== item);
			}
		});
	}
	if (typeof such !== 'undefined') {
		data = data.filter(x => typeof options.value?.data[0][x] === typeof such);
	}
	return data.map(item => {
		return {
			value: item,
		};
	});
};
// watch(
// 	() => fieldConfig.value.xField,
// 	v => {
// 		sortKeys(store.tableData, v);
// 		console.log(store.tableData)
// 	}
// );
</script>

<script lang="ts">
export default {
	name: 'KeyConfig',
};
</script>

<style scoped></style>
