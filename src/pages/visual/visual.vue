<template>
	<div class="container">
		<div style="width: 33%">
			<a-collapse v-model:value="stepActive" accordion @change="handleStepChange">
				<a-collapse-panel v-for="step in stepConfig" :key="step.key" :header="step.header">
					<!-- 选择图表类型 -->
					<select-chart v-show="step.key === '1'" :component-name="store.chartName"></select-chart>
					<!-- 配置基本信息 -->
					<base-config v-show="step.key === '2'"></base-config>
					<!-- 配置图标特有信息 -->
					<charts-config v-show="step.key === '3'"></charts-config>
					<!-- 标记配置 -->
					<annotation-config v-show="step.key === '4'"></annotation-config>
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
import { ref } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// )

const stepActive = ref('0');

const handleStepChange = (key: string) => {
	stepActive.value = key;
};

const chartOptions = ref<any>({
	width: 600,
	height: 350,
	autoFit: true,
	xField: 'city',
	yField: 'value',
	seriesField: 'type',
	isGroup: 'true',
	legend: {
		selected: {
			// 默认置灰
			茶叶: false,
		},
	},
	data: [
		{
			city: '石家庄',
			type: '水果',
			value: 14500,
		},
		{
			city: '石家庄',
			type: '米面',
			value: 8500,
		},
		{
			city: '石家庄',
			type: '特产零食',
			value: 10000,
		},
		{
			city: '石家庄',
			type: '茶叶',
			value: 7000,
		},
		{
			city: '深圳',
			type: '水果',
			value: 9000,
		},
		{
			city: '深圳',
			type: '米面',
			value: 8500,
		},
		{
			city: '深圳',
			type: '特产零食',
			value: 11000,
		},
		{
			city: '深圳',
			type: '茶叶',
			value: 6000,
		},
		{
			city: '温州',
			type: '水果',
			value: 16000,
		},
		{
			city: '温州',
			type: '米面',
			value: 5000,
		},
		{
			city: '温州',
			type: '特产零食',
			value: 6000,
		},
		{
			city: '温州',
			type: '茶叶',
			value: 10000,
		},
		{
			city: '宁波',
			type: '水果',
			value: 14000,
		},
		{
			city: '宁波',
			type: '米面',
			value: 9000,
		},
		{
			city: '宁波',
			type: '特产零食',
			value: 10000,
		},
		{
			city: '宁波',
			type: '茶叶',
			value: 9000,
		},
		{
			city: '无锡',
			type: '水果',
			value: 14000,
		},
		{
			city: '无锡',
			type: '米面',
			value: 9000,
		},
		{
			city: '无锡',
			type: '特产零食',
			value: 10000,
		},
		{
			city: '无锡',
			type: '茶叶',
			value: 6000,
		},
		{
			city: '杭州',
			type: '水果',
			value: 9000,
		},
		{
			city: '杭州',
			type: '米面',
			value: 8500,
		},
		{
			city: '杭州',
			type: '特产零食',
			value: 10000,
		},
		{
			city: '杭州',
			type: '茶叶',
			value: 6000,
		},
		{
			city: '北京',
			type: '水果',
			value: 17000,
		},
		{
			city: '北京',
			type: '米面',
			value: 6000,
		},
		{
			city: '北京',
			type: '特产零食',
			value: 7000,
		},
		{
			city: '北京',
			type: '茶叶',
			value: 10000,
		},
		{
			city: '上海',
			type: '水果',
			value: 18000,
		},
		{
			city: '上海',
			type: '米面',
			value: 11000,
		},
		{
			city: '上海',
			type: '特产零食',
			value: 15000,
		},
		{
			city: '上海',
			type: '茶叶',
			value: 14000,
		},
	],
});

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
</script>

<style scoped>
.container {
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-between;
}

::v-deep .ant-collapse-content-active {
	overflow: unset;
}
</style>
