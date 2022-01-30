<template>
	<div class="container">
		<div style="width: 33%">
			<a-collapse :value="stepActive" accordion @change="handleStepChange">
				<a-collapse-panel v-for="step in stepConfig" :key="step.key" :header="step.header">
					<!-- 选择图表类型 -->
					<select-chart v-show="step.key === '1'" :component-name="store.chartName"></select-chart>
					<!-- 配置基本信息 -->
					<base-config v-show="step.key === '2'"></base-config>
					<!-- 配置图标特有信息 -->
					<charts-config v-show="step.key === '3'"></charts-config>
					<!-- 标记配置 -->
					<!-- <annotation-config v-show="step.key === '4'"></annotation-config> -->
				</a-collapse-panel>
			</a-collapse>
		</div>
		<div style="width: 63%">
			<charts-grid v-if="stepActive === '1'"></charts-grid>
			<chart-display v-if="stepActive !== '1'" :use-store="true" :name="store.chartName" :options="chartOptions" :monitor="true"></chart-display>
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

const stepActive = ref('1');

const handleStepChange = (key: string) => {
	stepActive.value = key;
};

const chartOptions = ref<any>({
	width: 400,
	height: 350,
	autoFit: false,
	xField: 'year',
	yField: 'value',
	smooth: true,
	meta: {
		value: {
			max: 15,
		},
	},
	annotations: [
		{
			type: 'text',
			offsetX: 0,
			offsetY: 0,
			position: ['1997', '7'],
			content: '辅助文本',
			style: {
				fill: 'red',
			},
		},
		{
			type: 'text',
			offsetX: 0,
			offsetY: 0,
			position: ['1997', '7'],
			content: '辅助文本',
			style: {
				fill: 'red',
			},
		},
	],
	data: [
		{ year: '1991', value: 3 },
		{ year: '1992', value: 4 },
		{ year: '1993', value: 3.5 },
		{ year: '1994', value: 5 },
		{ year: '1995', value: 4.9 },
		{ year: '1996', value: 6 },
		{ year: '1997', value: 7 },
		{ year: '1998', value: 9 },
		{ year: '1999', value: 11 },
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
</style>
