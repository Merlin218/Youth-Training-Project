/*
 * @Author: Merlin218
 * @Date: 2022-01-22 11:35:17
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-08 11:50:27
 * @Description: 请填写简介
 */
export declare type responseType = {
	code: number;
	message: string;
	result: any;
};

export declare type CustomConfig = {
	repeatRequestCancel?: boolean; // 取消重复请求，默认为true
	loading?: boolean; // 是否开启loading层效果, 默认为true
	useMsgFromEnd?: boolean; // 是否使用后端返回的响应信息
	dataFormat?: boolean; // 是否开启简洁的数据结构响应, 默认为true
	loadingTitle?: string; // loading提示
	successTitle?: string; // success提示
	errorTitle?: string; // error提示
};

export declare type Mutable<T> = {
	-readonly [P in keyof T]: T[P];
};
