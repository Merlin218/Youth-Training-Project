<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 11:11:58
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-05 23:43:58
 * @Description: 水印组件
-->
<template>
	<div class="water__mark__container" :style="{ width: store.chartInstance?.options.width, height: store.chartInstance?.options.height }">
		<div class="water__mark__wrap" :style="{ backgroundImage: 'url(' + url + ')' }"></div>
	</div>
</template>

<script setup lang="ts">
import { useVisualStore } from '@/store/visual';

withDefaults(
	defineProps<{
		url: string;
	}>(),
	{
		url: '',
	}
);

const store = useVisualStore();
</script>

<style scoped>
.water__mark__container {
	position: relative;
	width: 100%;
	height: 100%;
}
.water__mark__wrap {
	z-index: 1;
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background-size: 140px;
	pointer-events: none;
	background-repeat: repeat;
}

.water__mark___canvas {
	position: fixed;
	bottom: -1000px;
	right: -1000px;
}
</style>
