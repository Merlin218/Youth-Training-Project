import { Area, Line } from '@antv/g2plot';

interface nameToClass {
	Area: Area;
	Line: Line;
}

export declare type ChartNameType = keyof nameToClass;

// export declare type ChartNameType = 'Area' | 'Line';

export declare type ChartType = nameToClass[keyof nameToClass];

export declare type getChartType<T extends ChartNameType> = nameToClass[T];

export declare type chartConfigType = {
	[T in ChartNameType]: {
		instance: getChartType<T>;
		text: string;
		defaultOptions: {};
	};
};
