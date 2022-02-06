<template>
	<h1>在此发布你的作品</h1>
	<br />
	<a-row>
		<a-col :span="8">
			<!-- TODO: 可视化组件 -->
			<div style="height: 300px; width: 90%; background-color: darkgrey"></div>
		</a-col>
		<a-col :span="16">
			<ExportGroupByType></ExportGroupByType>
		</a-col>
	</a-row>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';
import ExportGroupByType from './ExportGroupByType.vue';

export default {
	name: 'Publish',
	components: { ExportGroupByType },
	setup() {
		const state = reactive({});

		onMounted(() => {});

		return {
			...toRefs(state),
		};
	},
};
</script>

<style lang="less" scoped></style>
