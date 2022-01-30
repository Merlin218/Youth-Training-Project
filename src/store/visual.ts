import { defineStore } from 'pinia';
import { ChartNameType, ChartType } from '@/types/visual/charts';

export const useVisualStore = defineStore('visual', {
	state: () => ({
		chartInstance: null as null | ChartType,
		chartOptions: null as any,
		chartName: 'Line' as ChartNameType,
	}),
	getters: {},
	actions: {
		bindChartInstance(instance: ChartType) {
			this.chartInstance = instance;
			this.chartOptions = instance.options;
			console.log(instance.options);
		},
	},
});
