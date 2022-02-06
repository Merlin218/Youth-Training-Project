/*
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:11
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-06 00:15:46
 * @Description: 请填写简介
 */
import { defineStore } from 'pinia';
import { Annotation, StateCondition } from '@antv/g2plot';
import { ChartNameType, ChartOptionsType, ChartType } from '@/types/visual/charts';
import { data1 } from '@/data';

export const useVisualStore = defineStore('visual', {
	state: () => ({
		chartInstance: undefined as ChartType | undefined,
		chartName: undefined as ChartNameType | undefined,
		chartTitle: '' as string,
		backupChartOptions: undefined as ChartOptionsType | undefined,
		waterMark: false as string | false,
	}),
	getters: {
		chartOptions: state => state.chartInstance?.options,
	},
	actions: {
		getChartConfig(name: ChartNameType) {
			const chartOptions = {
				width: 600,
				height: 500,
				autoFit: true,
				xField: 'product_box',
				yField: 'value',
				seriesField: 'province',
				data: data1,
				legend: {
					flipPage: true,
					// 两行分页
					maxRow: 2,
					pageNavigator: {
						marker: {
							style: {
								fill: 'rgba(0,0,0,0.65)',
							},
						},
					},
				},
			};
			const title = '';
			const waterMarkUrl = '';

			this.chartName = name;
			this.chartTitle = title;
			this.backupChartOptions = chartOptions;
			this.waterMark = waterMarkUrl;
		},
		render() {
			this.chartInstance?.render();
		},
		update(options: Partial<ChartOptionsType>) {
			this.chartInstance?.update(options);
		},
		changeData(data: Record<string, any>[]) {
			this.chartInstance?.changeData(data);
		},
		changeSize(width: number, height: number) {
			this.chartInstance?.changeSize(width, height);
		},
		destroy() {
			this.chartInstance?.destroy();
			this.chartInstance = undefined;
			this.chartName = undefined;
			this.chartTitle = '';
		},
		on(evt: string, callback: Function, once?: boolean | undefined) {
			this.chartInstance?.on(evt, callback, once);
		},
		off(evt: string, callback: Function) {
			this.chartInstance?.off(evt, callback);
		},
		addAnnotations(annotations: Annotation[]) {
			this.chartInstance?.addAnnotations(annotations);
		},
		removeAnnotations(annotations: ({ id: string } & Partial<Annotation>)[]) {
			this.chartInstance?.removeAnnotations(annotations);
		},
		setState(type: 'active' | 'inactive' | 'selected', condition: StateCondition, status?: boolean) {
			this.chartInstance?.setState(type, condition, status);
		},
		getStates() {
			return this.chartInstance?.getStates();
		},
		bindChartToStore(instance: ChartType) {
			this.chartInstance = instance;
		},
		changeWaterMark(value: string | false) {
			this.waterMark = value;
		},
	},
});
