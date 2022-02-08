/*
 * @Author: Merlin218
 * @Date: 2022-01-30 12:28:27
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-08 20:39:49
 * @Description: 请填写简介
 */
import { Area, AreaOptions, Bar, BarOptions, Column, ColumnOptions, Line, LineOptions } from '@antv/g2plot';
import { Mutable } from '../common';

interface nameToClass {
	Area: Area;
	Line: Line;
	Column: Column;
	Bar: Bar;
}

interface nameToOptions {
	Area: Mutable<AreaOptions>;
	Line: Mutable<LineOptions>;
	Column: Mutable<ColumnOptions>;
	Bar: Mutable<BarOptions>;
}

export declare type ChartNameType = keyof nameToClass;

export declare type ChartType = nameToClass[ChartNameType];

export declare type ChartOptionsType = nameToOptions[ChartNameType];

export declare type getChartType<T extends ChartNameType> = nameToClass[T];

export declare type getChartOptions<T extends ChartNameType> = nameToOptions[T];

export declare type chartConfigType = {
	[T in ChartNameType]: {
		name: T;
		text: string;
		defaultConfigs: getChartOptions<T>;
	};
};
