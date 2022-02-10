<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 18:12:44
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 15:26:00
 * @Description: 请填写简介
-->
<template>
	<div class="container__top">
		<div style="width: 86%">
			<a-divider class="text" orientation="left">请配置您的图表</a-divider>
		</div>
		<a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="handleBack">
			<template #title>
				<p>改变图表类型将会导致您的配置丢失，是否确认返回？</p>
			</template>
			<a-button type="primary">返回</a-button>
		</a-popconfirm>
		<a-button type="primary" @click="toNext">下一步</a-button>
	</div>
	<div class="container">
		<div :style="{ width: '70%' }">
			<a-collapse v-model:activeKey="displayActive">
				<template #expandIcon="props">
					<CaretRightOutlined :rotate="props.isActive ? 90 : 0" />
				</template>
				<a-collapse-panel key="1" header="图表展示">
					<div class="chart">
						<chart-display
							:url="visualStore.waterMarkUrl"
							:name="visualStore.chartType"
							:options="visualStore.backupChartOptions"
							:title="visualStore.chartTitle"
							:use-store="true"
						></chart-display></div
				></a-collapse-panel>
				<a-collapse-panel key="2" header="图表数据">
					<table-edit :table="table" class="table" @table-data-change="handleTableChange"></table-edit>
				</a-collapse-panel>
			</a-collapse>
		</div>
		<div :style="{ width: '25%', position: 'relative' }">
			<a-collapse v-model:activeKey="stepActive" accordion @change="stepActive = $event">
				<template #expandIcon="props">
					<CaretRightOutlined :rotate="props.isActive ? 90 : 0" />
				</template>
				<a-collapse-panel :key="stepConfig[0].key" :header="stepConfig[0].header">
					<!-- 配置基本信息 -->
					<base-config></base-config>
				</a-collapse-panel>
				<!--		<a-collapse-panel :key="stepConfig[1].key" :header="stepConfig[1].header">

				</a-collapse-panel> -->
				<a-collapse-panel :key="stepConfig[2].key" :header="stepConfig[2].header">
					<!-- 标记配置 -->
					<annotation-config></annotation-config>
				</a-collapse-panel>
				<a-collapse-panel :key="stepConfig[3].key" :header="stepConfig[3].header" :disabled="!visualStore.chartOptions?.tooltip">
					<template #extra>
						<a-switch :checked="!!visualStore.chartOptions?.tooltip" @change="handleTooltipActive"></a-switch>
					</template>
					<!-- 悬浮提示配置 -->
					<tooltip-config></tooltip-config>
				</a-collapse-panel>
				<a-collapse-panel :key="stepConfig[4].key" :header="stepConfig[4].header" :disabled="!visualStore.waterMarkOptions">
					<template #extra>
						<a-switch :checked="!!visualStore.waterMarkOptions" @change="handleMarkActive"></a-switch>
					</template>
					<!-- 水印配置 -->
					<water-mark-config></water-mark-config>
				</a-collapse-panel>
			</a-collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { TooltipOptions } from '@antv/g2plot';
import { message } from 'ant-design-vue';
import { CaretRightOutlined } from '@ant-design/icons-vue';
import { useVisualStore } from '@/store/visual';
import { defaultWaterMarkOption, defaultWaterMarkUrl, G2PlotChartConfig } from '@/configs/visual';
import { startApi, visualApi } from '@/api';
import BaseConfig from './configs/BaseConfig.vue';
import TooltipConfig from './configs/TooltipConfig.vue';
import AnnotationConfig from './configs/AnnotationConfig.vue';
import WaterMarkConfig from './configs/WaterMarkConfig.vue';
import TableEdit from '@/components/TableEdit.vue';
import ChartDisplay from './views/ChartDisplay.vue';
import { useProjectStore } from '@/store/project';
import { responseType } from '@/types/common';
import { getProjectId } from '../../start/components/GetProjectId';

const router = useRouter();
const visualStore = useVisualStore();
const projectId = getProjectId();

const table = computed(() => visualStore.tableData);
/**
 * @description: 更新图表数据
 * @param {*} newTable 新的表格数据
 */
const handleTableChange = (newTable: any) => {
	visualStore.changeData(newTable.data);
};

// 展示列表
const displayActive = ref(['1']);

// 当前步骤
const stepActive = ref('');
// 步骤配置
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
	{
		key: '4',
		header: '配置悬浮提示',
	},
	{
		key: '5',
		header: '配置图表水印',
	},
]);

// 返回
const handleBack = () => {
	visualStore.destroy();
	router.push({
		path: '/visual/select',
		query: {
			status: 'back',
		},
	});
};

let backupTooltipOptions: TooltipOptions | undefined;
/**
 * @description: 开启/关闭悬浮提示
 * @param {*} value
 */
const handleTooltipActive = (value: any) => {
	if (!value) {
		backupTooltipOptions = { ...visualStore.chartOptions?.tooltip };
		visualStore.update({ tooltip: false });
		stepActive.value = '';
	} else {
		visualStore.update({ tooltip: backupTooltipOptions });
	}
};

let backupWaterMarkUrl: string | undefined;
/**
 * @description: 开启/关闭水印
 * @param {*} value
 */
const handleMarkActive = (value: any) => {
	if (!value) {
		backupWaterMarkUrl = visualStore.waterMarkUrl;
		visualStore.changeWaterMark(false, undefined);
		stepActive.value = '';
	} else {
		visualStore.changeWaterMark(defaultWaterMarkOption, backupWaterMarkUrl || defaultWaterMarkUrl);
	}
};

/**
 * @description: 前往下一个流程
 */
const toNext = async () => {
	// console.log(visualStore.chartType, visualStore.chartPicId, visualStore.chartTitle, visualStore.chartOptions, visualStore.waterMarkOptions);
	if (!visualStore.chartType || !visualStore.chartPicId || !visualStore.chartOptions) {
		message.error('参数不完整');
		return;
	}
	try {
		// 更新配置
		await visualApi.updateChartPicConfig({
			chart_title: visualStore.chartTitle,
			chart_type: visualStore.chartType,
			chartpic_id: visualStore.chartPicId,
			vis_config: JSON.stringify(visualStore.chartOptions),
			watermark_config: visualStore.waterMarkOptions === false ? 'false' : JSON.stringify({ ...visualStore.waterMarkOptions, url: visualStore.waterMarkUrl }),
		});
		// 更新状态
		await startApi.updateProjectStatus({
			project_id: projectId,
			first_finished: 1,
			second_finished: 1,
			third_finished: 1,
		});
		router.push('/publish');
		// eslint-disable-next-line no-empty
	} catch (err) {}
};

onBeforeMount(() => {
	if (visualStore.waterMarkOptions !== false) {
		stepActive.value = '5';
	}
});

onMounted(() => {
	stepActive.value = '';
});

const projectStore = useProjectStore();

onBeforeMount(async () => {
	// 从store中获取project_id
	const { project_id: id }: any = projectStore;
	if (id !== '' && id) {
		// 第一次进入，获取项目信息，拿到chart信息
		const {
			result: {
				data: [first],
			},
		} = (await visualApi.getAllChartPic(id)) as responseType;
		// 默认获取第一个图表,保存到store
		visualStore.backupProjectData(first);
		if (first.chart_type !== null && Object.keys(G2PlotChartConfig).includes(first.chart_type)) {
			visualStore.initChart(first);
		}
	} else {
		message.warn('请先选择一个项目', 1);
		message.loading('正在返回首页', 1, () => {
			router.replace('/projects');
		});
	}
});
</script>

<script lang="ts">
export default {
	name: 'ChartConfig',
};
</script>

<style scoped>
.container__top {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: center;
	justify-content: space-between;
	padding: 0 14px;
}
.container {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-around;
}

.chart {
	display: flex;
	align-items: center;
	justify-content: center;
}

.table {
	width: 100%;
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
