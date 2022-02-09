<template>
	<div>
		<vxe-table class="mytable-style" :edit-config="{ trigger: 'click', mode: 'cell' }" :data="tableData.data">
			<vxe-column v-for="item in tableData.cols" :key="item.cid" :field="item.cKey" :title="item.cname" :edit-render="item.editable !== false ? { autofocus: '.vxe-input--inner' } : null">
				<template v-if="item.editable !== false" #edit="{ row }">
					<vxe-input v-model="row[item.cKey]" @blur="handleUpdate()"></vxe-input>
				</template>
			</vxe-column>
		</vxe-table>
	</div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { ProTable } from '../pages/preprocess/preprocess/ProTable';

const props = defineProps<{
	table: ProTable;
}>();
const emit = defineEmits<{
	(e: 'tableDataChange', tableData: ProTable): void;
}>();

const tableData = reactive(JSON.parse(JSON.stringify(props.table)));
function handleUpdate() {
	const TableExport = JSON.parse(JSON.stringify(tableData));
	TableExport.data.forEach(d => {
		Object.keys(d).forEach(k => {
			if (!Object.is(+d[k], NaN)) d[k] = +d[k];
		});
		// eslint-disable-next-line
		delete d._X_ID;
		delete d.rowId;
	});
	emit('tableDataChange', TableExport);
}
</script>

<script lang="ts">
export default {
	name: 'TableEdit',
};
</script>
