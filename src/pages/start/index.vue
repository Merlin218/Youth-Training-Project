<template>
	<div class="container">
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
			<div class="data-area__titlearea">
				<a-input v-model:value="titleContent" placeholder="请输入标题" />
			</div>
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
import { reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import tableData from '../../data/tableData';
import HandleFile from './components/HandleFile.vue';
import SelectSample from './components/SelectSample.vue';
import TextArea from './components/TextArea.vue';
import { useProjectStore } from '@/store/project';

export default {
	name: 'Start',
	components: { HandleFile, SelectSample, TextArea },
	setup() {
		const state = reactive({});
		const router = useRouter();
		const titleContent = ref<string>('');
		const projectStore = useProjectStore();
		// str 转为 json，多项情况删除数据 ，少项情况 value 为空
		// 少项 [{"学号":"10008","姓名":"伍容华","学历":""},{"学号":"20010","姓名":"王向容","学历":"硕士"}]
		const str2Json = () => {
			let strArr: Array<string> = projectStore.strContent.split('\n');
			if (strArr[strArr.length - 1] === '') {
				strArr = strArr.slice(0, strArr.length - 1);
			}
			const objectArr: Array<object> = [];
			console.log(111, projectStore.strContent);
			// 表头
			const header: Array<string> = strArr[0].split('\t');
			const body = strArr.slice(1);
			body.forEach((value: string) => {
				const obj: Object = {};
				value.split('\t').forEach((innerValue: string, index: number) => {
					if (index >= header.length) {
						return;
					}
					obj[header[index]] = innerValue;
				});
				objectArr.push(obj);
			});
			const jsonContent = JSON.stringify(objectArr);
			console.log(jsonContent);
			projectStore.updateJsonContent(jsonContent);
		};
		const handleJump = async () => {
			str2Json();
			// 提交文件信息	await submit();
			router.push({ path: `/preprocess` });
		};
		// 加载预选的数据
		const handleSelectedData = value => {
			projectStore.updateStrContent(tableData.table[value]);
		};
		return {
			...toRefs(state),
			handleJump,
			handleSelectedData,
			titleContent,
		};
	},
};
</script>
<style lang="scss" scoped>
.container {
	display: flex;
	.select-area,
	.data-area {
		flex: 1;
		padding: 40px;
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
	&__titlearea {
		margin-bottom: 10px;
	}
}
</style>
