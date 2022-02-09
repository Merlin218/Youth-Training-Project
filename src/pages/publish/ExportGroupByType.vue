<template>
	<div class="card-wrapper">
		<a-card style="width: 100%" :tab-list="tabListNoTitle" :active-tab-key="activeKeys" @tab-change="key => onTabChange(key)">
			<div class="content">
				<template v-if="activeKeys === 'image'">
					<Image></Image>
				</template>
				<template v-else-if="activeKeys === 'dataTable'">
					<DataTable></DataTable>
				</template>
				<template v-else-if="activeKeys === 'code'">
					<CodeEditor v-model="code" :readonly="true" @input="codeChange"></CodeEditor>
				</template>
				<template v-else-if="activeKeys === 'multiple'">
					<MultipleForm></MultipleForm>
				</template>
			</div>
			<a-button type="primary" style="float: right">导出</a-button>
		</a-card>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Image from './components/Image.vue';
import DataTable from './components/DataTable.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import MultipleForm from './components/MultipleForm.vue';

const activeKeys = ref('image');
const tabListNoTitle = ref([
	{
		key: 'image',
		tab: '图片',
	},
	{
		key: 'dataTable',
		tab: '数据表',
	},
	{
		key: 'code',
		tab: '代码',
	},
	{
		key: 'multiple',
		tab: '多选',
	},
]);

const onTabChange = (key: string) => {
	activeKeys.value = key;
};

const code = ref('function myScript(){return 100;}\n');

const codeChange = (val: string) => {
	console.log(code.value, val);
};
</script>

<script lang="ts">
export default {
	name: 'ExportGroupByType',
};
</script>

<style lang="less" scoped>
.card-wrapper {
	position: relative;
	top: -60px;
}
:deep(.ant-card-body) {
	height: 420px;
}
.content {
	height: 90%;
}
</style>
