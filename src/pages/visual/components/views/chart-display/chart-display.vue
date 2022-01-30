<template>
	<div :id="id"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { getChartInstance } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
// 从props中获取类名
const props = withDefaults(
	defineProps<{
		id?: string;
		name: ChartNameType;
		options?: any;
		useStore?: boolean;
		monitor?: boolean;
	}>(),
	{
		id: 'container',
		name: 'Line',
		options: {},
		monitor: false,
		useStore: false,
	}
);

// const emit = defineEmits([]);

onMounted(() => {
	// 从配置文件中拿到对应的实例
	const instance = getChartInstance(props.name, props.id, props.options);
	if (props.useStore) {
		store.bindChartInstance(instance);
	}
	if (props.monitor) {
		instance.on('plot:click', (...args: any) => {
			console.log(...args);
		});
	}
	instance.render();
});
</script>

<style scoped></style>
