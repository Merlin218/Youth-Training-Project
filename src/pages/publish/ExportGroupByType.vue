<template>
	<div class="card-wrapper">
		<a-card style="width: 100%" :tab-list="tabListNoTitle" :active-tab-key="activeKeys" @tab-change="(key:any) => onTabChange(key)">
			<div class="content">
				<template v-if="activeKeys === 'image'">
					<Image ref="image"></Image>
				</template>
				<template v-else-if="activeKeys === 'dataTable'">
					<DataTable ref="dataTable" :data="tableData"></DataTable>
				</template>
				<template v-else-if="activeKeys === 'code'">
					<CodeEditor v-model="code" :readonly="true"></CodeEditor>
				</template>
				<template v-else-if="activeKeys === 'multiple'">
					<MultipleForm></MultipleForm>
				</template>
			</div>
			<a-button type="primary" style="float: right; margin: 16px 10px" @click="toProjects">返回首页</a-button>
			<a-button type="primary" style="float: right; margin: 16px 10px" @click="exportResult">导出</a-button>
		</a-card>
	</div>
</template>

<script lang="ts" setup>
import { ref, inject, onMounted, watch, computed } from 'vue';
import * as XLSX from 'xlsx';
import { useRouter } from 'vue-router';
import Image from './components/Image.vue';
import DataTable from './components/DataTable.vue';
import CodeEditor from '@/components/CodeEditor.vue';
import MultipleForm from './components/MultipleForm.vue';
import { downloadFile } from '@/utils/download';
import { publishApi } from '@/api';
import { useVisualStore } from '@/store/visual';
import { useProjectStore } from '@/store/project';

type exportTypes = 'image' | 'dataTable' | 'code';

const props = defineProps<{
	chartData: any;
}>();

const visualStore = useVisualStore();
const projectStore = useProjectStore();

const image = ref({ exportType: 'png' });
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
const tableData = ref();
const getImgUrl = inject('getImgUrl') as () => string;
const chartpicId = computed(() => visualStore.chartPicId || projectStore.chartData[0].chartpic_id);
const fileTitle = computed(() => projectStore.title || projectStore.chartData[0].chart_title || 'chart');

watch(
	() => props.chartData,
	() => {
		getTableData();
	}
);

const getTableData = async () => {
	const res = await publishApi.getProjectsData({ project_id: projectStore.project_id });
	tableData.value = props.chartData.visConfig.data || JSON.parse(res.result.data).data;
};

const exportFunctions = {
	image: () => {
		downloadFile(getImgUrl(), `${fileTitle.value}.${image.value.exportType}`);
	},
	dataTable: () => {
		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(tableData.value || []);
		XLSX.utils.book_append_sheet(workbook, worksheet, 'sheet1');
		const workbookOut = XLSX.write(workbook, {
			bookType: 'xlsx',
			bookSST: false,
			type: 'binary',
		});
		const buf = new ArrayBuffer(workbookOut.length);
		const view = new Uint8Array(buf);
		// eslint-disable-next-line no-plusplus
		for (let i = 0; i !== workbookOut.length; ++i) {
			// eslint-disable-next-line no-bitwise
			view[i] = workbookOut.charCodeAt(i) & 0xff;
		}
		const url = URL.createObjectURL(new Blob([buf], { type: 'application/octet-stream' }));
		downloadFile(url, `${fileTitle.value}.xlsx`);
	},
	code: async () => {
		const res = await publishApi.getChartPicHtmlFile({
			chartpic_id: chartpicId.value,
		});
		const content = new Blob([res as string]);
		downloadFile(URL.createObjectURL(content), `${fileTitle.value}.html`);
	},
};

const exportResult = () => {
	exportFunctions[activeKeys.value]();
};

onMounted(async () => {
	const { result } = (await publishApi.getChartPicHtmlString({
		chartpic_id: chartpicId.value,
	})) as { result: { data: string } };
	code.value = result.data;
});

const router = useRouter();

const toProjects = () => {
	router.push('/projects');
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
