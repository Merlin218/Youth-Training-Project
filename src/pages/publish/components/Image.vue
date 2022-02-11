<template>
	<div class="outWrapper">
		<div class="imgWrapper">
			<img :src="imgUrl" />
		</div>
		<a-form class="form">
			<a-form-item> <a-button @click="updateProjectImage">保存为封面</a-button></a-form-item>
			<a-form-item label="导出格式">
				<a-radio-group v-model:value="exportType">
					<a-radio-button value="png"> PNG </a-radio-button>
					<a-radio-button value="jpg"> JPG </a-radio-button>
				</a-radio-group>
			</a-form-item>
		</a-form>
	</div>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue';

const updateProjectImage = inject('updateProjectImage') as () => void;

const getImgUrl = inject('getImgUrl') as Function;

const imgUrl = computed(() => getImgUrl());

const exportType = ref<'jpg' | 'png'>('png');

defineExpose({
	exportType,
});
</script>

<script lang="ts">
export default {
	name: 'Image',
};
</script>

<style lang="less" scoped>
.outWrapper {
	display: flex;
	max-height: 80%;
}
.imgWrapper {
	flex: 1;
	img {
		height: 300px;
	}
}
.form {
	margin-top: 40px;
	flex: 1;
}
</style>
