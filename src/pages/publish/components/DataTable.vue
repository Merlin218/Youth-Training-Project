<template>
	<a-table :columns="columns" :data-source="data" bordered>
		<template #name="{ text }">
			<a>{{ text }}</a>
		</template>
	</a-table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const columns = ref([
	{
		title: 'Name',
		dataIndex: 'name',
		scopedSlots: { customRender: 'name' },
	},
	{
		title: 'Cash Assets',
		className: 'column-money',
		dataIndex: 'money',
	},
	{
		title: 'Address',
		dataIndex: 'address',
	},
]);

const data = ref([
	{
		key: '1',
		name: 'John Brown',
		money: '￥300,000.00',
		address: 'New York No. 1 Lake Park',
	},
	{
		key: '2',
		name: 'Jim Green',
		money: '￥1,256,000.00',
		address: 'London No. 1 Lake Park',
	},
	{
		key: '3',
		name: 'Joe Black',
		money: '￥120,000.00',
		address: 'Sidney No. 1 Lake Park',
	},
]);
</script>

<style lang="less" scoped></style>
