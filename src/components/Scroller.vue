<!--
 * @Author: Merlin218
 * @Date: 2022-02-09 18:05:29
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 01:45:47
 * @Description: 请填写简介
-->
<template>
	<div :id="id" :style="{ height: wrapperHeight, overflow: 'hidden', backgroundColor }">
		<div id="scrollContent">
			<slot default></slot>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted } from 'vue';
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
let betterScroll: any = null;

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

const refreshScroll = () => {
	setTimeout(() => {
		betterScroll.refresh();
	}, 2000);
};

const scrollToTop = (time = 300) => {
	betterScroll.scrollTo(0, 0, time);
};

let observer: any = null;
let timer: any = null;

const initResizeListener = () => {
	const element = document.getElementById('scrollContent');
	const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
	observer = new MutationObserver(mutationList => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			betterScroll.refresh();
		}, 300);
	});
	observer.observe(element, { attributes: true, attributeFilter: ['style'], attributeOldValue: true });
};

onUnmounted(() => {
	if (observer) {
		observer.disconnect();
		observer.takeRecords();
		observer = null;
	}
});

onMounted(() => {
	initScroller();
	initResizeListener();
});

defineExpose({
	refreshScroll,
	scrollToTop,
});
</script>

<script lang="ts">
export default {
	name: 'Scroller',
};
</script>

<style lang="less" scoped></style>
