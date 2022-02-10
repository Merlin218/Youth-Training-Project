<template>
	<a-button type="primary" size="large" @click="handleCreate">
		<template #icon>
			<PlusOutlined />
		</template>
		新建项目
	</a-button>
	<a-modal v-model:visible="visible" title="新建项目" @ok="handleOk">
		<p>为你的新项目起一个名字</p>
		<a-input v-model:value="value" placeholder="项目名称" />
	</a-modal>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
import { projectsApi } from '@/api';
import { useProjectStore } from '@/store/project';

export default defineComponent({
	components: {
		PlusOutlined,
	},
	setup() {
		const router = useRouter();
		const projectStore = useProjectStore();
		const visible = ref<boolean>(false);
		const value = ref<string>('');
		const handleOk = async () => {
			const res = await projectsApi.addProject({
				project_name: value.value,
			});
			console.log(res);
			visible.value = false;
			const { project_id: projectId } = res.result.data;
			projectStore.updateProjectId(projectId);
			router.push({ path: '/start', query: { project_id: projectId } });
		};

		const handleCreate = async () => {
			visible.value = true;
		};

		return {
			visible,
			handleOk,
			handleCreate,
			value,
		};
	},
});
</script>
