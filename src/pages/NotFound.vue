<!--
 * @Author: Merlin218
 * @Date: 2022-02-10 10:26:51
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 10:39:18
 * @Description: 404
-->
<template>
	<div class="container">
		<div class="pic"></div>
		<a-button type="primary" @click="backToProjects">返回首页</a-button>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const backToProjects = () => {
	router.push('/projects');
};
</script>

<style lang="less" scoped>
.container {
	width: 100vw;
	height: 100vh;
	display: flex;
	flex-flow: column;
	justify-content: center;
	align-items: center;
	.pic {
		width: 500px;
		height: 500px;
		background-image: url('https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/404.2nqqy9fq0fwg.webp');
		background-size: contain;
		background-repeat: no-repeat;
	}
}
</style>
