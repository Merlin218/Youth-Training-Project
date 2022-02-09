<template>
	<div class="card-wrapper">
		<a-card style="width: 100%" :tab-list="tabListNoTitle" :active-tab-key="activeKeys" @tab-change="key => onTabChange(key)">
			<div class="content">
				{{ image.value.exportType.value }}
				<template v-if="activeKeys === 'image'">
					<Image ref="image"></Image>
				</template>
				<template v-else-if="activeKeys === 'dataTable'">
					<DataTable ref="dataTable"></DataTable>
				</template>
				<template v-else-if="activeKeys === 'code'">
					<CodeEditor v-model="code" :readonly="true"></CodeEditor>
				</template>
				<template v-else-if="activeKeys === 'multiple'">
					<MultipleForm></MultipleForm>
				</template>
			</div>
			<a-button type="primary" style="float: right; margin-top: 10px" @click="exportResult">导出</a-button>
		</a-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted } from 'vue';
import Image from './components/Image.vue';
import DataTable from './components/DataTable.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import MultipleForm from './components/MultipleForm.vue';
import { downloadFile } from '@/utils/download';
import { publishApi } from '@/api';
import { useVisualStore } from '@/store/visual';
import { useProjectStore } from '@/store/project';

type exportTypes = 'image' | 'dataTable' | 'code';

const visualStore = useVisualStore();
const projectStore = useProjectStore();

const image = ref(null);
const dataTable = ref(null);
const activeKeys = ref<exportTypes>('image');
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
	// {
	// 	key: 'multiple',
	// 	tab: '多选',
	// },
]);

const onTabChange = (key: exportTypes) => {
	activeKeys.value = key;
};

const code = ref<string>('');
const getImgUrl = inject('getImgUrl') as () => string;

const exportFunctions = {
	image: () => {
		downloadFile(getImgUrl(), `${projectStore.title || 'chart'}.${image.value.exportType.value}`);
	},
	dataTable: () => {
		const { xField, yField, data } = JSON.parse(visualStore.projectData.vis_config);
		console.log(xField, yField, data);
	},
	code: async () => {
		const res = await publishApi.getChartPicHtmlFile({
			chartpic_id: visualStore.chartPicId,
		});
		const content = new Blob([res as string]);
		downloadFile(URL.createObjectURL(content), `${projectStore.title || 'chart'}.html`);
	},
};

const exportResult = () => {
	exportFunctions[activeKeys.value]();
};

onMounted(async () => {
	const { result } = (await publishApi.getChartPicHtmlString({
		chartpic_id: visualStore.chartPicId,
	})) as { result: { data: string } };
	code.value = result.data;
});
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
