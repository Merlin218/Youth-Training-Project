<template>
	<a-form :model="config"> </a-form>
</template>

<script lang="ts" setup>
import { computed, ComputedRef } from 'vue';
import { useVisualStore } from '@/store/visual';
import { ChartOptionsType } from '@/types/visual/charts';

const store = useVisualStore();

const config: ComputedRef<ChartOptionsType> = computed(() => store.chartInstance.options);
</script>

<style></style>
