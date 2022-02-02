<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:43:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-02 01:53:00
 * @Description: 请填写简介
-->
<template>
	<div class="root">
		<div class="title">{{ chartTitle }}</div>
		<div :id="id"></div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { getChartInstance } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
// 从props中获取类名
const props = withDefaults(
	defineProps<{
		id?: string;
		name?: ChartNameType;
		title?: string;
		options?: any;
		useStore?: boolean;
	}>(),
	{
		id: Date.now().toString(),
		options: {},
		name: 'Area',
		title: '',
		useStore: false,
	}
);

const chartTitle = computed(() => (props.useStore ? store.chartTitle : props.title || ''));

const initChart = () => {
	if (store.chartInstance) {
		store.destroy();
	}
	// 从配置文件中拿到对应的实例
	const instance = getChartInstance(props.name, props.id, props.options);
	if (props.useStore) {
		store.bindChartToStore({ instance, title: props.title, name: props.name });
		store.render();
	} else {
		instance.render();
	}
};

watch(
	() => props.name,
	() => {
		initChart();
	}
);

onMounted(() => {
	initChart();
});
</script>

<style scoped>
.root {
	font-size: 14px;
}
.title {
	text-align: center;
	margin: 10px 0;
	font-size: 1.4em;
}
</style>
