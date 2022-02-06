<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 18:12:44
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-06 12:05:57
 * @Description: 请填写简介
-->
<template>
	<div class="container__top">
		<div style="width: 90%">
			<a-divider class="text" orientation="left">请配置您的图表</a-divider>
		</div>
		<a-popconfirm placement="topLeft" ok-text="确认" cancel-text="取消" @confirm="handleBack">
			<template #title>
				<p>改变图表类型将会导致您的配置丢失，是否确认返回？</p>
			</template>
			<a-button type="primary">返回</a-button>
		</a-popconfirm>
	</div>
	<div class="container">
		<div :style="{ width: '70%' }">
			<chart-display id="storeChart" :url="store.waterMark" :name="store.chartName" :options="store.backupChartOptions" :title="store.chartTitle" :use-store="true"></chart-display>
		</div>
		<div :style="{ width: '25%', position: 'relative' }">
			<a-collapse v-model:activeKey="stepActive" accordion @change="stepActive = $event">
				<a-collapse-panel :key="stepConfig[0].key" :header="stepConfig[0].header">
					<!-- 配置基本信息 -->
					<base-config></base-config>
				</a-collapse-panel>
				<a-collapse-panel :key="stepConfig[1].key" :header="stepConfig[1].header">
					<!-- 配置图表特有信息 -->
					<other-config></other-config>
				</a-collapse-panel>
				<a-collapse-panel :key="stepConfig[2].key" :header="stepConfig[2].header">
					<!-- 标记配置 -->
					<annotation-config></annotation-config>
				</a-collapse-panel>
				<a-collapse-panel :key="stepConfig[3].key" :header="stepConfig[3].header" :disabled="!store.waterMark">
					<template #extra>
						<a-switch :checked="!!store.waterMark" @change="handleMarkActive"></a-switch>
					</template>
					<!-- 水印配置 -->
					<water-mark-config></water-mark-config>
				</a-collapse-panel>
			</a-collapse>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useVisualStore } from '@/store/visual';
import { defaultWaterMark } from '@/configs/visual';

const router = useRouter();
const store = useVisualStore();

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
		header: '配置图表水印',
	},
]);

// 返回
const handleBack = () => {
	router.push('/visual/select');
};

/**
 * @description: 开启/关闭水印
 * @param {*} value
 */
const handleMarkActive = (value: any) => {
	if (!value) {
		store.changeWaterMark(false);
		stepActive.value = '';
	} else {
		store.changeWaterMark(defaultWaterMark);
	}
};
</script>

<style scoped>
.container__top {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: center;
	justify-content: space-around;
}
.container {
	width: 100%;
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-around;
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
