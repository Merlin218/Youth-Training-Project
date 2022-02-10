<template>
	<div>
		<a href="javascript:;" class="file">选择文件 <input type="file" accept=".xls,.xlsx,.csv" @change="readExcel" /> </a>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import * as XLSX from 'xlsx';
import { useProjectStore } from '@/store/project';

export default defineComponent({
	setup() {
		const projectStore = useProjectStore();
		const handleContent = strContent => {
			projectStore.updateStrContent(strContent);
		};
		const readExcel = e => {
			let strContent = '';
			const { files } = e.target;
			const fileReader = new FileReader();
			const fileReader2 = new FileReader();
			fileReader.onload = event => {
				const data = event.target.result;
				const workbook = XLSX.read(data, { type: 'array' });
				const wsname = workbook.SheetNames[0];
				const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
				Object.keys(ws[0]).forEach((value, index) => {
					if (index === Object.keys(ws[0]).length - 1) {
						strContent += `${value}\n`;
					} else {
						strContent += `${value}\t`;
					}
				});
				ws.forEach(value => {
					Object.values(value).forEach((innerValue, innerIndex) => {
						if (innerIndex === Object.values(value).length - 1) {
							strContent += `${innerValue}\n`;
						} else {
							strContent += `${innerValue}\t`;
						}
					});
				});
				handleContent(strContent);
			};
			// 判断是否是 xls/xlsx 或 csv ，由于 MIME 标准不同，不能使用 type 判断
			const reg = /.xls(|x)/;
			if (reg.test(files[0].name)) {
				fileReader.readAsArrayBuffer(files[0]);
			} else {
				fileReader2.onload = event => {
					// 变为 UTF8 BOM，解决乱码
					const blob = new Blob([`\ufeff${event.target.result}`], { type: 'text/csv; charset=utf-8' });
					fileReader.readAsArrayBuffer(blob);
					// handleContent(strContent);
					// const data = event.target.result;
					// const workbook = XLSX.read(data, { type: 'array' });
				};
				fileReader2.readAsText(files[0]);
			}
		};
		return {
			readExcel,
		};
	},
});
</script>

<style>
.file {
	position: relative;
	display: inline-block;
	background: #536dfe;
	border-radius: 16px;
	padding: 6px 18px;
	overflow: hidden;
	color: #fff;
	text-decoration: none;
	text-indent: 0;
	line-height: 20px;
	transition: box-shadow 0.3s;
}

.file input {
	position: absolute;
	opacity: 0;
	left: 0;
	top: 0;
	bottom: 0;
}
.file:hover {
	background: #536dfe;
	color: #fff;
	text-decoration: none;
	box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
}
</style>
