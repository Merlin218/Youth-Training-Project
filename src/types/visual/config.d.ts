import { Annotation } from '@antv/g2plot';

/*
 * @Author: Merlin218
 * @Date: 2022-02-01 14:20:25
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-01 16:15:17
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
