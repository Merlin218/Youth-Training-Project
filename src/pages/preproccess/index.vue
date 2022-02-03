<template>
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
		<a-button type="primary" @click="showModal(0)">下一步</a-button>
		<a-button type="primary" @click="showModal(1)">保存表格</a-button>
	</section>
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
import { useTableStore } from '../../store/process';
import TableEditor from './preproccess/TableEditor.vue';
import FieldSelect from './preproccess/FieldSelect.vue';
import FieldDefine from './preproccess/FieldDefine.vue';

const store = useTableStore();
const { table } = store;

// 请求表格
onMounted(async () => {
	if (!(await store.getTable())) {
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
	save1: false,
	save2: true,
	curType: 0,
});

// 显示下一步模态框
function showModal(type: number) {
	state.curType = type;
	state.expVis = true;
}

// 下一步与保存数据按钮
function nextStep() {
	if (table.cols.find(d => !d.computed && d?.errors?.haveError)) {
		message.error('存在有误数据, 无法继续');
		state.expVis = false;
		return;
	}
	store.tableExport = table.exportTable(state.save1, state.save2);
	if (state.curType) {
		store.putTable().then(
			() => {
				message.success('保存成功');
			},
			() => {
				message.error('保存失败');
			}
		);
	}
}
</script>
<style lang="less" scoped>
* {
	box-sizing: border-box;
}

header {
	height: 10%;
}

#tableSelects {
	max-height: 50%;
	display: flex;
	#TableEditor {
		padding: 3vh 2vw;
		width: 70%;
		overflow: auto;
	}
	#FieldSelect {
		padding: 3vh 2vw;
		width: 30%;
		overflow: auto;
	}
}

#FiledDefs {
	height: 30%;
	padding: 3vh 2vw;
}

#tableSubmit {
	height: 10%;
	display: flex;
	flex-direction: row-reverse;
}
</style>
