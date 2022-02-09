/* eslint-disable camelcase */
import { useRouter, useRoute } from 'vue-router';
import { message } from 'ant-design-vue';
import { useProjectStore } from '@/store/project';

export const getProjectId = () => {
	const router = useRouter();
	const route = useRoute();
	const projectStore = useProjectStore();
	const { project_id } = route.query;
	let projectId = project_id;
	// query 参数的 project_id 为空则使用 store 的 project_id
	// 若 store 的 project_id 也为空则跳转到项目页面
	if (projectId === undefined) {
		if (projectStore.project_id === '') {
			router.push({ path: `/projects` });
			message.warning('请先选择一个项目', 2);
		} else {
			projectId = projectStore.project_id;
		}
	}
	return projectId;
};
