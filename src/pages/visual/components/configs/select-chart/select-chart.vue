<template>
	<span
		>图表类型：
		<span>{{ componentText || '未选择' }}</span>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';

const props = withDefaults(defineProps<{ componentName: ChartNameType }>(), {
	componentName: 'Line',
});

const componentText = computed(() => G2PlotChartConfig[props.componentName].text);
</script>
<style scoped></style>
