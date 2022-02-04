/*
 * @Author: Merlin218
 * @Date: 2022-01-22 11:35:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-04 11:53:36
 * @Description: 请填写简介
 */
export type responseType = {
	code: string;
	message: string;
	result: any;
};

export type CustomConfig = {
	repeatRequestCancel?: boolean; // 取消重复请求，默认为true
	loading?: boolean; // 是否开启loading层效果, 默认为true
	useMsgFromEnd?: boolean; // 是否使用后端返回的响应信息
	dataFormat?: boolean; // 是否开启简洁的数据结构响应, 默认为true
	loadingTitle?: string; // loading提示
	successTitle?: string; // success提示
	errorTitle?: string; // error提示
};

export type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};

export type WaterMarkOption = {
	width: number; // 水印宽度
	height: number; // 水印高度
	fontSize: number; // 字体大小
	color: string; // 字体颜色
	content: string; // 字体内容
	rotate: number; // 旋转角度
	gapX: number; // 水平间距
	gapY: number; // 垂直间距
};
