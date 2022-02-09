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
import { ProTable } from '../pages/preproccess/preproccess/ProTable';

/**
 * 如需限制字段不得编辑, 请在列定义中额外加入 editable: false, 例如
 * {
 * 	"cid": 2,
 * 	"cKey": "age",
 * 	"cname": "年龄",
 * 	"type": "number"
 * 	"editable": "false"
 * },
 */
const props = defineProps<{
	table: ProTable;
}>();
const emit = defineEmits<{
	(e: 'tableDataChange', tableData: ProTable): void;
}>();

const tableData = reactive(props.table);
function handleUpdate() {
	emit('tableDataChange', tableData);
}
</script>

<script lang="ts">
export default {
	name: 'TableEdit',
};
</script>
