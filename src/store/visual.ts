/*
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:11
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 13:48:55
 * @Description: 请填写简介
 */
import { defineStore } from 'pinia';
import { Annotation, StateCondition } from '@antv/g2plot';
import { ChartNameType, ChartOptionsType, ChartType } from '@/types/visual/charts';

export const useVisualStore = defineStore('visual', {
	state: () => ({
		chartInstance: {} as ChartType,
		chartName: 'Line' as ChartNameType,
		chartTitle: '' as string,
	}),
	getters: {
		chartOptions: state => state.chartInstance.options,
	},
	actions: {
		render() {
			this.chartInstance.render();
		},
		update(options: Partial<ChartOptionsType>) {
			this.chartInstance.update(options);
		},
		changeData(data: Record<string, any>[]) {
			this.chartInstance.changeData(data);
		},
		changeSize(width: number, height: number) {
			this.chartInstance.changeSize(width, height);
		},
		destroy() {
			this.chartInstance.destroy();
		},
		on(evt: string, callback: Function, once?: boolean | undefined) {
			this.chartInstance.on(evt, callback, once);
		},
		off(evt: string, callback: Function) {
			this.chartInstance.off(evt, callback);
		},
		addAnnotations(annotations: Annotation[]) {
			this.chartInstance.addAnnotations(annotations);
		},
		removeAnnotations(annotations: ({ id: string } & Partial<Annotation>)[]) {
			this.chartInstance.removeAnnotations(annotations);
		},
		setState(type: 'active' | 'inactive' | 'selected', condition: StateCondition, status?: boolean) {
			this.chartInstance.setState(type, condition, status);
		},
		getStates() {
			return this.chartInstance.getStates();
		},
		bindChartToStore({ instance, title, name }: { instance: ChartType; title: string; name: ChartNameType }) {
			this.chartInstance = instance;
			this.chartName = name;
			this.chartTitle = title;
		},
	},
});
