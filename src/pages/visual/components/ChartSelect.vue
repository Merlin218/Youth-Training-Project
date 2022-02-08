<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-08 18:04:02
 * @Description: 选择图表
-->
<template>
	<div style="position: relative; min-height: 660px">
		<a-divider class="text" orientation="left">请选择您需要的类型</a-divider>
		<!-- 图表矩阵 -->
		<chart-grid v-model:name="chartType"></chart-grid>
		<a-button class="btn" type="primary" :disabled="!componentText" @click="toConfigPage">已选择：{{ componentText || '未选择' }} </a-button>
	</div>
	<teleport to="#modal">
		<a-modal title="注意" :visible="showModal" ok-text="确认" cancel-text="取消" @ok="handleExist" @cancel="showModal = false"> <p>您在之前已配置过该图表，是否基于之前的配置修改？</p> </a-modal>>
	</teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import { useVisualStore } from '@/store/visual';
import { useTableStore } from '@/store/process';
import { visualApi } from '@/api';
import { responseType } from '@/types/common';

const router = useRouter();
const visualStore = useVisualStore();
const tableStore = useTableStore();
const chartType = ref<ChartNameType>('Area');

const componentText = computed(() => G2PlotChartConfig[chartType.value].text);
const projectData = computed(() => visualStore.projectData);
const showModal = ref<boolean>(false);

const handleExist = () => {
	visualStore.initChart(projectData.value);
	router.push('/visual/config');
};

/**
 * @description: 初始化项目配置
 * @param {*} id 项目id
 * @param {*} tableData 图表数据
 */
const handleInit = async (id: string, tableData: { x: string; y: string; data: [] }) => {
	// 合并默认配置项
	const chartOptions = Object.assign(G2PlotChartConfig[chartType.value].defaultConfigs, {
		xField: tableData.x,
		yField: tableData.y,
		data: tableData.data,
	});
	const waterMarkOptions = false;
	// 同步数据库,返回结果
	return (await visualApi.updateChartPicConfig({
		chart_title: '',
		chart_type: chartType.value,
		chartpic_id: id,
		vis_config: JSON.stringify(chartOptions),
		watermark_config: JSON.stringify(waterMarkOptions),
	})) as responseType;
};

/**
 * @description: 跳转配置页
 */
const toConfigPage = async () => {
	try {
		let tableData;
		// 处理配置项，同步后端
		if (router.currentRoute.value.query.status === 'back') {
			const { xField, yField, data } = JSON.parse(visualStore.projectData.vis_config);
			tableData = { x: xField, y: yField, data };
		} else {
			if (!tableStore.tableExport) {
				message.error('数据未定义');
				return;
			}
			tableData = tableStore.tableExport;
		}
		const res = await handleInit(projectData.value.chartpic_id, tableData);
		// 同步store
		visualStore.initChart(res);
		// 跳转页面
		router.push('/visual/config');
		// eslint-disable-next-line no-empty
	} catch (err) {
		console.log(err);
	}
};

onBeforeMount(async () => {
	if (router.currentRoute.value.query.status !== 'back') {
		// 第一次进入，获取项目信息，拿到chart信息
		const {
			result: {
				data: [first],
			},
		} = (await visualApi.getAllChartPic('32958067-a627-4b64-abaa-43c52734b649')) as responseType;
		// 默认获取第一个图表,保存到store
		visualStore.backupProjectData(first);
		if (first.chart_type !== null) {
			showModal.value = true;
		}
	}
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
</style>
