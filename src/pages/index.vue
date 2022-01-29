<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<div class="logo" />
			<a-menu theme="dark" :selected-keys="selectedKeys" :inline-collapsed="false" mode="horizontal" @select="handleMenuChange">
				<a-menu-item key="/projects"> 项目 </a-menu-item>
				<a-menu-item key="/start"> 开始 </a-menu-item>
				<a-menu-item key="/preproccess"> 预处理 </a-menu-item>
				<a-menu-item key="/chart"> 绘图 </a-menu-item>
				<a-menu-item key="/publish"> 发布 </a-menu-item>
			</a-menu>
			<a-avatar size="large" icon="user" />
		</a-layout-header>
		<a-layout-content class="content">
			<div :style="{ background: '#fff', padding: '24px', minHeight: `${contentMinHeight}px` }">
				<router-view v-slot="{ Component }">
					<keep-alive>
						<component :is="Component"></component>
					</keep-alive>
				</router-view>
			</div>
		</a-layout-content>
		<a-layout-footer class="footer"> Chart ©2022 Created by BugRight </a-layout-footer>
	</a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const selectedKeys = ref<Array<string>>([route.path]);

const contentMinHeight = window.innerHeight * 0.8;

const handleMenuChange = ({ key }: { key: string }) => {
	selectedKeys.value = [key];
	router.push(key);
};
</script>

<style lang="scss">
.layout .logo {
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
}
.header {
	z-index: 99;
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.content {
	padding: 0 50px;
	margin-top: 100px;
}
.footer {
	margin-top: 50px;
	text-align: center;
	position: relative;
	left: 0;
	right: 0;
}
</style>
