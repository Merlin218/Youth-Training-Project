<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 13:27:12
 * @Description: 请填写简介
-->
<template>
	<div>
		<text-annotation-config :id="selectId"></text-annotation-config>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const selectId = ref<string>('');

onMounted(() => {
	store.on('annotation:click', (e: any) => {
		selectId.value = '';
		selectId.value = e.gEvent.delegateObject.annotation.cfg.id;
	});
});
</script>

<style scoped></style>
