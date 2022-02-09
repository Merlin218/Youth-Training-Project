<!--
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:10
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 21:40:56
 * @Description: 请填写简介
-->
<template>
	<a-form :model="annotationConfig">
		<a-form-item label="效果展示">
			<div
				class="annotation__display"
				:style="{
					height: annotationConfig.style.fontSize + 'px',
					lineHeight: annotationConfig.style.fontSize + 'px',
					fontSize: annotationConfig.style.fontSize + 'px',
					marginRight: '10px',
					color: annotationConfig.style.fill,
				}"
			>
				{{ annotationConfig.content || '当前无内容' }}
			</div>
		</a-form-item>
		<a-form-item label="坐标位置">
			<a-select v-model:value="tmpPosition" show-search placeholder="请选择标记点" @change="handlePositionChange">
				<a-select-option v-for="(item, index) in data" :key="index + ',' + item[xField] + ',' + item[yField]">{{ item[xField] + ',' + item[yField] }}</a-select-option>
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
				<div class="color__display" :style="{ backgroundColor: annotationConfig.style.fill }" @click="colorPickerShow = !colorPickerShow"></div>
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
		<a-form-item label="文本大小">
			<div style="display: flex; align-items: center">
				<a-input-number v-model:value="annotationConfig.style.fontSize"></a-input-number>
			</div>
		</a-form-item>
		<div class="btn__list">
			<div>
				<a-button type="primary" style="margin-right: 10px" @click="addAnnotation">{{ modifyStatus ? '修改标记' : '新增标记' }}</a-button>
				<a-button v-show="modifyStatus" type="primary" danger @click="removeAnnotation">删除标记</a-button>
			</div>
			<div style="color: rgba(0, 0, 0, 0.3); margin-top: 10px">Tip: 点击图表中标注可以进行修改哦！</div>
		</div>
	</a-form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { ColorPicker } from 'vue-color-kit';
import { useVisualStore } from '@/store/visual';
// stylesheet
import 'vue-color-kit/dist/vue-color-kit.css';
import { TextAnnotationConfigType } from '@/types/visual/config';

const store = useVisualStore();

const data = computed(() => store.chartInstance?.options.data);
const xField = computed(() => store.chartInstance?.options.xField || '');
const yField = computed(() => store.chartInstance?.options.yField || '');

const props = defineProps<{
	id?: string; // 标记点id
}>();

// 标记配置
const annotationConfig = ref<TextAnnotationConfigType>({
	type: 'text',
	content: '',
	offsetX: 0,
	offsetY: 0,
	style: {
		fill: '#000000',
		fontSize: 14,
	},
	id: Date.now().toString(),
	position: ['', ''],
});
// 临时存储position值
const tmpPosition = ref<string>('');
// 按钮文字
const modifyStatus = ref<boolean>(false);
// 颜色选择器显示状态
const colorPickerShow = ref<boolean>(false);

const changeColor = ({ rgba: { r, g, b, a } }: any) => {
	annotationConfig.value.style.fill = `rgba(${r},${g},${b},${a})`;
};

/**
 * @description: 修改位置信息
 * @param {*} value
 * @return {*}
 */
const handlePositionChange = (value: string) => {
	// 将字符串分割成数组
	annotationConfig.value.position = value.split(',');
	// 移除第一个元素 -> 序号
	annotationConfig.value.position.shift();
};

// 将监听id，修改配置值
watch(
	() => props.id,
	value => {
		if (store.chartInstance?.chart.annotation) {
			const { option }: any = store.chartInstance.chart.annotation();
			if (option) {
				const target = option.find((item: any) => item.id === value);
				tmpPosition.value = target.position.join(',');
				Object.assign(annotationConfig.value, target);
				// 按钮文字
				modifyStatus.value = true;
			}
		}
	}
);

/**
 * @description: 重新设置配置值
 * @param {*}
 * @return {*}
 */
const resetConfig = () => {
	// 按钮文字
	modifyStatus.value = false;
	tmpPosition.value = '';
	annotationConfig.value = {
		type: 'text',
		content: '',
		offsetX: 0,
		offsetY: 0,
		style: {
			fill: '#000000',
			fontSize: 14,
		},
		id: Date.now().toString(),
		position: ['', ''],
	};
};

/**
 * @description: 更新g2plot实例
 * @param {*}
 * @return {*}
 */
const updateAnnotationOptions = () => {
	if (store.chartInstance?.chart.annotation) {
		// 从g2实例中获取最新标记列表
		const { option }: any = store.chartInstance.chart.annotation();
		// 更新实例配置
		// g2plot内部实际上是维护了一个g2的图标，上面更改的是g2实例的配置，需要手动修改g2plot配置
		store.update({ annotations: option });
	}
};

/**
 * @description: 添加/修改标记点
 * @param {*}
 * @return {*}
 */
const addAnnotation = () => {
	// 验证数据
	if (annotationConfig.value.position.some(item => item === '') || annotationConfig.value.content === '') return;
	// 如果是修改标记，先移除旧标记，重新新增
	if (modifyStatus.value && annotationConfig.value.id) {
		store.removeAnnotations([{ id: annotationConfig.value.id }]);
		// 修改id
		annotationConfig.value.id = Date.now().toString();
	}
	// 添加标记
	store.addAnnotations([annotationConfig.value]);
	updateAnnotationOptions();
	resetConfig();
};

/**
 * @description: 删除当前标记点
 * @param {*}
 * @return {*}
 */
const removeAnnotation = () => {
	if (modifyStatus.value && annotationConfig.value.id) {
		store.removeAnnotations([{ id: annotationConfig.value.id }]);
		updateAnnotationOptions();
		resetConfig();
	}
};
</script>

<script lang="ts">
export default {
	name: 'TextAnnotationConfig',
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
	left: 40px;
	width: auto !important;
}

.annotation__display {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid rgba(0, 0, 0, 0.1);
	overflow: hidden;
	padding: 16px 0;
}

.btn__list {
	display: flex;
	flex-flow: column;
	align-items: flex-end;
	justify-content: flex-end;
}
</style>
