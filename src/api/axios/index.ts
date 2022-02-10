import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
import { MessageType } from 'ant-design-vue/lib/message';
import { CustomConfig, responseType } from '../../types/common';
import cancel from '../../api/axios/cancel';
import configs from '@/configs';

let hideGlobalMessage: MessageType;

const request = (AxiosConfig: AxiosRequestConfig, customConfig: CustomConfig) => {
	// 设置请求头和请求路径
	const instance = axios.create({
		baseURL: configs.baseUrl,
		timeout: 10000,
	});

	instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

	const customConfigs = {
		repeatRequestCancel: true, // 取消重复请求，默认为true
		loading: true, // 是否开启loading层效果, 默认为true
		dataFormat: true, // 是否开启简洁的数据结构响应, 默认为true
		useMsgFromEnd: true, // 是否使用后端返回的响应信息
		loadingTitle: '加载中', // loading提示
		successTitle: '请求成功', // success提示
		errorTitle: '请求失败', // error提示
		...customConfig, // 合并配置
	};

	// 请求拦截
	instance.interceptors.request.use(
		(config): AxiosRequestConfig<any> => {
			customConfigs.repeatRequestCancel && cancel.removePendingRequest(config); // 检查是否存在重复请求，若存在则取消已发的请求

			customConfigs.loading && (hideGlobalMessage = message.loading(customConfigs.loadingTitle, 0));

			customConfigs.repeatRequestCancel && cancel.addPendingRequest(config); // 把当前请求信息添加到pendingRequest对象中
			const token = window.sessionStorage.getItem('token');
			if (token) {
				// @ts-ignore
				config.headers.token = token;
			}
			return config;
		},
		error => {
			return Promise.reject(error);
		}
	);

	// 响应拦截
	instance.interceptors.response.use(
		(res: AxiosResponse<responseType, any>) => {
			customConfigs.repeatRequestCancel && cancel.removePendingRequest(res.config); // 从pendingRequest对象中移除请求
			customConfigs.loading && hideGlobalMessage();
			if (res.data.code === 401) {
				sessionStorage.setItem('token', '');
				// token过期操作
			} else if (res.data.code === 1) {
				// 更新loading
				customConfigs.loading &&
					message.error({
						content: customConfigs.useMsgFromEnd && res.data.message ? res.data.message : customConfigs.successTitle,
						duration: 2,
					});
			} else if (typeof res.data === 'string') {
				customConfigs.loading && hideGlobalMessage();
				return customConfigs.dataFormat ? res.data : res;
			} else if (res.data.code === 0) {
				// 更新loading
				customConfigs.loading &&
					message.success({
						content: customConfigs.useMsgFromEnd && res.data.message ? res.data.message : customConfigs.successTitle,
						duration: 2,
					});
				return customConfigs.dataFormat ? res.data : res;
			}
			return Promise.reject(res);
		},
		err => {
			customConfigs.repeatRequestCancel && cancel.removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
			if (axios.isCancel(err)) {
				console.warn(`已取消的重复请求:${err.message}`);
			} else {
				// 更新loading
				customConfigs.loading && hideGlobalMessage();
				customConfigs.loading &&
					message.error({
						content: customConfigs.useMsgFromEnd && err.data.message ? err.data.message : customConfigs.errorTitle,
						duration: 2,
					});
			}
			return Promise.reject(err);
		}
	);
	return instance(AxiosConfig);
};

const createRequest = (config: AxiosRequestConfig, customConfig?: CustomConfig) => {
	return new Promise((resolve, reject) => {
		request(config, customConfig || {})
			.then(res => {
				resolve(res);
			})
			.catch(err => {
				reject(err);
			});
	});
};

export default createRequest;
