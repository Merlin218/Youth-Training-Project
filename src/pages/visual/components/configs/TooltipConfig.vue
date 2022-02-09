<!--
 * @Author: Merlin218
 * @Date: 2022-02-07 16:47:59
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:31:48
 * @Description: 悬浮提示配置
-->
<template>
	<a-form :model="tooltipConfig">
		<a-form-item label="自定义字段">
			<a-checkbox-group v-model:value="tooltipConfig.fields" name="group" :options="fieldsOptions" />
		</a-form-item>
		<a-form-item label="显示标题">
			<a-switch v-model:checked="tooltipConfig.showTitle"></a-switch>
		</a-form-item>
		<a-form-item label="展示相邻数据">
			<a-switch v-model:checked="tooltipConfig.shared"></a-switch>
		</a-form-item>
		<a-form-item label="显示辅助线">
			<a-switch v-model:checked="tooltipConfig.showCrosshairs"></a-switch>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { TooltipOptions } from '@antv/g2plot';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const fieldsOptions = computed(() => Object.keys(store.chartOptions?.data[0] || {}));

const tooltipConfig = ref<Exclude<TooltipOptions, false>>({
	fields: [],
	showTitle: true,
	shared: true,
	showCrosshairs: true,
	...(store.chartOptions?.tooltip ? store.chartOptions.tooltip : {}),
});

watch(
	() => tooltipConfig.value,
	(value: TooltipOptions) => {
		store.update({ tooltip: value });
	},
	{
		deep: true,
	}
);
</script>

<script lang="ts">
export default {
	name: 'TooltipConfig',
};
</script>

<style scoped></style>
