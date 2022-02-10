<!--
 * @Author: Merlin218
 * @Date: 2022-02-09 12:16:34
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 11:39:33
 * @Description: 请填写简介
-->
<template>
	<h1>在此发布你的作品</h1>
	<br />
	<a-row type="flex" justify="center" align="top">
		<a-col :span="8">
			<div class="display">
				<ChartDisplay
					id="publishChart"
					class="chartWrapper"
					:url="visualStore.waterMarkOptions.url"
					:name="visualStore.chartType"
					:options="visualStore.backupChartOptions"
					:title="visualStore.chartTitle"
					:use-store="true"
				></ChartDisplay>
			</div>
		</a-col>
		<a-col :span="15">
			<ExportGroupByType></ExportGroupByType>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
import ChartDisplay from '../visual/components/views/ChartDisplay.vue';
import ExportGroupByType from './ExportGroupByType.vue';
import { useVisualStore } from '@/store/visual';
import { useProjectStore } from '@/store/project';
import { publishApi } from '@/api';
import { html2image } from '@/utils/html2image';

const visualStore = useVisualStore();
const projectStore = useProjectStore();

const imgUrl = ref('');

provide('getImgUrl', () => imgUrl.value);

provide('updateProjectImage', async () => {
	imgUrl.value = await html2image(document.getElementById('publishChart') as HTMLElement);
	const res = await publishApi.updateCurrentChartPicExport({
		project_id: projectStore.project_id,
		chartpic_id: visualStore.chartPicId || projectStore.chartData.chartpic_id,
		export_img: imgUrl.value,
	});
	console.log(visualStore.chartPicId, res);
});

onMounted(async () => {
	setTimeout(async () => {
		imgUrl.value = await html2image(document.querySelector('.chartWrapper') as HTMLElement);
	}, 1000);
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
