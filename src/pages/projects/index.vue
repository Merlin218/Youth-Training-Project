<template>
	<div class="container">
		<div class="bg"></div>
		<div class="new-project">
			<h1 class="username">您好，{{ username }}</h1>
			<Modal />
		</div>
		<div class="project">
			<div class="edit-recently recently">
				<h2 class="title">
					最近编辑
					<a-button class="sort" @click="handleReverseEditList"><FilterOutlined />{{ reverseEditList === false ? '最早创建' : '最近创建' }}</a-button>
				</h2>
				<ProjectList :project-list="recentEdit" />
			</div>
			<div class="divider" />
			<div class="post-recently recently">
				<h2 class="title">
					最近发布
					<a-button class="sort" @click="handleReversePostList"><FilterOutlined />{{ reversePostList === false ? '最早创建' : '最近创建' }}</a-button>
				</h2>
				<ProjectList :project-list="recentPost" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, ref, defineComponent, provide, computed } from 'vue';
import { FilterOutlined } from '@ant-design/icons-vue';
import { projectsApi } from '@/api';
import ProjectList from './components/ProjectList.vue';
import Modal from './components/Modal.vue';
import { useMainStore } from '@/store/user';

export default defineComponent({
	name: 'Projects',
	components: {
		ProjectList,
		Modal,
		FilterOutlined,
	},
	setup() {
		const store = useMainStore();
		const username = computed(() => store.username);
		const state = reactive({});
		let recentProject: Array<Object> = [];
		const recentEdit = ref([]);
		const recentPost = ref([]);
		const reverseEditList = ref(false);
		const reversePostList = ref(false);
		const loadList = async () => {
			const res = await projectsApi.getAllProjects();
			console.log(res);
			recentEdit.value = [];
			recentPost.value = [];
			recentProject = res.result.data;
			recentProject.forEach(value => {
				const showValue = value;
				// 显示最近修改时间
				const modifyTimeStamp = new Date(value.modify_time).valueOf();
				const nowTimeStamp = new Date().valueOf();
				let time: string = '';
				const day: number = (nowTimeStamp - modifyTimeStamp) / (1000 * 60 * 60 * 24);
				if (day >= 1) {
					time = `最近编辑于 ${day.toFixed(0)} 天前`;
				} else {
					const hour: number = (nowTimeStamp - modifyTimeStamp) / (1000 * 60 * 60);
					if (hour >= 1) {
						time = `最近编辑于 ${hour.toFixed(0)} 小时前`;
					} else {
						const minute: number = (nowTimeStamp - modifyTimeStamp) / (1000 * 60);
						time = `最近编辑于 ${minute.toFixed(0)} 分钟前`;
					}
				}
				value.time = time;
				if (showValue.index_pic !== null) {
					recentPost.value.push(value);
				} else {
					recentEdit.value.push(value);
				}
			});
			console.log(recentEdit.value);
		};
		const handleReverseEditList = () => {
			reverseEditList.value = !reverseEditList.value;
			recentEdit.value.reverse();
		};
		const handleReversePostList = () => {
			reversePostList.value = !reversePostList.value;
			recentPost.value.reverse();
		};
		const refreshList = () => {
			loadList();
		};
		provide('refreshList', refreshList);
		onMounted(() => {
			loadList();
		});
		return {
			...toRefs(state),
			recentEdit,
			recentPost,
			username,
			reverseEditList,
			handleReverseEditList,
			reversePostList,
			handleReversePostList,
		};
	},
});
</script>
<style lang="scss" scoped>
h2 {
	margin-bottom: 20px;
}

.container {
	margin: 0 40px 60px 40px;
	position: relative;
	.new-project {
		display: flex;
		align-items: center;
		justify-content: space-between;
		.username {
			font-size: 34px;
			line-height: 34px;
			height: 34px;
			margin: 0;
		}
	}
	.new-project,
	.project {
		z-index: 1;
	}
	.bg {
		position: absolute;
		top: 430px;
		right: -90px;
		width: 500px;
		height: 300px;
		background-repeat: no-repeat;
		background-size: contain;
		background-image: url('https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/projects.1gg9dh8halfk.webp');
	}
}

.project {
	display: flex;
}

.recently {
	margin: 20px 0 40px 0;
}

.edit-recently {
	flex: 2;
}

.post-recently {
	flex: 1;
	padding-left: 40px;
	border-left: 2px dashed #eee;
}

.title {
	position: relative;
	.sort {
		position: absolute;
		left: 100px;
		top: 2px;
	}
}
</style>
