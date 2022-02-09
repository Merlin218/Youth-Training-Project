<template>
	<div class="title">
		<h3>选择您需要的数据</h3>
		<a-button type="primary" ghost @click="toggleCompModal"><PlusOutlined />计算属性</a-button>
	</div>
	<div class="table">
		<a-table :row-key="(record:any) => record.cid" :pagination="false" :row-selection="rowSelection" :columns="colName" :data-source="colData">
			<template #name="{ text }">
				<a>{{ text }}</a>
			</template>
		</a-table>
	</div>
	<div>
		<a-modal v-model:visible="state.showCompModal" title="定义计算属性列" @ok="submitComp">
			<a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 14 }">
				<a-form-item label="字段名">
					<a-input v-model:value="state.compTitle" />
				</a-form-item>
				<a-form-item label="表达式">
					<a-select
						v-model:value="state.rawEquation"
						:options="state.compCols"
						mode="multiple"
						placeholder="Please select"
						style="width: 200px"
						@change="addColTag"
						@dropdown-visible-change="addSelec"
					>
					</a-select>
				</a-form-item>
			</a-form>
			注: 只有number, date, boolean类型数据支持参与运算
		</a-modal>
	</div>
</template>

<script lang="ts" setup>
import { computed, reactive, nextTick } from 'vue';
import { PlusOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import { useTableStore } from '../../../store/process';

interface Istate {
	showCompModal: boolean; // 展示计算属性定义模态框
	compTitle: string; // 计算属性字段名
	compEquation: string; // 计算属性表达式
	rawEquation: string[]; // 计算属性原始表达式(数组形式)
	lastSelect: string[]; // 上一次的表达式(用户修改表达式后diff得到修改了哪项)
	compCols: any[]; // 可参与计算的列
	opsCount: number; // 列选项id计数
}

// 表格字段定义
const colTableName = [
	{
		title: '字段',
		dataIndex: 'title',
		key: 'title',
	},
	{
		title: '示例',
		dataIndex: 'demo',
		key: 'demo',
	},
];

const store = useTableStore();
const { table } = store;

// 表格数据
const colData = computed(() =>
	table.cols.map(d => ({
		cid: d.cid,
		title: d.cname,
		demo: d.computed ? `=${d.equation}` : table.data[0][d.cKey],
	}))
);

const colName = colTableName;

// 字段被勾选后回调(初始化筛选与定义)
const rowSelection = {
	onChange: (_: any, selectedRows: any) => {
		table.cols.forEach(d => {
			// 找到被选中并且之前没有标记选中的一列, 初始化定义与筛选
			const t = selectedRows.find((dd: any) => dd.cid === d.cid);
			// eslint-disable-next-line
			if (!!t !== d.selected) {
				d.selected = !d.selected;
				if (d.selected === false) {
					d.initColDefine();
					d.initColSift();
				}
			}
		});
	},
	getCheckboxProps: (record: any): any => {
		const t = table.cols.find(d => d.cid === record.cid);
		if (t?.computed) return { checked: true, disabled: true };
		return {};
	},
};

const state: Istate = reactive({
	showCompModal: false,
	compTitle: '',
	compEquation: '',
	rawEquation: [],
	lastSelect: [],
	compCols: [],
	opsCount: 0,
});

/**
 * @description 下面都在封装这个奇怪的多选组件(但是懒得抽象成组件了
 * @param v 用户修改select后的值
 */

function addColTag(v: string[]) {
	let remove = false;
	let changeItem: string | null = null;
	// 与上一次对比看看判断修改了那个元素, 是增加了还是删除了
	state.lastSelect.forEach(d => {
		if (!v.includes(d)) {
			remove = true;
			changeItem = d;
		}
	});
	if (!remove)
		v.forEach(d => {
			if (!state.lastSelect.includes(d)) {
				changeItem = d;
			}
		});
	// 如果是删除了元素, 就把他从多选框中删除(因为还有同名列)
	if (remove) {
		const idx = state.compCols.findIndex(d => d.value === changeItem);
		if (idx + 1) state.compCols.splice(idx, 1);
	} else {
		// 如果是增加了列就比较麻烦, 为了让新的同名字段与原来同名字段同序, 稍微处理一下, 获取需要添加字段位置, 生成添加字段
		const idx = state.compCols.findIndex(d => d.value === changeItem);
		const newItem = reactive({
			value: state.compCols[idx].value,
			label: state.compCols[idx].label,
		});
		if (/F-\d+$/.test(newItem.value)) {
			// eslint-disable-next-line
			newItem.value = newItem.value.replace(/F-\d+$/, `F-${state.opsCount++}`);
		} else {
			// eslint-disable-next-line
			newItem.value = newItem.value.replace(/\d+$/, `${state.opsCount++}`);
		}
		if (idx + 1) {
			//! 为了保证options不变顺序, 不破坏proxy只能这样搞
			let len = state.compCols.length;
			state.compCols.push(...state.compCols.slice(0, idx + 1), newItem, ...state.compCols.slice(idx + 1));
			// eslint-disable-next-line
			while (len--) state.compCols.shift();
		}
	}
	state.lastSelect = v;
}

// 当option被选中需要屏蔽掉被选中option, 需要加入一个tag防止污染全局
function addSelec() {
	nextTick(() => {
		// ! antd会在列表元素被选择后重新构造列表? 不要使用toggle
		if (state.showCompModal) document.querySelectorAll('.ant-select-dropdown').forEach(d => d.classList.add('mulTagSelect'));
		else document.querySelectorAll('.ant-select-dropdown').forEach(d => d.classList.remove('mulTagSelect'));
	});
}

// 存储计算属性表达式
function submitComp() {
	if (state.compTitle.trim().length === 0 && state.showCompModal) {
		message.error('字段名不能为空');
		return;
	}
	// 正则将变量转为 $变量$形式, 符号不变
	state.compEquation = state.rawEquation
		.map(d => {
			let t = d;
			if (/-F-\d+$/.test(t)) {
				t = t.replace(/-F-\d+$/, '');
			} else {
				t = `$${t}`;
				t = t.replace(/-\d+$/, '$');
			}
			return t;
		})
		.join('');
	// 增加计算属性列
	table.addComputedValue({
		equation: state.compEquation,
		cname: state.compTitle,
	});
	toggleCompModal();
}

// 每次开关模态框的时候
function toggleCompModal() {
	// 初始化各种各样数据
	state.showCompModal = !state.showCompModal;
	state.opsCount = 0;
	state.rawEquation = [];
	state.compEquation = '';
	state.compTitle = '';
	state.lastSelect = [];
	// 增加计算属性列, 增加计算符号列
	/* eslint-disable */
	state.compCols = table.cols.filter(d => !d.computed && d.compareable).map(d => ({ value: `${d.cKey}-${state.opsCount++}`, label: d.cname }));
	state.compCols.push(
		{ value: `(-F-${state.opsCount++}`, label: '(' },
		{ value: `)-F-${state.opsCount++}`, label: ')' },
		{ value: `--F-${state.opsCount++}`, label: '-' },
		{ value: `+-F-${state.opsCount++}`, label: '+' },
		{ value: `*-F-${state.opsCount++}`, label: '*' },
		{ value: `/-F-${state.opsCount++}`, label: '/' },
		{ value: `^-F-${state.opsCount++}`, label: '^' },
		{ value: `&-F-${state.opsCount++}`, label: '&' },
		{ value: `|-F-${state.opsCount++}`, label: '|' },
		{ value: `<<-F-${state.opsCount++}`, label: '<<' },
		{ value: `>>-F-${state.opsCount++}`, label: '>>' },
		{ value: `>>>-F-${state.opsCount++}`, label: '>>>' },
		{ value: `sqrt-F-${state.opsCount++}`, label: 'sqrt' },
		{ value: `sin-F-${state.opsCount++}`, label: 'sin' },
		{ value: `cos-F-${state.opsCount++}`, label: 'cos' },
		{ value: `tan-F-${state.opsCount++}`, label: 'tan' },
		{ value: `pi-F-${state.opsCount++}`, label: 'pi' },
		{ value: `e-F-${state.opsCount++}`, label: 'e' }
	);
	/* eslint-enable */
}
</script>

<script lang="ts">
export default {
	name: 'FieldSelect',
};
</script>

<style lang="less" scoped>
.title {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	height: 40px;
}
.table {
	max-height: calc(100% - 40px);
	height: calc(100% - 40px);
	overflow: auto;
}
</style>

<style>
.mulTagSelect .ant-select-item-option[aria-selected='true'] {
	appearance: none !important;
	box-sizing: border-box !important;
	height: 0 !important;
	visibility: hidden !important;
	margin: 0 !important;
	display: none !important;
	/* background-color: #bfa; */
}
</style>
