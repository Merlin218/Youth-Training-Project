export type responseType = {
	code: string;
	msg: string;
	data: any;
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
