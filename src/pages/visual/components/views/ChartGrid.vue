<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 18:31:24
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-06 12:28:30
 * @Description: 图表矩阵
-->
<template>
	<div class="component__grid">
		<div v-for="(component, index) in componentList" :key="index" :class="activeIdx === index ? 'component__item active' : 'component__item'" @click="changeActiveIdx(index)">
			<chart-display :id="index" :url="false" :name="index" :options="displayOptions" :water-mark-options="false" :use-store="false"></chart-display>
			<p class="component__text">{{ component.text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';

const emit = defineEmits(['update:name']);
const props = defineProps<{
	name: ChartNameType;
}>();

const componentList = ref(G2PlotChartConfig);

const chartName = ref<ChartNameType>(props.name || 'Area');

const activeIdx = ref<ChartNameType>(chartName.value);
const changeActiveIdx = (name: ChartNameType) => {
	activeIdx.value = name;
	emit('update:name', name);
};

const displayOptions = ref({
	width: 300,
	height: 200,
	autoFit: false,
	angleField: 'value',
	colorField: 'year',
	xField: 'year',
	yField: 'value',
	tooltip: {
		showContent: false,
	},
	smooth: true,
	meta: {
		value: {
			max: 15,
		},
	},
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
</script>

<style scoped>
.component__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
	grid-row-gap: 10px;
	grid-column-gap: 10px;
	justify-items: center;
	align-items: center;
}

.component__item {
	padding: 20px;
	border: 2px solid rgba(0, 106, 198, 0);
	box-sizing: border-box;
	border: none;
	border-radius: 20px;
	transition: box-shadow 0.3s;
}
.component__text {
	text-align: center;
	margin-top: 20px;
	margin-bottom: 0;
}
.active {
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}
</style>
