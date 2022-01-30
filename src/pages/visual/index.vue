<template>
	<div class="container">
		<div style="width: 33%">
			<a-collapse :value="stepActive" accordion @change="handleStepChange">
				<a-collapse-panel v-for="step in stepConfig" :key="step.key" :header="step.header">
					<!-- 选择图标类型 -->
					<select-chart v-show="step.key === '1'" :component-name="userConfiguration.componentName"></select-chart>
					<!-- 配置基本信息 -->
					<base-config v-show="step.key === '2'"></base-config>
					<!-- 配置图标特有信息 -->
					<charts-config v-show="step.key === '3'"></charts-config>

					<annotation-config v-show="step.key === '4'"></annotation-config>
				</a-collapse-panel>
			</a-collapse>
		</div>
		<div style="width: 63%">
			<charts-grid v-if="stepActive === '1'"></charts-grid>
			<chart-show v-if="stepActive !== '1'"></chart-show>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

// eslint-disable-next-line prefer-destructuring
const userConfiguration = store.userConfiguration;

// const configComponentName: ComputedRef<string> = computed(
// 	() =>
// 		`${userConfiguration.componentName
// 			.match(/[A-Z][a-z]*/g)
// 			?.map(item => item.toLowerCase())
// 			.join('-')}-config`
// )

const stepActive = ref('1');

const handleStepChange = (key: string) => {
	stepActive.value = key;
};

const stepConfig = ref([
	{
		key: '1',
		header: '选择图表类型',
	},
	{
		key: '2',
		header: '配置基本信息',
	},
	{
		key: '3',
		header: '配置图表信息',
	},
	{
		key: '4',
		header: '配置图表标记',
	},
]);
</script>

<style scoped>
.container {
	display: flex;
	flex-flow: row;
	align-items: flex-start;
	justify-content: space-between;
}
</style>
