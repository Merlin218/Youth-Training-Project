import { Area, Line } from '@antv/g2plot';
import { ChartNameType } from '@/types/visual/charts';

export const G2PlotInstanceConfig = {
	Area,
	Line,
};

export const G2PlotChartConfig = {
	Area: {
		text: '区域图',
		defaultConfigs: {},
	},
	Line: {
		text: '折线图',
		defaultConfigs: {},
	},
};

export const getChartInstance = (chartName: ChartNameType, container: string, options?: any) => {
	return new G2PlotInstanceConfig[chartName](container, options || G2PlotChartConfig[chartName].defaultConfigs);
};
