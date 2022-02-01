<!--
 * @Author: Merlin218
 * @Date: 2022-02-01 19:26:42
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 19:33:52
 * @Description: 字段配置
-->
<template>
	<a-form :model="updateConfig">
		<a-form-item label="x轴字段">
			<a-select v-model:value="updateConfig.xField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([updateConfig.yField, updateConfig.seriesField])"></a-select>
		</a-form-item>
		<a-form-item label="y轴字段">
			<a-select v-model:value="updateConfig.yField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([updateConfig.xField, updateConfig.seriesField])"></a-select>
		</a-form-item>
		<a-form-item v-show="canSeries" label="分组字段">
			<a-select v-model:value="updateConfig.seriesField" placeholder="请选择字段" :allow-clear="true" :options="getOptions([updateConfig.xField, updateConfig.yField])"></a-select> </a-form-item
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

const updateConfig = ref<Mutable<Partial<ChartOptionsType>>>({
	xField: options.value.xField,
	yField: options.value.yField,
	seriesField: options.value.seriesField,
	...options.value,
});

watch(
	() => updateConfig.value,
	value => {
		store.update({ ...options.value, ...value });
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
