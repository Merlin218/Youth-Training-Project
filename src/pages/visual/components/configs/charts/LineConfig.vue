<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:43:20
 * @Description: 折线图配置
-->
<template>
	<a-form :model="updateConfig">
		<a-form-item label="曲线平滑">
			<a-switch v-model:checked="updateConfig.smooth"></a-switch>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref, watch } from 'vue';
import { LineOptions } from '@antv/g2plot';
import { useVisualStore } from '@/store/visual';
import { Mutable } from '@/types/common';

const store = useVisualStore();

const options: ComputedRef<LineOptions | undefined> = computed(() => store.chartInstance?.options);

const updateConfig = ref<Mutable<Partial<LineOptions>>>({
	smooth: options.value?.smooth,
});

watch(
	() => updateConfig.value,
	value => {
		store.update({ ...options.value, ...value });
	},
	{ deep: true }
);
</script>

<script lang="ts">
export default {
	name: 'LineConfig',
};
</script>
<style></style>
