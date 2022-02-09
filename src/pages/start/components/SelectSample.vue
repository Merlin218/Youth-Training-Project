<template>
	<a-space>
		<a-select v-model:value="value" :options="options" style="width: 400px" @change="handleChange"></a-select>
	</a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { SelectProps } from 'ant-design-vue/lib/vc-select';

export default defineComponent({
	emits: ['selected'],
	setup(props, context) {
		const handleChange = (value: string) => {
			console.log(`selected ${value}`);
			context.emit('selected', value);
		};

		const options = ref<SelectProps['options']>([
			{
				value: 'default',
				label: '请选择一个样本数据集',
			},
			{
				label: '表格',
				options: [
					{
						value: 'car',
						label: 'Electric cars 2018',
					},
					{
						value: 'museum',
						label: 'The most visited art museums 2018',
					},
				],
			},
		]);

		return {
			value: ref(['default']),
			handleChange,
			options,
		};
	},
});
</script>
