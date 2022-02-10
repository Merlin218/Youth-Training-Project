<template>
	<div class="recently__list">
		<a-empty v-if="recentList.length === 0" />
		<div v-for="item in recentList" v-else :key="item.id" class="recently__item" @click="handleJump(item)">
			<h3 class="recently__item__title">{{ item.project_name }}</h3>
			<p class="recently__item__edit-time">{{ item.time }}</p>
			<a-popover title="详细信息">
				<template #content>
					<p>项目名称：{{ item.project_name }}</p>
					<p>创建用户：{{ item.user_name }}</p>
					<p>创建日期：{{ item.create_time.slice(0, 19).replace('T', ' ') }}</p>
					<p>最近修改：{{ item.modify_time.slice(0, 19).replace('T', ' ') }}</p>
				</template>
				<a-button size="small" type="link" class="recently__item__detail">详情</a-button>
			</a-popover>
			<a-popover title="删除项目">
				<template #content>
					<p>确定要删除项目吗？</p>
					<a-button danger @click="() => handleDelete(item)">删除</a-button>
				</template>
				<a-button size="small" type="link" class="recently__item__delete">删除</a-button>
			</a-popover>
			<div v-if="item.index_pic" class="recently__item__picture" :style="{ 'background-image': `url(${item.index_pic})` }"></div>
			<div v-else class="recently__item__default"></div>
			<a-tag v-if="item.first_finished === 1" color="orange">开始</a-tag>
			<a-tag v-if="item.second_finished === 1" color="green">预处理</a-tag>
			<a-tag v-if="item.third_finished === 1" color="cyan">绘图</a-tag>
			<a-tag v-if="item.index_pic !== null" color="blue">发布</a-tag>
		</div>
	</div>
</template>

<script>
import { defineComponent, toRefs, inject } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/store/project';
import { projectsApi, visualApi } from '@/api';

export default defineComponent({
	name: 'ProjectList',
	props: {
		projectList: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		const { projectList: recentList } = toRefs(props);
		const refreshList = inject('refreshList');
		console.log(inject('refreshList'));
		const router = useRouter();
		const projectStore = useProjectStore();
		const handleJump = async item => {
			let path = '';
			if (item.index_pic !== null || item.third_finished === 1) {
				path = '/publish';
			} else if (item.second_finished === 1) {
				path = '/visual';
			} else if (item.first_finished === 1) {
				path = '/preprocess';
			} else {
				path = '/start';
			}
			projectStore.updateProjectId(item.project_id);
			const res = await visualApi.getAllChartPic(item.project_id);
			projectStore.updateChartData(res.result.data);
			console.log(11212, projectStore.chartData);
			router.push({ path, query: { project_id: item.project_id } });
		};
		const handleDelete = async item => {
			await projectsApi.deleteProject({ project_id: item.project_id });
			refreshList();
		};
		return {
			recentList,
			handleJump,
			handleDelete,
		};
	},
});
</script>

<style lang="scss" scoped>
.recently {
	&__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, 300px);
		grid-template-rows: repeat(auto-fill, 300px);
		grid-gap: 20px;
	}
	&__item:hover {
		box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
	}
	&__item {
		position: relative;
		transition: box-shadow 0.3s;
		height: 300px;
		padding: 14px 25px;
		border-radius: 16px;
		border: 1px solid #eee;
		background-color: #fff;
		&__picture {
			height: 190px;
			width: 250px;
			margin-bottom: 4px;
			background-size: contain;
			background-repeat: no-repeat;
			background-position: center;
		}
		&__default {
			height: 190px;
			width: 250px;
			background-image: url('https://cdn.jsdelivr.net/gh/Merlin218/image-storage@master/picX/undraw_Traveling_re_weve.g32zkgx32og.webp');
			background-repeat: no-repeat;
			background-size: contain;
			opacity: 0.3;
		}
		&__title {
			font-weight: 700;
			margin-bottom: 6px;
		}
		&__edit-time {
			color: #555;
			font-size: 13px;
			margin-bottom: 4px;
		}
		&__detail {
			position: absolute;
			top: 44px;
			right: 68px;
		}
		&__delete {
			position: absolute;
			top: 44px;
			right: 25px;
		}
	}
}
</style>
