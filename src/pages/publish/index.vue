<!--
 * @Author: Merlin218
 * @Date: 2022-02-09 12:16:34
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 15:02:21
 * @Description: 请填写简介
-->
<template>
	<h1>在此发布你的作品</h1>
	<br />
	<a-row type="flex" justify="center" align="top">
		<a-col :span="8">
			<div v-if="chartData.type" class="display">
				<ChartDisplay
					id="publishChart"
					class="chartWrapper"
					:url="chartData.waterMarkConfigs ? chartData.waterMarkConfigs.url : false"
					:name="chartData.type"
					:options="chartData.visConfig"
					:title="chartData.chartTitle"
				></ChartDisplay>
			</div>
		</a-col>
		<a-col :span="15">
			<ExportGroupByType :chart-data="chartData"></ExportGroupByType>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
/* eslint-disable camelcase */
import { ref, provide, onMounted, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import ChartDisplay from '../visual/components/views/ChartDisplay.vue';
import ExportGroupByType from './ExportGroupByType.vue';
import { useVisualStore } from '@/store/visual';
import { useProjectStore } from '@/store/project';
import { publishApi, visualApi } from '@/api';
import { html2image } from '@/utils/html2image';
import { responseType } from '@/types/common';

const visualStore = useVisualStore();
const projectStore = useProjectStore();

const chartData = ref<any>({});

const imgUrl = ref('');

provide('getImgUrl', () => imgUrl.value);

provide('updateProjectImage', async () => {
	const res = await publishApi.updateCurrentChartPicExport({
		project_id: projectStore.project_id,
		chartpic_id: chartData.value.id,
		export_img: imgUrl.value,
	});
	console.log(visualStore.chartPicId, res);
});

onMounted(async () => {
	setTimeout(async () => {
		imgUrl.value = await html2image(document.querySelector('.chartWrapper') as HTMLElement);
	}, 1000);
});

const router = useRouter();

onBeforeMount(async () => {
	try {
		const {
			result: {
				data: [first],
			},
		} = (await visualApi.getAllChartPic(projectStore.project_id)) as responseType;
		console.log(first);
		const { chartpic_id, chart_type, chart_title, vis_config, watermark_config } = first;
		chartData.value = {
			id: chartpic_id,
			type: chart_type,
			chartTitle: chart_title,
			waterMarkConfigs: watermark_config === 'false' ? false : JSON.parse(watermark_config),
			visConfig: JSON.parse(vis_config),
		};
		// eslint-disable-next-line no-empty
	} catch (err) {
		message.warn('请先选择一个项目', 1);
		message.loading('正在返回首页', 1, () => {
			router.replace('/projects');
		});
	}
});
</script>

<style lang="less" scoped>
.display {
	height: 300px;
	width: 400px;
	border: 1px solid rgba(0, 0, 0, 0.1);
	border-radius: 16px;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
