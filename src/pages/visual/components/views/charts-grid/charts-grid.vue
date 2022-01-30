<template>
	<div class="component__grid">
		<div v-for="(component, index) in componentList" :key="component.name" :class="activeIdx === index ? 'component__item active' : 'component__item'" @click="changeActiveIdx(index, component.name)">
			<component :is="component.name" v-bind="config"></component>
			<p class="component__text">{{ component.text }}</p>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { ComponentNameType, ComponentPropsType } from '@/types/visual/g2PlotComponent';
import { componentInfo } from '@/configs/visual';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();
const componentList = ref<{ name: ComponentNameType; text: string }[]>(componentInfo);

const activeIdx = computed(() => componentInfo.findIndex(item => item.name === store.userConfiguration.componentName));
const changeActiveIdx = (index: number, name: ComponentNameType) => {
	store.userConfiguration.componentName = name;
};

const config = ref<ComponentPropsType>({
	width: 200,
	height: 150,
	autoFit: true,
	xField: 'year',
	yField: 'value',
	tooltip: {
		showContent: false,
	},
	smooth: true,
	meta: {
		value: {
			max: 15,
		},
	},
	data: [
		{ year: '1991', value: 3 },
		{ year: '1992', value: 4 },
		{ year: '1993', value: 3.5 },
		{ year: '1994', value: 5 },
		{ year: '1995', value: 4.9 },
		{ year: '1996', value: 6 },
		{ year: '1997', value: 7 },
		{ year: '1998', value: 9 },
		{ year: '1999', value: 11 },
	],
});
</script>

<style scoped>
.component__grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-row-gap: 10px;
	grid-column-gap: 10px;
	justify-items: center;
	align-items: center;
}

.component__item.active {
	border: 2px solid black;
}
.component__text {
	text-align: center;
	margin: 10px 0;
}
</style>
