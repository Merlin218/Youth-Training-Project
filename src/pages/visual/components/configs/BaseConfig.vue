<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 15:10:51
 * @Description: 基本配置
-->
<template>
	<a-form>
		<a-form-item label="标题">
			<a-textarea v-model:value="store.chartTitle" placeholder="请输入标题"></a-textarea>
		</a-form-item>
		<a-form-item label="图表宽度">
			<a-input-number v-model:value.lazy="baseConfig.width"></a-input-number>
		</a-form-item>
		<a-form-item label="图表高度">
			<a-input-number v-model:value.lazy="baseConfig.height"></a-input-number>
		</a-form-item>
		<!-- 配置图表特有信息 -->
		<other-config></other-config>
		<a-collapse v-model:activeKey="activeKey" accordion>
			<a-collapse-panel key="key" header="数据字段"> <key-config></key-config></a-collapse-panel>
			<a-collapse-panel key="axis" header="坐标轴"> <axis-config></axis-config></a-collapse-panel>
			<a-collapse-panel key="legend" header="图例" :disabled="!hasSeriesField">
				<template #extra>
					<a-switch :checked="!!options?.legend && hasSeriesField" :disabled="!hasSeriesField" @change="handleLegendActive"></a-switch>
				</template>
				<legend-config></legend-config> </a-collapse-panel
		></a-collapse>
	</a-form>
</template>

<script lang="ts" setup>
import { computed, ComputedRef, ref, watch } from 'vue';
import { useVisualStore } from '@/store/visual';
import { ChartOptionsType } from '@/types/visual/charts';
import KeyConfig from './KeyConfig.vue';
import AxisConfig from './AxisConfig.vue';
import LegendConfig from './LegendConfig.vue';
import OtherConfig from './OtherConfig.vue';

const store = useVisualStore();

const options: ComputedRef<ChartOptionsType | undefined> = computed(() => store.chartInstance?.options);

const baseConfig = ref({
	width: 400,
	height: 300,
	autoFit: false,
	...options.value,
});

watch(
	() => [baseConfig.value.width, baseConfig.value.height],
	(value: number[]) => {
		store.update({ width: value[0], height: value[1] });
		store.changeSize(value[0], value[1]);
	}
);

const activeKey = ref<string>();

const hasSeriesField = computed(() => store.chartInstance?.options.seriesField !== '' && store.chartInstance?.options.seriesField !== undefined);

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
		activeKey.value = '';
	} else {
		store.update({
			legend: false,
		});
	}
};
</script>

<script lang="ts">
export default {
	name: 'BaseConfig',
};
</script>

<style></style>
