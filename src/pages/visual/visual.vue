<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:11
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-02 11:59:25
 * @Description: 可视化页面
-->
<template>
	<!-- 选择图表类型 -->
	<select-chart v-show="!isSelected" v-model:chart-name="chartName" @handle-select="handleSelect"></select-chart>
	<div v-if="isSelected" class="container__top">
		<div style="width: 90%">
			<a-divider class="text" orientation="left">请配置您的图表</a-divider>
		</div>
		<a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="handleBack">
			<template #title>
				<p>改变图表类型将会导致您的配置丢失，是否确认返回？</p>
			</template>
			<a-button type="primary">返回</a-button>
		</a-popconfirm>
	</div>
	<div v-show="isSelected" class="container">
		<div :style="{ width: '70%' }">
			<chart-display id="chart" :use-store="true" :name="chartName" :options="chartOptions"></chart-display>
		</div>
		<div v-if="isSelected" :style="{ width: '25%', position: 'relative' }">
			<a-collapse v-model:activeKey="stepActive" accordion @change="stepActive = $event">
				<a-collapse-panel v-for="step in stepConfig" :key="step.key" :header="step.header">
					<!-- 配置基本信息 -->
					<base-config v-if="step.key === '1'"></base-config>
					<!-- 配置图表特有信息 -->
					<charts-config v-else-if="step.key === '2'"></charts-config>
					<!-- 标记配置 -->
					<annotation-config v-else-if="step.key === '3'"></annotation-config>
				</a-collapse-panel>
			</a-collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ChartNameType, ChartOptionsType } from '@/types/visual/charts';
import { data1 } from '@/data';

// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// )

const chartName = ref<ChartNameType>('Area');

const chartOptions = ref<ChartOptionsType>({
	width: 600,
	height: 500,
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
		header: '配置基本信息',
	},
	{
		key: '2',
		header: '配置图表信息',
	},
	{
		key: '3',
		header: '配置图表标记',
	},
]);

const isSelected = ref<boolean>(false);

const handleSelect = () => {
	isSelected.value = true;
	stepActive.value = '1';
};

const handleBack = () => {
	isSelected.value = false;
};
</script>

<style scoped>
.container__top {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: center;
	justify-content: space-around;
}
.container {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-around;
}

:deep(.ant-collapse-content-active) {
	overflow: unset;
}

:deep(.ant-form-item-control-input-content) {
	display: flex;
	align-items: center;
}

.display___none {
	display: none;
}
</style>
