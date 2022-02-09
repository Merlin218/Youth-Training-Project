<template>
	<div class="editor-wrapper">
		<a-button class="copy" @click="copyCode">复制代码</a-button>
		<textarea id="editor" v-model="code" style="height: 100% !important"></textarea>
	</div>
</template>

<script lang="ts" setup>
import { ref, unref, onMounted } from 'vue';
import ClipboardJS from 'clipboard';
import { message } from 'ant-design-vue';
import CodeMirror, { EditorConfiguration } from 'codemirror';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/htmlmixed/htmlmixed.js';
import 'codemirror/addon/lint/javascript-lint.js';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/selection/active-line';
import 'codemirror/theme/darcula.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/display/autorefresh';

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	readonly: {
		type: Boolean,
		default: false,
	},
});

const emit = defineEmits(['update:modelValue', 'init', 'input']);

const codeEditor = ref<any>(null);

const code = ref<string>(props.modelValue);
const options: EditorConfiguration = {
	mode: { name: 'htmlmixed', json: true }, // 不设置的话，默认使用第一个引用
	// 缩进格式
	tabSize: 2,
	// 主题，对应主题库 JS 需要提前引入
	theme: 'default',
	// 显示行号
	lineNumbers: true,
	gutters: ['CodeMirror-lint-markers'],
	lint: { options: { esversion: 2021 } },
	readOnly: props.readonly ? 'nocursor' : false, // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
	autoRefresh: true,
};

const initCodeEditor = () => {
	const editor = document.getElementById('editor') as HTMLTextAreaElement;
	codeEditor.value = CodeMirror.fromTextArea(editor, options);
	emit('init', unref(codeEditor));
	CodeMirror.signal(editor, 'change');
};

const initEditorEvent = () => {
	codeEditor.value.on('change', (instance: CodeMirror.Editor) => {
		emit('update:modelValue', instance.getValue());
		emit('input', instance.getValue());
	});
};

const copyCode = () => {
	const copy = new ClipboardJS('.copy', {
		text: () => {
			return code.value;
		},
	});
	copy.on('success', e => {
		message.success('复制成功');

		e.clearSelection();
	});
};

onMounted(() => {
	initCodeEditor();
	initEditorEvent();
});
</script>

<script lang="ts">
export default {
	name: 'CodeEditor',
};
</script>

<style lang="less" scoped>
.editor-wrapper {
	height: 100%;
	position: relative;
}
.copy {
	z-index: 99;
	position: absolute;
	top: 10px;
	right: 20px;
}
:deep(.CodeMirror) {
	height: 100%;
}
</style>
