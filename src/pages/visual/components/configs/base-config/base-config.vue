<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 19:42:42
 * @Description: 基本配置
-->
<template>
	<a-form>
		<a-form-item label="标题">
			<a-input v-model:value="store.chartTitle" placeholder="请输入标题"></a-input>
		</a-form-item>
		<a-collapse v-model:activeKey="activeKey">
			<a-collapse-panel key="key" header="字段配置"> <key-config></key-config></a-collapse-panel>
			<a-collapse-panel key="legend" header="图例配置" :disabled="!options.legend">
				<template #extra>
					<a-switch :checked="!!options.legend" @change="handleLegendActive"></a-switch>
				</template>
				<legend-config></legend-config> </a-collapse-panel
		></a-collapse>
	</a-form>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref } from 'vue';
import { useVisualStore } from '@/store/visual';
import { ChartOptionsType } from '@/types/visual/charts';

const store = useVisualStore();

const options: ComputedRef<ChartOptionsType> = computed(() => store.chartInstance.options);

const activeKey = ref<string>('');

/**
 * @description:
 * @param {*} checked 是否激活Legend
 * @return {*}
 */
const handleLegendActive = (checked: any) => {
	if (checked) {
		store.update({
			legend: {
				position: 'top',
				offsetX: 0,
				offsetY: 0,
				flipPage: false,
				layout: 'horizontal',
				maxRow: '1',
			},
		});
	} else {
		store.update({
			legend: false,
		});
		activeKey.value = '';
	}
};
</script>

<style></style>
