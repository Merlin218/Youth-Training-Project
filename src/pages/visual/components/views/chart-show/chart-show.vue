<template>
	<component :is="store.userConfiguration.componentName" :chart-ref="instance" v-bind="store.userConfiguration.componentProps"></component>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useVisualStore } from '@/store/visual';

const store = useVisualStore();

const instance = ref(null);
</script>

<style scoped></style>
