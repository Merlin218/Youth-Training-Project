<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 11:11:58
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-04 12:40:20
 * @Description: 水印组件
-->
<template>
	<div v-if="!!options" class="water__mark__container">
		<div class="water__mark__wrap" :style="{ backgroundImage: 'url(' + base64Url + ')' }"></div>
		<canvas ref="canvas" class="water__mark___canvas" :width="options.width" :height="options.height"></canvas>
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { WaterMarkOption } from '@/types/common';

const props = withDefaults(
	defineProps<{
		options: WaterMarkOption | false;
	}>(),
	{
		options: () => {
			return {
				width: 160,
				height: 100,
				fontSize: 16,
				color: 'rgb(0,0,0)',
				content: '哈哈哈哈',
				rotate: -30,
				gapX: 200,
				gapY: 200,
			};
		},
	}
);

const canvas = ref<HTMLCanvasElement | null>(null);
const base64Url = ref<string>('');
const drawInit = () => {
	if (canvas.value && props.options) {
		const ctx = canvas.value.getContext('2d');
		if (ctx) {
			ctx.font = `${props.options.fontSize}px normal`;
			ctx.fillStyle = props.options.color;
			ctx.rotate((props.options.rotate * Math.PI) / 180);
			ctx.fillText(props.options.content, 0, props.options.height);
			base64Url.value = canvas.value.toDataURL('image/png');
		}
	}
};

onMounted(() => {
	drawInit();
});
</script>

<style scoped>
.water__mark__wrap {
	z-index: 1000;
	position: absolute;
	left: 0px;
	top: 0px;
	width: 100%;
	height: 100%;
	background-size: 140px;
	pointer-events: none;
	background-repeat: repeat;
}
.water__mark__container {
	position: relative;
}

.water__mark___canvas {
	position: fixed;
	bottom: -1000px;
	right: -1000px;
}
</style>
