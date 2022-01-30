<template>
	<div>
		<a-form-item label="选择标记点">
			<a-row align="middle" justify="space-between">
				<a-col :span="18">
					<a-radio-group v-model="annotationActive" :default-value="0"> <a-radio v-for="item in config.annotations?.length" :key="'h' + item" :value="item"></a-radio> </a-radio-group
				></a-col>
				<a-col :span="6">
					<a-button type="primary" round @click="addTextAnnotation">添加标记</a-button>
				</a-col>
			</a-row>
		</a-form-item>
		<text-annotation-config
			v-model:xPos.lazy="config.annotations[annotationActive].position[0]"
			v-model:yPos.lazy="config.annotations[annotationActive].position[1]"
			v-model:offsetX.lazy="config.annotations[annotationActive].offsetX"
			v-model:offsetY.lazy="config.annotations[annotationActive].offsetY"
			v-model:content.lazy="config.annotations[annotationActive].content"
			v-model:styleFill.lazy="config.annotations[annotationActive].style.fill"
		></text-annotation-config>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { LineChartProps } from '@opd/g2plot-vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const config: LineChartProps = store.userConfiguration.componentProps;

const annotationActive = ref<number>(0);

const addTextAnnotation = () => {
	if (!config.annotations) {
		config.annotations = [
			{
				position: ['0', '0'],
				offsetX: 0,
				offsetY: 0,
				content: '',
				type: 'text',
				style: {
					fill: 'red',
				},
			},
		];
		return;
	}
	config.annotations.push({
		position: ['0', '0'],
		offsetX: 0,
		offsetY: 0,
		content: '',
		type: 'text',
		style: {
			fill: 'red',
		},
	});
};
</script>

<style scoped></style>
