<!--
 * @Author: Merlin218
 * @Date: 2022-02-01 18:19:42
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:42:35
 * @Description: 图例配置
-->
<template>
	<a-form :model="legendConfig">
		<a-form-item label="图例位置">
			<a-select v-model:value="legendConfig.position" :options="configOptions.position.map(item => ({ value: item.value, label: item.text }))"></a-select>
		</a-form-item>
		<a-form-item label="图例方向">
			<a-radio-group v-model:value="legendConfig.layout">
				<a-radio v-for="item in configOptions.layout" :key="item.value" :value="item.value">{{ item.text }}</a-radio>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="是否分页">
			<a-switch v-model:checked="legendConfig.flipPage" style="margin-right: 10px"></a-switch>
			<div v-show="legendConfig.flipPage && legendConfig.layout === 'horizontal'">每页 <a-input-number v-model:value="legendConfig.maxRow" :min="1" :max="8"></a-input-number> 行</div>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
import { Legend } from '@antv/g2plot/lib/types/legend';
import { computed, ref, watch } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const options = computed(() => store.chartInstance?.options);

const legendConfig = ref<Exclude<Legend, false>>({
	position: 'top',
	offsetX: 0,
	offsetY: 0,
	flipPage: false,
	layout: 'horizontal',
	maxRow: '1',
	...(options.value ? options.value.legend : {}),
});

watch(
	() => legendConfig.value,
	value => {
		store.update({ ...options.value, legend: { ...value } });
	},
	{ deep: true }
);

const configOptions = ref<{
	[key: string]: { value: any; text: string }[];
}>({
	position: [
		{ value: 'top', text: '上方' },
		{ value: 'top-left', text: '上偏左' },
		{ value: 'top-right', text: '上偏右' },
		{ value: 'left', text: '左边' },
		{ value: 'left-top', text: '左偏上' },
		{ value: 'left-bottom', text: '左偏下' },
		{ value: 'right', text: '右边' },
		{ value: 'right-top', text: '右偏上' },
		{ value: 'right-bottom', text: '右偏下' },
		{ value: 'bottom', text: '底部' },
		{ value: 'bottom-left', text: '底偏左' },
		{ value: 'bottom-right', text: '底偏右' },
	],
	layout: [
		{ value: 'horizontal', text: '水平' },
		{ value: 'vertical', text: '垂直' },
	],
});
</script>

<script lang="ts">
export default {
	name: 'LegendConfig',
};
</script>

<style scoped></style>
