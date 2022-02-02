/*
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-02 01:56:10
 * @Description: 请填写简介
 */
import { Area, Line, Column, Bar } from '@antv/g2plot';
import { chartConfigType, ChartNameType } from '@/types/visual/charts';

export const G2PlotInstanceConfig = {
	Area,
	Line,
	Column,
	Bar,
	// Pie,
};

export const G2PlotChartConfig = {
	Area: {
		name: 'Area',
		text: '区域图',
		defaultConfigs: {},
	},
	Line: {
		name: 'Line',
		text: '折线图',
		defaultConfigs: {},
	},
	Column: {
		name: 'Column',
		text: '柱状图',
		defaultConfigs: {},
	},
	Bar: {
		name: 'Bar',
		text: '条形图',
		defaultConfigs: {},
	},
} as unknown as chartConfigType;

export const getChartInstance = (chartName: ChartNameType, container: string, options?: any) => {
	return new G2PlotInstanceConfig[chartName](container, options);
};
