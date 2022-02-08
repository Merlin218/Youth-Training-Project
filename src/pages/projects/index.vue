<template>
	<div class="container">
		<div class="new-project">
			<a-button type="primary" @click="handleCreate">新建项目</a-button>
		</div>
		<div class="project">
			<div class="edit-recently recently">
				<h2>最近编辑</h2>
				<div class="recently__list edit-recently__list">
					<div v-for="item in recentEdit" :key="item.id" class="recently__item edit-recently__item" @click="handleJump(item)">
						<h3 class="recently__item__title">{{ item.project_name }}</h3>
						<p class="recently__item__edit-time">最近编辑于 {{ item.day }} 天前</p>
						<a-popover title="详细信息">
							<template #content>
								<p>创建日期：{{ item.create_time.slice(0, 19).replace('T', ' ') }}</p>
								<p>最近修改：{{ item.modify_time.slice(0, 19).replace('T', ' ') }}</p>
							</template>
							<a-button size="small" type="link" class="recently__item__detail">详情</a-button>
						</a-popover>
						<div class="recently__item__picture" :style="{ 'background-image': `url(${item.picture})` }"></div>
						<a-tag v-if="item.first_finished === 1" color="orange">开始</a-tag>
						<a-tag v-if="item.second_finished === 1" color="green">预处理</a-tag>
						<a-tag v-if="item.third_finished === 1" color="cyan">绘图</a-tag>
						<a-tag v-if="item.share_hash !== ''" color="blue">发布</a-tag>
					</div>
				</div>
			</div>
			<div class="post-recently recently">
				<h2>最近发布</h2>
				<div class="recently__list post-recently__list">
					<div v-for="item in recentPost" :key="item.id" class="recently__item edit-recently__item" @click="handleJump(item)">
						<h3 class="recently__item__title">{{ item.project_name }}</h3>
						<p class="recently__item__edit-time">最近编辑于 {{ item.day }} 天前</p>
						<a-popover title="详细信息">
							<template #content>
								<p>创建日期：{{ item.create_time.slice(0, 19).replace('T', ' ') }}</p>
								<p>最近修改：{{ item.modify_time.slice(0, 19).replace('T', ' ') }}</p>
							</template>
							<a-button size="small" type="link" class="recently__item__detail">详情</a-button>
						</a-popover>
						<div class="recently__item__picture" :style="{ 'background-image': `url(${item.picture})` }"></div>
						<a-tag v-if="item.first_finished === 1" color="orange">开始</a-tag>
						<a-tag v-if="item.second_finished === 1" color="green">预处理</a-tag>
						<a-tag v-if="item.third_finished === 1" color="cyan">绘图</a-tag>
						<a-tag v-if="item.share_hash !== ''" color="blue">发布</a-tag>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { reactive, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useProjectStore } from '@/store/project';

const recentPoject = [
	{
		data_type: 1,
		data_string: '{}',
		first_finished: 1, // 1为第一步新建项目完成，-1为没有
		second_finished: -1, // 1为第二步数据预处理完成，-1为没有
		third_finished: -1, // 1为第三步可视化配置完成，-1为没有
		share_hash: '', // 分享的hash地址
		id: 6,
		user_name: 'alexzhli',
		project_name: 'BUG都写对项目',
		project_id: '32958067-a627-4b64-abaa-43c52734b649',
		create_time: '2022-02-01T18:14:38.714Z',
		modify_time: '2022-02-01T18:14:38.714Z',
		// picture: 'https://img.datawrapper.de/7Svd1/96fae3462e57e71e8e8f9f87ae349638/plain.png',
	},
	{
		data_type: 1,
		data_string: '{}',
		first_finished: 1, // 1为第一步新建项目完成，-1为没有
		second_finished: 1, // 1为第二步数据预处理完成，-1为没有
		third_finished: -1, // 1为第三步可视化配置完成，-1为没有
		share_hash: '', // 分享的hash地址
		id: 6,
		user_name: 'alexzhli',
		project_name: 'BUG都写对项目',
		project_id: '32958067-a627-4b64-abaa-43c52734b649',
		create_time: '2022-02-01T18:14:38.714Z',
		modify_time: '2022-02-01T18:14:38.714Z',
	},
	{
		data_type: 1,
		data_string: '{}',
		first_finished: 1, // 1为第一步新建项目完成，-1为没有
		second_finished: 1, // 1为第二步数据预处理完成，-1为没有
		third_finished: 1, // 1为第三步可视化配置完成，-1为没有
		share_hash: '', // 分享的hash地址
		id: 6,
		user_name: 'alexzhli',
		project_name: 'BUG都写对项目',
		project_id: '32958067-a627-4b64-abaa-43c52734b649',
		create_time: '2022-02-01T18:14:38.714Z',
		modify_time: '2022-02-01T18:14:38.714Z',
	},
	{
		data_type: 1,
		data_string: '{}',
		first_finished: 1, // 1为第一步新建项目完成，-1为没有
		second_finished: 1, // 1为第二步数据预处理完成，-1为没有
		third_finished: 1, // 1为第三步可视化配置完成，-1为没有
		share_hash: '111', // 分享的hash地址
		id: 6,
		user_name: 'alexzhli',
		project_name: 'BUG都写对项目',
		project_id: '32958067-a627-4b64-abaa-43c52734b649',
		create_time: '2022-02-01T18:14:38.714Z',
		modify_time: '2022-02-01T18:14:38.714Z',
	},
];

const id = 10001;

export default {
	name: 'Projects',
	setup() {
		const state = reactive({});
		const router = useRouter();
		const projectStore = useProjectStore();
		const recentEdit = [];
		const recentPost = [];
		recentPoject.forEach(value => {
			const showValue = value;
			const modifyTimeStamp = new Date(value.modify_time).valueOf();
			const nowTimeStamp = new Date().valueOf();
			const day = (nowTimeStamp - modifyTimeStamp) / (1000 * 60 * 60 * 24);
			value.day = day.toFixed(0);
			if (showValue.share_hash !== '') {
				recentPost.push(value);
			} else {
				recentEdit.push(value);
			}
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
			router.push({ path });
		};
		const handleCreate = async () => {
			// await createRequest(); 获取 id
			projectStore.updateId(id);
			router.push({ path: `/start` });
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

.recently {
	margin: 20px 0 40px 0;
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

.project {
	display: flex;
}

.edit-recently {
	flex: 2;
}

.post-recently {
	flex: 1;
	padding-left: 20px;
	border-left: 2px dashed #eee;
}
</style>
