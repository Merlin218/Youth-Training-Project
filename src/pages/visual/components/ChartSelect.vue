<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-04 19:09:12
 * @Description: 选择图表
-->
<template>
	<div style="position: relative; min-height: 660px">
		<a-divider class="text" orientation="left">请选择您需要的类型</a-divider>
		<!-- 图表矩阵 -->
		<chart-grid v-model:name="chartName"></chart-grid>
		<a-button class="btn" type="primary" :disabled="!componentText" @click="toConfigPage">已选择：{{ componentText || '未选择' }} </a-button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';

const router = useRouter();
const store = useVisualStore();

const chartName = ref<ChartNameType>('Area');

const componentText = computed(() => G2PlotChartConfig[chartName.value].text);

const toConfigPage = () => {
	store.getChartConfig(chartName.value);
	router.push('/visual/config');
};
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
</style>
