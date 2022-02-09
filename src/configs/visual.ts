/*
 * @Author: Merlin218
 * @Date: 2022-01-30 11:33:09
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-09 00:18:15
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

export const G2PlotChartConfig: chartConfigType = {
	Area: {
		name: 'Area',
		text: '区域图',
		defaultConfigs: {
			width: 300,
			height: 200,
			autoFit: false,
			xField: 'year',
			yField: 'value',
			smooth: true,
			data: [
				{ year: '1991', value: 3 },
				{ year: '1992', value: 4 },
				{ year: '1993', value: 3.5 },
				{ year: '1994', value: 5 },
				{ year: '1995', value: 4.9 },
				{ year: '1996', value: 6 },
				{ year: '1997', value: 7 },
				{ year: '1998', value: 9 },
				{ year: '1999', value: 11 },
			],
		},
	},
	Line: {
		name: 'Line',
		text: '折线图',
		defaultConfigs: {
			width: 300,
			height: 200,
			autoFit: false,
			xField: 'year',
			yField: 'value',
			smooth: true,
			data: [
				{ year: '1991', value: 3 },
				{ year: '1992', value: 4 },
				{ year: '1993', value: 3.5 },
				{ year: '1994', value: 5 },
				{ year: '1995', value: 4.9 },
				{ year: '1996', value: 6 },
				{ year: '1997', value: 7 },
				{ year: '1998', value: 9 },
				{ year: '1999', value: 11 },
			],
		},
	},
	Column: {
		name: 'Column',
		text: '柱状图',
		defaultConfigs: {
			width: 300,
			height: 200,
			autoFit: false,
			xField: 'year',
			yField: 'value',
			data: [
				{ year: '1991', value: 3 },
				{ year: '1992', value: 4 },
				{ year: '1993', value: 3.5 },
				{ year: '1994', value: 5 },
				{ year: '1995', value: 4.9 },
				{ year: '1996', value: 6 },
				{ year: '1997', value: 7 },
				{ year: '1998', value: 9 },
				{ year: '1999', value: 11 },
			],
		},
	},
	Bar: {
		name: 'Bar',
		text: '条形图',
		defaultConfigs: {
			width: 300,
			height: 200,
			autoFit: false,
			xField: 'year',
			yField: 'value',
			data: [
				{ year: '1991', value: 3 },
				{ year: '1992', value: 4 },
				{ year: '1993', value: 3.5 },
				{ year: '1994', value: 5 },
				{ year: '1995', value: 4.9 },
				{ year: '1996', value: 6 },
				{ year: '1997', value: 7 },
				{ year: '1998', value: 9 },
				{ year: '1999', value: 11 },
			],
		},
	},
};

export const getChartInstance = (chartType: ChartNameType, container: string, options?: any) => {
	return new G2PlotInstanceConfig[chartType](container, options);
};

export const defaultWaterMarkOption = {
	width: 160,
	height: 160,
	fontSize: 40,
	color: 'rgba(0,0,0,0.11)',
	content: '水印',
	rotate: -20,
};

export const defaultWaterMarkUrl =
	'data:image/png;base64,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';
