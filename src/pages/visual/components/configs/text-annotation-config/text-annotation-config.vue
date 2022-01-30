<template>
	<a-form>
		<a-row justify="space-between">
			<a-col :span="11"
				><a-form-item label="x轴位置"> <a-input :value="xPos" @change="$emit('update:xPos', $event.target.value)"></a-input> </a-form-item
			></a-col>
			<a-col :span="11">
				<a-form-item label="y轴位置"> <a-input :value="yPos" @change="$emit('update:yPos', $event.target.value)"></a-input> </a-form-item
			></a-col>
		</a-row>
		<a-form-item label="文本内容">
			<a-input :value="content" @change="$emit('update:content', $event.target.value)"></a-input>
		</a-form-item>
		<a-row justify="space-between">
			<a-col :span="11"
				><a-form-item label="水平偏移"> <a-input-number :value="offsetX" @change="$emit('update:offsetX', $event)"></a-input-number> </a-form-item
			></a-col>
			<a-col :span="11">
				<a-form-item label="垂直偏移"> <a-input-number :value="offsetY" @change="$emit('update:offsetY', $event)"></a-input-number> </a-form-item
			></a-col>
		</a-row>
		<a-form-item label="文本颜色">
			<a-input :value="styleFill" @change="$emit('update:styleFill', $event.target.value)"></a-input>
		</a-form-item>
	</a-form>
</template>

<script setup lang="ts">
defineProps<{
	xPos?: string;
	yPos?: string;
	content?: string;
	offsetY?: number;
	offsetX?: number;
	styleFill?: string;
}>();

defineEmits(['update:xPos', 'update:yPos', 'update:content', 'update:offsetX', 'update:offsetY', 'update:styleFill']);
</script>

<style scoped></style>
