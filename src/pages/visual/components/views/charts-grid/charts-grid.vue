<template>
	<div class="component__grid">
		<div v-for="(component, index) in componentList" :key="component.name" :class="activeIdx === index ? 'component__item active' : 'component__item'" @click="changeActiveIdx(index, component.name)">
			<chart-display :id="component.name" :name="component.name" :options="options"></chart-display>
			<p class="component__text">{{ component.text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { G2PlotChartConfig } from '@/configs/visual';
import { useVisualStore } from '@/store/visual';
import { ChartNameType } from '@/types/visual/charts';

const store = useVisualStore();
const componentList = ref(
	Object.keys(G2PlotChartConfig).map((item: ChartNameType) => {
		return {
			name: item,
			...G2PlotChartConfig[item],
		};
	})
);

const activeIdx = computed(() => componentList.value.findIndex(item => item.name === store.chartName));
const changeActiveIdx = (index: number, name: ChartNameType) => {
	store.chartName = name;
};

const options = ref({
	width: 200,
	height: 150,
	autoFit: false,
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
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 10px;
	grid-column-gap: 10px;
	justify-items: center;
	align-items: center;
}

.component__item.active {
	border: 2px solid black;
}
.component__text {
	text-align: center;
	margin: 10px 0;
}
</style>
