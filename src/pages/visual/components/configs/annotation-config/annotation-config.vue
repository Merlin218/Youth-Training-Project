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
		selectId.value = e.gEvent.delegateObject.annotation.cfg.id;
	});
	store.on('annotation:dblclick', (e: any) => {
		const { id } = e.gEvent.delegateObject.annotation.cfg;
		store.removeAnnotations([
			{
				id,
			},
		]);
	});
});
</script>

<style scoped></style>
