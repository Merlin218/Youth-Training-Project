<template>
	<a-form layout="vertical">
		<a-form-item label="Form Layout" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-radio-group default-value="horizontal" @change="handleFormLayoutChange">
				<a-radio-button value="horizontal"> Horizontal </a-radio-button>
				<a-radio-button value="vertical"> Vertical </a-radio-button>
				<a-radio-button value="inline"> Inline </a-radio-button>
			</a-radio-group>
		</a-form-item>
		<a-form-item label="Field A" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-input placeholder="input placeholder" />
		</a-form-item>
		<a-form-item label="Field B" :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
			<a-input placeholder="input placeholder" />
		</a-form-item>
		<a-form-item :wrapper-col="{ span: 14, offset: 4 }">
			<a-button type="primary"> Submit </a-button>
		</a-form-item>
	</a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const form = ref({
	fieldA: '',
	fieldB: '',
});

const handleFormLayoutChange = e => {
	form.value = e.target.value;
};
</script>

<style lang="less" scoped></style>
