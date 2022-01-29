<template>
	<div class="editor-wrapper">
		<textarea id="editor" v-model="code" style="height: 100% !important"></textarea>
	</div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import CodeMirror, { EditorConfiguration } from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/hint/show-hint.css';

// const props = defineProps({
// 	theme: {
// 		type
// 	},

// })

let codeEditor = ref<any>(null);

const fakeCode = 'function myScript(){return 100;}\n';
const code = ref<string>(fakeCode);
const options: EditorConfiguration = {
	mode: { name: 'javascript', json: true }, // 不设置的话，默认使用第一个引用
	// 缩进格式
	tabSize: 2,
	// 主题，对应主题库 JS 需要提前引入
	theme: 'default',
	// 显示行号
	lineNumbers: true,
	readOnly: 'nocursor', // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
};

const initCodeEditor = () => {
	const editor = document.getElementById('editor') as HTMLTextAreaElement;
	codeEditor = CodeMirror.fromTextArea(editor, options);
	codeEditor;
};

onMounted(() => {
	initCodeEditor();
});
</script>

<style lang="less" scoped>
.editor-wrapper {
	height: 100%;
}
:deep(.CodeMirror) {
	height: 100%;
}
</style>
