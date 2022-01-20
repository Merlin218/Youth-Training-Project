<template>
	<a-message />
	<img alt="Vue logo" src="./assets/logo.png" />
	<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
	<button class="test" @click="test">验证请求</button>
	<a-button type="primary"> Primary {{ aa }}</a-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import testApi from './api/modules/common';
import 'ant-design-vue/es/message/style';

const aa = ref('aaa');
const test = () =>
	testApi.test().then(res => {
		console.log(res);
	});
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
.test {
	color: $test-color;
}
</style>
