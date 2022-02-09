<!--
 * @Author: Merlin218
 * @Date: 2022-02-09 12:16:34
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:53:02
 * @Description: 请填写简介
-->
<template>
	<h1>在此发布你的作品</h1>
	<br />
	<a-row>
		<a-col :span="8">
			<div style="height: 300px; width: 400px; border: 1px solid rgba(0, 0, 0, 0.2)">
				<chart-display
					id="publishChart"
					class="chartWrapper"
					:url="visualStore.waterMarkUrl"
					:name="visualStore.chartType"
					:options="visualStore.backupChartOptions"
					:title="visualStore.chartTitle"
					:use-store="true"
				></chart-display>
			</div>
		</a-col>
		<a-col :span="1"></a-col>
		<a-col :span="15">
			<ExportGroupByType></ExportGroupByType>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
import { ref, provide, onMounted } from 'vue';
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
		project_id: projectStore.id || '32958067-a627-4b64-abaa-43c52734b649',
		chartpic_id: visualStore.chartPicId || '902004e8-51df-4380-811a-e983dbe136fc',
		export_img: imgUrl.value,
	});
	console.log(res);
});

onMounted(async () => {
	setTimeout(async () => {
		imgUrl.value = await html2image(document.querySelector('.chartWrapper') as HTMLElement);
	}, 1000);
});
</script>

<script lang="ts">
export default {
	name: 'WaterMarkConfig',
};
</script>

<style lang="less" scoped></style>
