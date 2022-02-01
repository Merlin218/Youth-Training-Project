<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:11
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 22:42:37
 * @Description: 可视化页面
-->
<template>
	<div class="container">
		<div style="width: 33%">
			<a-collapse v-model:activeKey="stepActive" accordion @change="stepActive = $event">
				<a-collapse-panel v-for="step in stepConfig" :key="step.key" :header="step.header">
					<!-- 选择图表类型 -->
					<select-chart v-if="step.key === '1'" :component-name="store.chartName"></select-chart>
					<!-- 配置基本信息 -->
					<base-config v-else-if="step.key === '2'"></base-config>
					<!-- 配置图表特有信息 -->
					<charts-config v-else-if="step.key === '3'"></charts-config>
					<!-- 标记配置 -->
					<annotation-config v-else-if="step.key === '4'"></annotation-config>
				</a-collapse-panel>
			</a-collapse>
		</div>
		<div style="width: 63%">
			<charts-grid v-if="stepActive === '1'"></charts-grid>
			<chart-display v-else id="chart" :use-store="true" :name="store.chartName" :options="chartOptions"></chart-display>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useVisualStore } from '@/store/visual';
import { ChartOptionsType } from '@/types/visual/charts';
import { data1 } from '@/data';

const store = useVisualStore();

// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// )

const chartOptions = ref<ChartOptionsType>({
	width: 600,
	height: 350,
	autoFit: true,
	xField: 'product_box',
	yField: 'value',
	seriesField: 'province',
	data: data1,
	legend: {
		flipPage: true,
		// 两行分页
		maxRow: 2,
		pageNavigator: {
			marker: {
				style: {
					fill: 'rgba(0,0,0,0.65)',
				},
			},
		},
	},
});

const stepActive = ref('');
const stepConfig = ref([
	{
		key: '1',
		header: '选择图表类型',
	},
	{
		key: '2',
		header: '配置基本信息',
	},
	{
		key: '3',
		header: '配置图表信息',
	},
	{
		key: '4',
		header: '配置图表标记',
	},
]);

onMounted(() => {
	stepActive.value = '1';
});
</script>

<style scoped>
.container {
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-between;
}

:deep(.ant-collapse-content-active) {
	overflow: unset;
}

:deep(.ant-form-item-control-input-content) {
	display: flex;
	align-items: center;
}
</style>
