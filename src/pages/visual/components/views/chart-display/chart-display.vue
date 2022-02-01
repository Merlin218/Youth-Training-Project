<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:43:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 14:07:46
 * @Description: 请填写简介
-->
<template>
	<div class="root">
		<div class="title">{{ chartTitle }}</div>
		<div :id="id"></div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { getChartInstance } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
// 从props中获取类名
const props = withDefaults(
	defineProps<{
		id?: string;
		name: ChartNameType;
		title?: string;
		options?: any;
		useStore?: boolean;
	}>(),
	{
		id: 'container',
		options: {},
		title: '',
		useStore: false,
	}
);

const chartTitle = computed(() => (props.useStore ? store.chartTitle : props.title || ''));

onMounted(() => {
	// 从配置文件中拿到对应的实例
	const instance = getChartInstance(props.name, props.id, props.options);
	if (props.useStore) {
		store.bindChartToStore({ instance, title: props.title || '', name: props.name });
	}
	instance.render();
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
