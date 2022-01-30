<template>
	<keep-alive>
		<line-chart-config v-if="componentName === 'Line'"></line-chart-config>
	</keep-alive>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${store.userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// );

const componentName = computed(() => store.chartName);
</script>

<style scoped></style>
