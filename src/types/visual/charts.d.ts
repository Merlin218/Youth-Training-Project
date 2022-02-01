import { Area, AreaOptions, Line, LineOptions } from '@antv/g2plot';

interface nameToClass {
	Area: Area;
	Line: Line;
}

interface nameToOptions {
	Area: AreaOptions;
	Line: LineOptions;
}

export declare type ChartNameType = keyof nameToClass;

export declare type ChartType = nameToClass[ChartNameType];

export declare type ChartOptionsType = nameToOptions[ChartNameType];

export declare type getChartType<T extends ChartNameType> = nameToClass[T];

export declare type getChartOptions<T extends ChartNameType> = nameToClass[T];

export declare type chartConfigType = {
	[T in ChartNameType]: {
		instance: getChartType<T>;
		text: string;
		defaultOptions: getChartOptions<T>;
	};
};
