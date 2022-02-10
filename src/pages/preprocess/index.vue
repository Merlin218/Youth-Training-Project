<template>
	<div class="wapper">
		<header>
			<a-row>
				<a-col :span="3"> 选定数据源 </a-col>
				<a-col :span="9"> {{ table.title }} </a-col>
			</a-row>
		</header>
		<section id="tableSelects">
			<div id="TableEditor">
				<TableEditor></TableEditor>
			</div>
			<div id="FieldSelect">
				<FieldSelect></FieldSelect>
			</div>
		</section>
		<section id="FiledDefs">
			<FieldDefine></FieldDefine>
		</section>
		<section id="tableSubmit">
			<a-button type="primary" style="margin-left: 10px" @click="showModal(0)">下一步</a-button>
			<a-button type="primary" @click="showModal(1)">保存表格</a-button>
		</section>
	</div>
	<div>
		<a-modal v-model:visible="state.expVis" title="使用哪些数据?" @ok="nextStep">
			<a-form>
				<a-form-item label="使用选定数据?">
					<a-radio-group v-model:value="state.save1">
						<a-radio :value="true">使用选定的字段</a-radio>
						<a-radio :value="false">使用全部字段</a-radio>
					</a-radio-group>
				</a-form-item>
				<a-form-item label="使用筛选后数据?">
					<a-radio-group v-model:value="state.save2">
						<a-radio :value="true">使用筛选后数据</a-radio>
						<a-radio :value="false">使用全部数据</a-radio>
					</a-radio-group>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { message, notification } from 'ant-design-vue';
import { /* useRoute, */ useRouter } from 'vue-router';
import { useTableStore } from '../../store/process';
import TableEditor from './preprocess/TableEditor.vue';
import FieldSelect from './preprocess/FieldSelect.vue';
import FieldDefine from './preprocess/FieldDefine.vue';
import { TableCol } from './preprocess/ProTable';
import { getProjectId } from '../start/components/GetProjectId';
import { startApi } from '@/api';

const store = useTableStore();
const { table } = store;
const router = useRouter();
// const route = useRoute();
const projectId = getProjectId();

// 请求表格
onMounted(async () => {
	// projectStore.updateProjectId(projectStore.project_id || route.query.project_id);
	store.project_id = projectId;
	if (!(await store.getTable(store.project_id))) {
		notification.open({
			message: '网络错误',
			description: '请求数据失败, 请检查你的网络.',
			duration: 0,
		});
	}
});

// 下一步模态框状态
const state = reactive({
	expVis: false,
	save1: true,
	save2: true,
	curType: 0,
});

// 显示下一步模态框
function showModal(type: number) {
	state.curType = type;
	state.expVis = true;
}

// 下一步与保存数据按钮
async function nextStep() {
	if (!table.geted) {
		message.error('表格获取失败');
		state.expVis = false;
		return;
	}
	if (table.cols.find(d => !d.computed && d?.errors?.haveError)) {
		message.error('存在有误数据, 无法继续');
		state.expVis = false;
		return;
	}
	store.tableExport = table.exportTable(state.save1, state.save2);
	if (state.curType) {
		store.putTable(store.project_id).then(
			d => {
				if (!d.code) {
					message.success('保存成功');
					state.expVis = false;
				} else {
					message.error('保存失败');
				}
			},
			() => {
				message.error('保存失败');
			}
		);
	} else {
		const compCols = store.tableExport.cols.filter(d => TableCol.colType.find(dd => dd.typeName === d.type)?.compareable);
		const uncompCols = store.tableExport.cols.filter(d => !TableCol.colType.find(dd => dd.typeName === d.type)?.compareable);
		if (!compCols.length) {
			message.error('可计算字段数少于1');
			return;
		}
		store.tableExport.x = uncompCols.slice(0).shift().cKey || compCols.slice(0).shift().cKey;
		store.tableExport.y = compCols.slice(0).pop().cKey;
		await startApi.updateProjectStatus({
			project_id: store.project_id,
			second_finished: 1,
		});
		router.push('visual');
	}
}
</script>
<style lang="less" scoped>
* {
	box-sizing: border-box;
}

.wapper {
	height: calc(100vh - 240px);
	width: 100%;
	overflow: hidden;
}

header {
	height: 40px;
}

#tableSelects {
	height: calc(55% - 40px);
	display: flex;
	#TableEditor {
		height: 100%;
		padding: 3vh 2vw;
		width: 70%;
		overflow: auto;
	}
	#FieldSelect {
		height: 100%;
		padding: 3vh 2vw;
		width: 30%;
		overflow: auto;
	}
}

#FiledDefs {
	overflow: auto;
	height: calc(45% - 40px);
	padding: 1vh 2vw;
}

#tableSubmit {
	overflow: auto;
	height: 40px;
	display: flex;
	flex-direction: row-reverse;
	margin-right: 20px;
}
</style>
