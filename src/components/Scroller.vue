<!--
 * @Author: Merlin218
 * @Date: 2022-02-08 18:23:39
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 00:16:20
 * @Description: 请填写简介
-->
<template>
	<div :id="id" :style="{ height: wrapperHeight, overflow: 'hidden', backgroundColor }">
		<slot default></slot>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import BetterScroll from '@better-scroll/core';
import MouseWheel from '@better-scroll/mouse-wheel';

const props = withDefaults(
	defineProps<{
		id?: string; // 包裹滚动区域的div的id
		height: string | number; // 包裹滚动区域的div的高度
		backgroundColor?: string; // 包裹滚动区域的div的颜色
	}>(),
	{
		id: Date.now().toString(), // id默认取当前时间戳
		backgroundColor: 'inherit', // 背景颜色默认去父级背景色
	}
);

// eslint-disable-next-line no-unused-vars
let betterScroll = null;

const wrapperHeight = computed(() => (Number.isNaN(Number(props.height)) ? props.height : `${props.height}px`));

const initScroller = () => {
	const wrapper = document.getElementById(props.id);
	BetterScroll.use(MouseWheel);
	betterScroll = new BetterScroll(wrapper as any, {
		scrollY: true,
		disableMouse: true,
		disableTouch: true,
		preventDefault: false,
		mouseWheel: {
			speed: 20,
			invert: false,
			easeTime: 300,
		},
	});
};

onMounted(() => {
	initScroller();
});
</script>

<style lang="less" scoped></style>
