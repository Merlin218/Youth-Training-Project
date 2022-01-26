<template>
	<a-layout id="components-layout-demo-top" class="layout">
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
		<a-layout-content style="padding: 0 50px">
			<a-breadcrumb style="margin: 16px 0">
				<a-breadcrumb-item>{{ $route.name }}</a-breadcrumb-item>
			</a-breadcrumb>
			<div :style="{ background: '#fff', padding: '24px', minHeight: `${contentMinHeight}px` }">
				<router-view v-slot="{ Component }">
					<transition :name="$route.meta.transition as string || 'fade'" mode="out-in">
						<keep-alive>
							<component :is="Component"></component>
						</keep-alive>
					</transition>
				</router-view>
			</div>
		</a-layout-content>
		<a-layout-footer class="footer"> Ant Design ©2018 Created by Ant UED </a-layout-footer>
	</a-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const selectedKeys = ref([route.path]);

const contentMinHeight = window.innerHeight * 0.8;

const handleMenuChange = ({ key }: { key: string }) => {
	router.push(key);
};
</script>

<style lang="scss">
#components-layout-demo-top .logo {
	width: 120px;
	height: 31px;
	background: rgba(255, 255, 255, 0.2);
	margin: 16px 24px 16px 0;
}
.header {
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.footer {
	text-align: center;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
}
</style>
