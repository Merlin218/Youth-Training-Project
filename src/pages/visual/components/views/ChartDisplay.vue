<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:43:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-07 19:40:46
 * @Description: 图表展示
-->
<template>
	<div v-if="initStatus" class="root">
		<water-mark v-if="!!props.url" class="water__marker" :url="props.url"></water-mark>
		<div class="title">{{ title }}</div>
		<div :id="id"></div>
	</div>
	<div v-else class="status__false">图表未定义</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
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
		url?: string | false;
		options?: ChartOptionsType; // 图表配置
		useStore?: boolean; // 是否将实例绑定到store
	}>(),
	{
		id: Date.now().toString(),
		title: '',
		name: 'Area',
		useStore: false,
		url: '',
		options: () => {
			return G2PlotChartConfig.Area.defaultOptions;
		},
	}
);

const initStatus = ref<boolean>(true);

/**
 * @description: 初始化图表
 */
const initChart = () => {
	if (!props.name || !props.id || !props.options) {
		initStatus.value = false;
		return;
	}
	// 如果store中存在实例，先摧毁实例
	if (props.useStore && store.chartInstance) {
		store.destroy();
	}
	// 新建实例
	const instance = getChartInstance(props.name, props.id, props.options);
	// 绑定实例
	if (props.useStore) {
		store.bindChartToStore(instance);
	}
	// 渲染实例
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

.status__false {
	display: flex;
	align-items: center;
	justify-content: center;
	color: rgba(0, 0, 0, 0.3);
	font-size: 30px;
}
</style>
