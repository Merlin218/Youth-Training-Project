<template>
	<a-textarea v-model:value="value" placeholder="表单内容" :auto-size="{ minRows: 20, maxRows: 20 }" @keydown.tab.prevent="handleTab" />
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useProjectStore } from '@/store/project';

export default defineComponent({
	setup() {
		const value = ref<string>('');
		const projectStore = useProjectStore();
		watch(projectStore, newValue => {
			value.value = newValue.strContent;
		});
		watch(value, newValue => {
			projectStore.updateStrContent(newValue);
		});
		// 阻止 tab 默认行为，可以在文本框中输入 tab
		const handleTab = () => {
			const textarea = document.getElementsByTagName('textarea')[0];
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			textarea.value = `${textarea.value.substring(0, start)}\t${textarea.value.substring(end)}`;
			textarea.selectionStart = start + 1;
			textarea.selectionEnd = end + 1;
		};
		return {
			value,
			handleTab,
		};
	},
});
</script>

<style lang="scss" scoped>
textarea {
	resize: none;
}
</style>
