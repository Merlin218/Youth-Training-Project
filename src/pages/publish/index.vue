<template>
	<h1>在此发布你的作品</h1>
	<br />
	<a-row>
		<a-col :span="8">
			<div style="height: 300px; width: 400px">
				<chart-display id="publishChart" :url="store.waterMark" :name="store.chartName" :options="store.backupChartOptions" :title="store.chartTitle" :use-store="true"></chart-display>
			</div>
		</a-col>
		<a-col :span="1"></a-col>
		<a-col :span="15">
			<ExportGroupByType></ExportGroupByType>
		</a-col>
	</a-row>
</template>

<script lang="ts" setup>
import ExportGroupByType from './ExportGroupByType.vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
</script>

<style lang="less" scoped></style>
