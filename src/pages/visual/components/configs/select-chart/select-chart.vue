<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-02 11:58:43
 * @Description: 请填写简介
-->
<template>
	<div style="position: relative; min-height: 660px">
		<a-divider class="text" orientation="left">请选择您需要的类型</a-divider>
		<!-- 图表矩阵 -->
		<div class="component__grid">
			<div v-for="(component, index) in componentList" :key="index" :class="activeIdx === index ? 'component__item active' : 'component__item'" @click="changeActiveIdx(index)">
				<chart-display :id="index" :name="index" :options="options"></chart-display>
				<p class="component__text">{{ component.text }}</p>
			</div>
		</div>
		<a-button class="btn" type="primary" :disabled="!componentText" @click="$emit('handleSelect')">已选择：{{ componentText || '未选择' }} </a-button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';

const emit = defineEmits(['handleSelect', 'update:chartName']);
const props = defineProps<{
	chartName: ChartNameType;
}>();
const componentText = computed(() => G2PlotChartConfig[props.chartName].text);

const componentList = ref(G2PlotChartConfig);

const activeIdx = ref<ChartNameType>('Area');
const changeActiveIdx = (name: ChartNameType) => {
	activeIdx.value = name;
	emit('update:chartName', name);
};

const options = ref({
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
.text {
	font-size: 20px;
	padding-left: 30px;
	margin-bottom: 40px;
}
.btn {
	position: absolute;
	bottom: 0;
	right: 40px;
}

.component__grid {
	display: grid;
	grid-template-columns: repeat(4, 1fr);
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
.active {
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}
.component__text {
	text-align: center;
	margin: 10px 0;
}
</style>
