<template>
	<HelloWorld></HelloWorld>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';

export default {
	name: 'Start',
	setup() {
		const state = reactive({});

		onMounted(() => {});

		return {
			...toRefs(state),
		};
	},
};
</script>
<style lang="less" scoped></style>
