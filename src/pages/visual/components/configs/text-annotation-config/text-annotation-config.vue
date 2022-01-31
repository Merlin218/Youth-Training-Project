<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-01-31 16:12:53
 * @Description: 请填写简介
-->
<template>
	<a-form :model="annotationConfig">
		<a-form-item label="坐标位置">
			<a-select v-model:value="annotationConfig.position" placeholder="请选择标记点">
				<a-select-option v-for="item in data" :key="[item[xField], item[yField]]">{{ xField + ':' + item[xField] + '  ' + yField + ':' + item[yField] }}</a-select-option>
			</a-select>
		</a-form-item>
		<a-form-item label="文本内容">
			<a-input v-model:value="annotationConfig.content" placeholder="请输入文本内容"></a-input>
		</a-form-item>
		<a-row justify="space-between">
			<a-col :span="11"
				><a-form-item label="水平偏移"> <a-input-number v-model:value="annotationConfig.offsetX"></a-input-number> </a-form-item
			></a-col>
			<a-col :span="11">
				<a-form-item label="垂直偏移"> <a-input-number v-model:value="annotationConfig.offsetY"></a-input-number> </a-form-item
			></a-col>
		</a-row>
		<a-form-item label="文本颜色" style="position: relative">
			<div style="display: flex">
				<div class="color__display" :style="{ backgroundColor: annotationConfig.style.fill }"></div>
				<a-input :value="annotationConfig.style.fill" style="width: 100px" placeholder="选择颜色" @click="colorPickerShow = true" @blur="colorPickerShow = false"></a-input>
			</div>
			<ColorPicker
				class="color__picker"
				:style="colorPickerShow ? {} : { display: 'none' }"
				theme="light"
				:color="annotationConfig.style.fill"
				:sucker-hide="true"
				@change-color="changeColor"
			></ColorPicker>
		</a-form-item>
		<a-button type="primary" @click="addAnnotation">新增标记</a-button>
	</a-form>
</template>

<script setup lang="ts">
import { Annotation } from '@antv/g2plot';
import { computed, ref, watch } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import { useVisualStore } from '@/store/visual';
// stylesheet
import 'vue-color-kit/dist/vue-color-kit.css';

const store = useVisualStore();

const data = computed(() => store.chartInstance.options.data);
const xField = computed(() => store.chartInstance.options.xField || '');
const yField = computed(() => store.chartInstance.options.yField || '');

const props = defineProps<{
	id?: string; // 标记点id
}>();

// 标记配置
const annotationConfig = ref<
	Annotation & {
		position: string[];
		style: {
			fill?: string;
		};
		content: string;
	}
>({
	type: 'text',
	content: '',
	offsetX: 0,
	offsetY: 0,
	style: {},
	id: Date.now().toString(),
	position: ['', ''],
});

/**
 * @description: 重新设置配置值
 * @param {*}
 * @return {*}
 */
const resetConfig = () => {
	annotationConfig.value = {
		type: 'text',
		content: '',
		offsetX: 0,
		offsetY: 0,
		style: {},
		id: Date.now().toString(),
		position: ['', ''],
	};
};

// 将监听id，修改配置值
watch(
	() => props.id,
	value => {
		const { option }: any = store.chartInstance.chart.annotation();
		if (option) {
			const target = option.find((item: any) => item.id === value);
			Object.assign(annotationConfig.value, target);
		}
	}
);
/**
 * @description: 添加标记点
 * @param {*}
 * @return {*}
 */
const addAnnotation = () => {
	if (annotationConfig.value.position.some(item => item === '')) return;
	// 添加标记
	store.addAnnotations([annotationConfig.value]);
	// 从g2实例中获取配置数据
	const { option }: any = store.chartInstance.chart.annotation();
	// 更新实例配置
	// g2plot内部实际上是维护了一个g2的图标，上面更改的是g2实例的配置，需要手动修改g2plot配置
	store.update({ annotations: option });
	resetConfig();
};

// 颜色选择器显示状态
const colorPickerShow = ref<boolean>(false);

/**
 * @description: 改变颜色
 * @param {*} hex 颜色值
 * @return {*}
 */
const changeColor = ({ hex }: any) => {
	annotationConfig.value.style.fill = hex;
};
</script>

<style scoped>
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
	left: 130px;
	width: auto !important;
}
</style>
