<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:40:24
 * @Description: 标注配置
-->
<template>
	<text-annotation-config :id="selectId"></text-annotation-config>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useVisualStore } from '@/store/visual';
import TextAnnotationConfig from './annotation/TextAnnotationConfig.vue';

const store = useVisualStore();

const selectId = ref<string>('');

onMounted(() => {
	store.on('annotation:click', (e: any) => {
		selectId.value = e.gEvent.delegateObject.annotation.cfg.id;
	});
});

onUnmounted(() => {
	store.off('annotation:click', () => {
		// console.log('取消监听')
	});
});
</script>

<script lang="ts">
export default {
	name: 'AnnotationConfig',
};
</script>

<style scoped></style>
