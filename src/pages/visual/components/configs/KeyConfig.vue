<!--
 * @Author: Merlin218
 * @Date: 2022-02-01 19:26:42
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 23:25:08
 * @Description: 字段配置
-->
<template>
	<a-form :model="fieldConfig">
		<a-form-item label="x轴字段">
			<a-select v-model:value="fieldConfig.xField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([fieldConfig.yField, fieldConfig.seriesField])"></a-select>
		</a-form-item>
		<a-form-item label="y轴字段">
			<a-select v-model:value="fieldConfig.yField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([fieldConfig.xField, fieldConfig.seriesField])"></a-select>
		</a-form-item>
		<a-form-item v-show="canSeries" label="分组字段">
			<a-select v-model:value="fieldConfig.seriesField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([fieldConfig.xField, fieldConfig.yField])"></a-select> </a-form-item
	></a-form>
</template>

<script setup lang="ts">
import { ComputedRef, computed, ref, watch } from 'vue';
import { useVisualStore } from '@/store/visual';
import { Mutable } from '@/types/common';
import { ChartOptionsType } from '@/types/visual/charts';

const store = useVisualStore();

const options: ComputedRef<ChartOptionsType> = computed(() => store.chartInstance.options);

const canSeries = computed(() => Object.keys(store.chartInstance.options.data[0]).length > 2);

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
 * @return {*}
 */
const getOptions = (filter?: (string | undefined)[]) => {
	let data = Object.keys(options.value.data[0]);
	if (typeof filter !== 'undefined') {
		filter.forEach(item => {
			if (item) {
				data = data.filter(x => x !== item);
			}
		});
	}
	return data.map(item => {
		return {
			value: item,
		};
	});
};
</script>

<style scoped></style>
