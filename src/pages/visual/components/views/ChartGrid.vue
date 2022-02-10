<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 18:31:24
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 14:27:32
 * @Description: 图表矩阵
-->
<template>
	<div v-if="router.currentRoute.value.path === '/visual/select'" class="component__grid">
		<div v-for="(component, index) in componentList" :key="index" :class="activeIdx === index ? 'component__item active' : 'component__item'" @click="changeActiveIdx(index)">
			<chart-display :id="index + new Date().toString()" :url="false" :name="index" :options="deepClone(component.defaultConfigs)" :water-mark-options="false" :use-store="false"></chart-display>
			<p class="component__text">{{ component.text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { G2PlotChartConfig } from '@/configs/visual';
import { ChartNameType } from '@/types/visual/charts';
import ChartDisplay from './ChartDisplay.vue';
import { deepClone } from '@/utils';

const router = useRouter();

const emit = defineEmits(['update:name']);
const props = defineProps<{
	name: ChartNameType;
}>();

const componentList = ref(G2PlotChartConfig);

const chartType = ref<ChartNameType>(props.name || 'Area');

const activeIdx = ref<ChartNameType>(chartType.value);
const changeActiveIdx = (name: ChartNameType) => {
	activeIdx.value = name;
	emit('update:name', name);
};
</script>

<script lang="ts">
export default {
	name: 'ChartGrid',
};
</script>

<style scoped>
.component__grid {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
	grid-row-gap: 10px;
	grid-column-gap: 10px;
	justify-items: center;
	align-items: center;
}

.component__item {
	padding: 20px;
	border: 2px solid rgba(0, 106, 198, 0);
	box-sizing: border-box;
	border: none;
	border-radius: 20px;
	transition: box-shadow 0.3s;
}
.component__text {
	text-align: center;
}
.active {
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}
</style>
