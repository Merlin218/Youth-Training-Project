<!--
 * @Author: Merlin218
 * @Date: 2022-02-01 19:46:49
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:41:51
 * @Description: 请填写简介
-->
<template>
	<a-form :model="xAxisConfig">
		<a-divider orientation="left">x坐标轴</a-divider>
		<a-form-item label="位置">
			<a-select v-model:value="xAxisConfig.position" :options="configOptions.position.map(item => ({ value: item.value, label: item.text }))"></a-select>
		</a-form-item>
		<a-form-item label="标题">
			<a-input v-model:value="xTitleConfig.text" placeholder="请输入x轴标题"></a-input>
		</a-form-item>
		<a-form-item label="标题位置">
			<a-radio-group v-model:value="xTitleConfig.position">
				<a-radio v-for="item in configOptions.titlePosition" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
			</a-radio-group>
		</a-form-item>
	</a-form>
	<a-divider orientation="left">y坐标轴</a-divider>
	<a-form :model="yAxisConfig">
		<a-form-item label="位置">
			<a-select v-model:value="yAxisConfig.position" :options="configOptions.position.map(item => ({ value: item.value, label: item.text }))"></a-select>
		</a-form-item>
		<a-form-item label="标题">
			<a-input v-model:value="yTitleConfig.text" placeholder="请输入y轴标题"></a-input>
		</a-form-item>
		<a-form-item label="标题位置">
			<a-radio-group v-model:value="yTitleConfig.position">
				<a-radio v-for="item in configOptions.titlePosition" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
			</a-radio-group>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
import { Axis } from '@antv/g2plot';
import { ref, watch, computed } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const xAxis = computed(() => store.chartInstance?.options.xAxis);
const yAxis = computed(() => store.chartInstance?.options.yAxis);

/**
 * @description: x坐标轴标题配置
 */
const xTitleConfig = ref({
	text: '',
	position: 'start',
});

/**
 * @description: y坐标轴标题配置
 */
const yTitleConfig = ref({
	text: '',
	position: 'start',
});

/**
 * @description: x坐标轴位置
 */
const xAxisConfig = ref<Exclude<Axis, false>>({
	position: 'bottom',
	...xAxis.value,
});

/**
 * @description: y坐标轴位置
 */
const yAxisConfig = ref<Exclude<Axis, false>>({
	position: 'left',
	...yAxis.value,
});

/**
 * @description:配置选项
 */
const configOptions = ref<{
	[key: string]: { value: any; text: string }[];
}>({
	position: [
		{ value: 'top', text: '上方' },
		{ value: 'left', text: '左边' },
		{ value: 'right', text: '右边' },
		{ value: 'bottom', text: '底部' },
	],
	titlePosition: [
		{ value: 'start', text: '靠前' },
		{ value: 'center', text: '居中' },
		{ value: 'end', text: '靠后' },
	],
});

watch(
	() => [xAxisConfig.value, xTitleConfig.value],
	(value: any[]) => {
		store.update({ xAxis: { ...value[0], title: value[1] } });
	},
	{ deep: true }
);

watch(
	() => [yAxisConfig.value, yTitleConfig.value],
	(value: any[]) => {
		store.update({ yAxis: { ...value[0], title: value[1] } });
	},
	{ deep: true }
);
</script>

<script lang="ts">
export default {
	name: 'AxisConfig',
};
</script>

<style scoped>
:deep(.ant-divider-horizontal) {
	margin-top: 0;
}
</style>
