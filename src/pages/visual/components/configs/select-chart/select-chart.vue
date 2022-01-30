<template>
	<span
		>图表类型：
		<span>{{ componentText || '未选择' }}</span>
	</span>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ComponentName } from '@/types/visual/g2PlotComponent';
import { componentInfo } from '@/configs/visual';

const props = withDefaults(defineProps<{ componentName: ComponentName }>(), {
	componentName: 'AreaChart',
});

const componentText = computed(() => {
	const component = componentInfo.find(item => item.name === props.componentName);
	return component?.text;
});
</script>
<style scoped></style>
