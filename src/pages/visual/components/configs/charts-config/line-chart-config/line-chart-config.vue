<template>
	<a-form :model="store.userConfiguration.componentProps">
		<a-form-item label="曲线平滑">
			<a-switch v-model:checked="config.smooth"></a-switch>
		</a-form-item>
		<a-form-item label="镜像反转">
			<a-radio-group v-model:value="config.reflect">
				<a-radio v-for="item in options.reflect" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
			</a-radio-group>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { LineChartProps } from '@opd/g2plot-vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const options = ref<{ [key: string]: any[] }>({
	reflect: [
		{ value: undefined, text: '不反转' },
		{ value: 'x', text: 'x轴' },
		{ value: 'y', text: 'y轴' },
		{ value: ['x', 'y'], text: '同时反转' },
	] as { value: string | string[] | undefined; text: string }[],
});

const config: LineChartProps = store.userConfiguration.componentProps;
</script>

<style></style>
