<template>
	<a-form layout="vertical">
		<a-form-item label="图片" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-switch :checked="form.hasImage" default-checked @change="onChange('Image')" />
		</a-form-item>
		<a-form-item label="数据表" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-switch :checked="form.hasTable" default-checked @change="onChange('Table')" />
		</a-form-item>
		<a-form-item label="图表代码" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-switch :checked="form.hasCode" default-checked @change="onChange('Code')" />
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

type zipType = 'Image' | 'Table' | 'Code';

const form = ref({
	hasImage: true,
	hasTable: true,
	hasCode: true,
});

const onChange = (type: zipType) => {
	form.value[`has${type}`] = !form.value[`has${type}`];
};
</script>

<script lang="ts">
export default {
	name: 'MultipleForm',
};
</script>
<style lang="less" scoped></style>
