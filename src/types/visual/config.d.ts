import { Annotation } from '@antv/g2plot';

/*
 * @Author: Merlin218
 * @Date: 2022-02-01 14:20:25
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-05 20:39:58
 * @Description: 请填写简介
 */
export declare type TextAnnotationConfigType = Annotation & {
	position: string[];
	style: {
		fill?: string;
		fontSize?: number;
	};
	content: string;
};

export declare type BaseConfigType = {
	xField: string;
	yField: string;
};

export declare type WaterMarkOptionType = {
	width: number; // 水印宽度
	height: number; // 水印高度
	fontSize: number; // 字体大小
	color: string; // 字体颜色
	content: string; // 字体内容
	rotate: number; // 旋转角度
};
