<template>
	<div class="container">
		<div class="new-project">
			<a-button type="primary" size="large" @click="handleCreate">
				<template #icon>
					<PlusOutlined />
				</template>
				新建项目
			</a-button>
		</div>
		<div class="project">
			<div class="edit-recently recently">
				<h2>最近编辑</h2>
				<ProjectList :project-list="recentEdit" />
			</div>
			<div class="divider" />
			<div class="post-recently recently">
				<h2>最近发布</h2>
				<ProjectList :project-list="recentPost" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, ref } from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import { projectsApi } from '@/api';
import ProjectList from './components/ProjectList.vue';

export default {
	name: 'Projects',
	components: {
		ProjectList,
		PlusOutlined,
	},
	setup() {
		const state = reactive({});
		const router = useRouter();
		let recentProject: Array<Object> = [];
		const recentEdit = ref([]);
		const recentPost = ref([]);
		onMounted(async () => {
			const res = await projectsApi.getAllProjects();
			console.log(res);
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
				// 显示图片，若没有图片则用默认图片代替
				if (value.index_pic === null) {
					value.index_pic = 'src/assets/default.png';
				}
				if (showValue.share_hash !== '') {
					recentPost.value.push(value);
				} else {
					recentEdit.value.push(value);
				}
			});
		});
		const handleJump = item => {
			let path = '';
			if (item.share_hash !== '') {
				path = '/publish';
			} else if (item.third_finished === 1) {
				path = '/publish';
			} else if (item.second_finished === 1) {
				path = '/visual';
			} else if (item.first_finished === 1) {
				path = '/preprocess';
			} else {
				path = '/start';
			}
			router.push({ path, query: { id: item.id } });
		};
		const handleCreate = async () => {
			router.push({ path: '/start' });
		};

		return {
			...toRefs(state),
			recentEdit,
			recentPost,
			handleJump,
			handleCreate,
		};
	},
};
</script>
<style lang="scss" scoped>
h2 {
	margin-bottom: 20px;
}

.container {
	margin: 0 40px 60px 40px;
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
</style>
