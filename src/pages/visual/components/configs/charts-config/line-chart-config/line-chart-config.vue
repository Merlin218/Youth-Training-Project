<template>
	<a-form :model="store.chartOptions">
		<a-form-item label="曲线平滑">
			<a-switch :checked="config?.smooth" @change="changeSmooth"></a-switch>
		</a-form-item>
		<a-form-item label="镜像反转">
			<a-radio-group :value="config?.reflect">
				<a-radio v-for="item in configOptions.reflect" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
			</a-radio-group>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref } from 'vue';
import { LineOptions } from '@antv/g2plot';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const config: ComputedRef<LineOptions | undefined> = computed(() => store.chartInstance?.options);

const configOptions = ref<{ [key: string]: any[] }>({
	reflect: [
		{ value: undefined, text: '不反转' },
		{ value: 'x', text: 'x轴' },
		{ value: 'y', text: 'y轴' },
		{ value: ['x', 'y'], text: '同时反转' },
	] as { value: string | string[] | undefined; text: string }[],
});

const changeSmooth = (e: any) => {
	store.chartInstance?.update({
		smooth: e,
	});
};
</script>

<style></style>
