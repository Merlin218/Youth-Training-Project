<template>
	<a-space>
		<a-select v-model:value="value" :options="options" style="width: 400px" @change="handleChange"></a-select>
	</a-space>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { SelectProps } from 'ant-design-vue';

export default defineComponent({
	emits: ['selected'],
	setup(props, context) {
		const handleChange = (value: string) => {
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
						value: 'medal',
						label: '2022 Winter Olympics medal table',
					},
					{
						value: 'gdp',
						label: 'Historical GDP of China(2005 - 2021)',
					},
					{
						value: 'car',
						label: 'Electric cars 2021',
					},
					{
						value: 'museum',
						label: 'The most visited art museums 2021',
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
