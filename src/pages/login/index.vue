<template>
	<div>我是登录页面</div>
</template>

<script lang="ts">
import { reactive, toRefs, onMounted } from 'vue';

export default {
	name: 'Login',
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
