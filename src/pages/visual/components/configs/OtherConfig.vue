<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:43:27
 * @Description: 请填写简介
-->
<template>
	<keep-alive>
		<line-config v-if="componentName === 'Line'"></line-config>
	</keep-alive>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVisualStore } from '@/store/visual';
import LineConfig from './charts/LineConfig.vue';

const store = useVisualStore();
// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${store.userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// );

const componentName = computed(() => store.chartType);
</script>

<script lang="ts">
export default {
	name: 'OtherConfig',
};
</script>

<style scoped></style>
