<template>
	<a-table :columns="columns" :data-source="data" :pagination="{ pageSize: 50 }" :scroll="{ y: 240 }" bordered>
		<template #name="{ text }">
			<a>{{ text }}</a>
		</template>
	</a-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
	defineProps<{
		data: Array<any>;
	}>(),
	{
		data: () => [{}],
	}
);

const columns = computed(() => {
	return Object.keys(props.data[0]).map(key => ({
		dataIndex: key,
		title: key,
	}));
});
</script>

<script lang="ts">
export default {
	name: 'DataTable',
};
</script>

<style lang="less" scoped></style>
