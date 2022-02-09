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
			<div v-if="item.index_pic" class="recently__item__picture" :style="{ 'background-image': `url(${item.index_pic})` }"></div>
			<div v-else class="recently__item__default">暂无图片</div>
			<a-tag v-if="item.first_finished === 1" color="orange">开始</a-tag>
			<a-tag v-if="item.second_finished === 1" color="green">预处理</a-tag>
			<a-tag v-if="item.third_finished === 1" color="cyan">绘图</a-tag>
			<a-tag v-if="item.share_hash !== ''" color="blue">发布</a-tag>
		</div>
	</div>
</template>

<script>
import { defineComponent, toRefs } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	name: 'ProjectList',
	props: {
		projectList: {
			type: Array,
			required: true,
		},
	},
	setup(props) {
		// eslint 规范
		const { projectList: recentList } = toRefs(props);
		const router = useRouter();
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
			router.push({ path, query: { project_id: item.project_id } });
		};

		return {
			recentList,
			handleJump,
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
	&__item {
		position: relative;
		height: 300px;
		padding: 14px 25px;
		border-radius: 8px;
		border: 2px solid #eee;
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
			margin-bottom: 4px;
			background-color: #f5f7fa;
			display: flex;
			justify-content: space-around;
			align-items: center;
			color: #999;
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
			right: 25px;
		}
	}
}
</style>
