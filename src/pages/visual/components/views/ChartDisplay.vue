<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:43:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-06 12:38:06
 * @Description: 图表展示
-->
<template>
	<div class="root">
		<water-mark v-if="!!props.url" class="water__marker" :url="props.url"></water-mark>
		<div class="title">{{ title }}</div>
		<div :id="id"></div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { G2PlotChartConfig, getChartInstance } from '@/configs/visual';
import { ChartNameType, ChartOptionsType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

// 从props中获取类名
const props = withDefaults(
	defineProps<{
		id: string; // 图表id
		name: ChartNameType; // 图标组件名称
		title?: string; // 图表标题
		url: string | false;
		options?: ChartOptionsType; // 图表配置
		useStore?: boolean; // 是否将实例绑定到store
	}>(),
	{
		id: Date.now().toString(),
		title: '',
		name: 'Area',
		useStore: false,
		options: G2PlotChartConfig.Area.defaultOptions,
	}
);

const initChart = () => {
	if (props.useStore && store.chartInstance) {
		store.destroy();
	}
	const instance = getChartInstance(props.name, props.id, props.options);
	if (props.useStore) {
		store.bindChartToStore(instance);
	}
	instance.render();
};

onMounted(() => {
	initChart();
});
</script>

<style scoped>
.root {
	font-size: 14px;
	position: relative;
}
.title {
	text-align: center;
	margin: 10px 0;
	font-size: 1.4em;
	white-space: pre-line;
}

.water__marker {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
