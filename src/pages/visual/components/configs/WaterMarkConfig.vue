<!--
 * @Author: Merlin218
 * @Date: 2022-02-04 12:50:29
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:30:43
 * @Description: 水印配置
-->

<template>
	<a-form :model="waterMarkOptions">
		<a-form-item label="预览">
			<canvas ref="canvas" class="water__mark___canvas" :width="waterMarkOptions.width" :height="waterMarkOptions.height"></canvas>
		</a-form-item>
		<a-form-item label="字体内容">
			<a-input v-model:value="waterMarkOptions.content"></a-input>
		</a-form-item>
		<a-form-item label="字体大小">
			<a-input-number v-model:value="waterMarkOptions.fontSize" :min="10" :max="60"></a-input-number>
		</a-form-item>
		<a-form-item label="文本颜色" style="position: relative">
			<div style="display: flex">
				<div class="color__display" :style="{ backgroundColor: waterMarkOptions.color }" @click="colorPickerShow = !colorPickerShow"></div>
			</div>
			<ColorPicker
				class="color__picker"
				:style="colorPickerShow ? {} : { display: 'none' }"
				theme="light"
				:color="waterMarkOptions.color"
				:sucker-hide="true"
				@change-color="changeColor"
			></ColorPicker>
		</a-form-item>
		<a-form-item label="旋转角度">
			<a-input-number v-model:value="waterMarkOptions.rotate" :min="-180" :max="180"></a-input-number>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import { useVisualStore } from '@/store/visual';
import { WaterMarkOptionType } from '@/types/visual/config';
import { defaultWaterMarkOption } from '@/configs/visual';

const store = useVisualStore();

const waterMarkOptions = ref<WaterMarkOptionType>({
	...defaultWaterMarkOption,
	...(store.waterMarkOptions ? store.waterMarkOptions : {}),
});

let oldOptions = { ...waterMarkOptions.value };

const colorPickerShow = ref<boolean>(false);

const changeColor = ({ rgba: { r, g, b, a } }: any) => {
	waterMarkOptions.value.color = `rgba(${r},${g},${b},${a})`;
};

// canvas实例
const canvas = ref<HTMLCanvasElement | null>(null);
// canvas上下文
const ctx = computed(() => canvas.value?.getContext('2d'));

/**
 * @description: 生成图片链接
 */
const toDataUrl = () => {
	if (canvas.value && ctx.value) {
		const base64Url = canvas.value.toDataURL('image/png');
		store.changeWaterMark(waterMarkOptions.value, base64Url);
	}
};

/**
 * @description: 清除画布
 */
const clearCanvas = (value: WaterMarkOptionType) => {
	if (ctx.value) {
		ctx.value.clearRect(0, 0, value.width, value.height);
	}
};

/**
 * @description: 画布初始化
 * @param {*} options
 * @return {*}
 */
const drawInit = (options: WaterMarkOptionType) => {
	if (ctx.value) {
		ctx.value.font = `${options.fontSize}px normal`;
		ctx.value.fillStyle = options.color;
		ctx.value.translate(options.width / 2, options.width / 2);
		ctx.value.rotate((options.rotate * Math.PI) / 180);
		ctx.value.translate(-options.width / 2, -options.width / 2);
		ctx.value.textAlign = 'center';
		ctx.value.fillText(options.content, options.width / 2, (options.height + options.fontSize) / 2, options.width);
		toDataUrl();
	}
};

/**
 * @description: 重新设置画布
 * @param {*} v 新的配置
 * @param {*} ov 旧的配置
 * @return {*}
 */
const resetCanvas = (v: WaterMarkOptionType, ov: WaterMarkOptionType) => {
	if (canvas.value && ctx.value) {
		if (v.width !== ov.width) {
			canvas.value.width = v.width;
			drawInit(v);
			return;
		}
		if (v.height !== ov.height) {
			canvas.value.height = v.height;
			drawInit(v);
			return;
		}
		if (v.color !== ov.color) {
			ctx.value.fillStyle = v.color;
		} else if (v.fontSize !== ov.fontSize) {
			ctx.value.font = `${v.fontSize}px normal`;
		} else if (v.rotate !== ov.rotate) {
			ctx.value.translate(v.width / 2, v.width / 2);
			ctx.value.rotate(((v.rotate - ov.rotate) * Math.PI) / 180);
			ctx.value.translate(-v.width / 2, -v.width / 2);
		}
		ctx.value.fillText(v.content, v.width / 2, (v.height + v.fontSize) / 2, v.width);
	}
};

onMounted(() => {
	drawInit(waterMarkOptions.value);
});

// 监听配置变化
watch(
	() => waterMarkOptions.value,
	(value: WaterMarkOptionType) => {
		clearCanvas(oldOptions);
		resetCanvas(value, oldOptions);
		toDataUrl();
		oldOptions = { ...value };
	},
	{
		deep: true,
	}
);
</script>

<script lang="ts">
export default {
	name: 'WaterMarkConfig',
};
</script>

<style scoped>
.water__mark___canvas {
	border: 5px dashed rgba(0, 0, 0, 0.1);
	border-radius: 20px;
}
.color__display {
	width: 30px;
	height: 30px;
	margin-right: 10px;
	border-radius: 50%;
	border: 1px solid rgba(0, 0, 0, 0.1);
}
.color__picker {
	position: absolute;
	top: -160px;
	left: 40px;
	width: auto !important;
}
</style>
