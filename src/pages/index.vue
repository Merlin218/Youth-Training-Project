<template>
	<a-layout class="layout">
		<a-layout-header class="header">
			<div class="logo" />
			<template v-if="route.path !== '/login'">
				<a-menu theme="dark" :selected-keys="selectedKeys" :inline-collapsed="false" mode="horizontal" @select="handleMenuChange">
					<a-menu-item key="/projects"> 我的项目 </a-menu-item>
					<!-- <a-menu-item key="/start"> 开始 </a-menu-item>
					<a-menu-item key="/preprocess"> 预处理 </a-menu-item>
					<a-menu-item key="/visual"> 可视化 </a-menu-item>
					<a-menu-item key="/publish"> 发布 </a-menu-item> -->
				</a-menu>
				<template v-if="isLogin">
					<a-dropdown trigger="click">
						<a-avatar size="large" style="cursor: pointer">
							<UserOutlined />
						</a-avatar>
						<template #overlay>
							<a-menu>
								<a-menu-item key="1" @click="logout"> <LogoutOutlined /> 登出 </a-menu-item>
							</a-menu>
						</template>
					</a-dropdown>
				</template>
				<template v-else>
					<div>
						<a-button type="link" @click="toLogin"> 登录 </a-button>
					</div>
				</template>
			</template>
		</a-layout-header>
		<a-layout-content class="content">
			<div v-if="isShowSteps" class="stepWrapper">
				<a-steps v-model:current="stepStatus" size="small" type="navigation">
					<a-step title="开始" @click="handleMenuChange({ key: '/start' })" />
					<a-step title="预处理" @click="handleMenuChange({ key: '/preprocess' })" />
					<a-step title="可视化" @click="handleMenuChange({ key: '/visual' })" />
					<a-step title="发布" @click="handleMenuChange({ key: '/publish' })" />
				</a-steps>
			</div>
			<Scroller ref="scroller" :height="contentHeight" background-color="#fff" :style="{ borderRadius: `${isShowSteps ? '0 0 16px' : ''} 16px` }">
				<div class="scrollContent" :style="{ padding: '40px 20px' }">
					<router-view v-slot="{ Component }">
						<component :is="Component"></component>
					</router-view>
				</div>
			</Scroller>
		</a-layout-content>
		<a-layout-footer class="footer"> Chart ©2022 Created by BugRight </a-layout-footer>
	</a-layout>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons-vue';
import docCookies from '@/utils/cookie';
import { useMainStore } from '@/store/user';
import { loginApi } from '@/api';
import Scroller from '@/components/Scroller.vue';

const router = useRouter();
const route = useRoute();
const store = useMainStore();
const scroller = ref();

const selectedKeys = ref<Array<string>>([route.path]);
const stepStatus = ref(0);
const isLogin = ref<boolean>(!!docCookies.getItem('user'));

const isShowSteps = computed(() => route.path !== '/projects' && route.path !== '/login');

const contentHeight = computed(() => window.innerHeight - (isShowSteps.value ? 209 : 141));

const handleMenuChange = ({ key }: { key: string }) => {
	if (key.includes(selectedKeys.value[0])) return;
	selectedKeys.value = [key];
	['/start', '/preprocess', '/visual', '/publish'].forEach((item, index) => {
		if (route.path.includes(item)) {
			stepStatus.value = index;
		}
	});
	router.push(key);
	nextTick(() => {
		scroller.value.refreshScroll();
		scroller.value.scrollToTop(0);
	});
};

const toLogin = () => {
	router.push('/login');
};

const logout = async () => {
	await loginApi.logout();
	docCookies.removeItem('jwt_token', '/');
	docCookies.removeItem('user', '/');
	store.updateStatus();
	router.push('/login');
};

watch(
	() => route.path,
	newPath => {
		isLogin.value = !!docCookies.getItem('user');
		handleMenuChange({ key: newPath });
	}
);

onMounted(() => {
	scroller.value.refreshScroll();
});
</script>

<style lang="scss" scoped>
.layout .logo {
	width: 120px;
	height: 47px;
	background-image: url(../assets/logo.png);
	background-size: cover;
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
	background-color: transparent;
}
.content {
	padding: 0 50px;
	margin-top: 70px;
}
.stepWrapper {
	border-radius: 16px 16px 0 0;
	padding: 20px 100px 0;
	background-color: #fff;
}
.footer {
	text-align: center;
	position: relative;
	left: 0;
	right: 0;
}
:deep(.ant-menu-item) {
	border-radius: 16px;
	line-height: 35px;
}

:deep(.ant-menu-overflow, .ant-menu, .ant-menu-root, .ant-menu-horizontal, .ant-menu-dark) {
	background-color: transparent;
}
:deep(.ant-menu) {
	width: 400px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
:deep(.ant-menu-title-content) {
	color: rgb(108, 108, 108);
}

:deep(.ant-menu-item-selected .ant-menu-title-content) {
	color: white;
}

:deep(.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover) {
	background-color: rgb(255, 255, 255);
}
:deep(.ant-menu-item-selected:hover .ant-menu-title-content) {
	color: rgb(108, 108, 108);
}

:deep(.ant-message-notice-content) {
	border-radius: 16px !important;
}
</style>
