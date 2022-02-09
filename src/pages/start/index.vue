<template>
	<div class="container">
		<div class="bg"></div>
		<div class="select-area">
			<h2>您想如何上传数据？</h2>
			<div class="select-area__item select-area__upload">
				<h3>上传本地文件</h3>
				<p>您可以从计算机上传 CSV 或 Excel 文件。</p>
				<HandleFile />
			</div>
			<div class="select-area__item select-area__copy">
				<h3>复制并粘贴您的数据</h3>
				<p>在 Excel 中选择数据（包括标题行/列），然后将其粘贴到右侧的文本字段中。</p>
			</div>
			<div class="select-area__item select-area__sample">
				<h3>选择样本集</h3>
				<p>如果您只想尝试使用本产品，则可以使用以下示例数据集的列表：</p>
				<SelectSample @selected="handleSelectedData"></SelectSample>
			</div>
		</div>
		<div class="data-area">
			<div class="data-area__textarea">
				<TextArea />
			</div>
			<div class="data-area__next-step">
				<a-button type="primary" @click="handleJump()">下一步</a-button>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import tableData from '../../data/tableData';
import HandleFile from './components/HandleFile.vue';
import SelectSample from './components/SelectSample.vue';
import TextArea from './components/TextArea.vue';
import { useProjectStore } from '@/store/project';
import { startApi } from '@/api';
import { getProjectId } from './components/GetProjectId';

export default defineComponent({
	name: 'Start',
	components: { HandleFile, SelectSample, TextArea },
	setup() {
		const state = reactive({});
		const router = useRouter();
		const projectStore = useProjectStore();
		const projectId = getProjectId();
		const jsonContent = ref<string>('');
		// str 转为 json，多项情况删除数据 ，少项情况 value 为空
		const str2Json = () => {
			let strArr: Array<string> = projectStore.strContent.split('\n');
			if (strArr[strArr.length - 1] === '') {
				strArr = strArr.slice(0, strArr.length - 1);
			}
			const objectArr: Array<object> = [];
			// 表头
			// const header: Array<string> = strArr[0].split('\t');
			// 空格替换为下划线
			const header: Array<string> = strArr[0].split('\t').map(item => item.replaceAll(' ', '_'));
			const body = strArr.slice(1);
			body.forEach((value: string) => {
				const obj: Object = {};
				value.split('\t').forEach((innerValue: string, index: number) => {
					if (index >= header.length) {
						return;
					}
					// obj[header[index]] = innerValue;
					// 空格替换为下划线
					obj[header[index]] = innerValue.replaceAll(' ', '_');
				});
				objectArr.push(obj);
			});
			jsonContent.value = JSON.stringify(objectArr);
			projectStore.updateJsonContent(jsonContent.value);
		};
		// 加载预选的数据
		const handleSelectedData = value => {
			projectStore.updateStrContent(tableData.table[value]);
		};
		// 提交信息
		const handleSubmit = async () => {
			const res = await startApi.updateProjectData({
				project_id: projectId,
				data_string: jsonContent.value,
			});
			console.log(res);
			await startApi.updateProjectStatus({
				project_id: projectId,
			});
		};
		const handleJump = async () => {
			str2Json();
			await handleSubmit();
			router.push({ path: `/preprocess`, query: { project_id: projectId } });
		};
		return {
			...toRefs(state),
			handleJump,
			handleSelectedData,
		};
	},
});
</script>
<style lang="scss" scoped>
.container {
	min-height: 780px;
	display: flex;
	position: relative;
	.select-area,
	.data-area {
		flex: 1;
		padding: 40px;
		z-index: 1;
	}

	.bg {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 500px;
		height: 300px;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/city.4yghw7h3ti0w.webp');
	}
}

.select-area {
	&__item {
		margin: 40px 0;
	}
}

.data-area {
	&__next-step {
		margin: 20px 0;
		text-align: right;
	}
}
</style>
