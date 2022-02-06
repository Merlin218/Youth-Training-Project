import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'ant-design-vue';
import { MessageType } from 'ant-design-vue/lib/message';
import { CustomConfig } from '../../types/common';
import cancel from '../../api/axios/cancel';

let hideGlobalMessage: MessageType;

const request = (AxiosConfig: AxiosRequestConfig, customConfig: CustomConfig) => {
	// 设置请求头和请求路径
	const instance = axios.create({
		baseURL: '/api',
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
		(res: AxiosResponse) => {
			customConfigs.repeatRequestCancel && cancel.removePendingRequest(res.config); // 从pendingRequest对象中移除请求
			console.log(res);

			if (res.data.code === 401) {
				sessionStorage.setItem('token', '');
				// token过期操作
			}
			// 更新loading
			customConfigs.loading && hideGlobalMessage();
			message.success({
				content: customConfigs.useMsgFromEnd && res.data.msg ? res.data.msg : customConfigs.successTitle,
				duration: 2,
			});
			return customConfigs.dataFormat ? res.data : res;
		},
		err => {
			customConfigs.repeatRequestCancel && cancel.removePendingRequest(err.config || {}); // 从pendingRequest对象中移除请求
			if (axios.isCancel(err)) {
				console.log(`已取消的重复请求:${err.message}`);
			} else {
				// 更新loading
				customConfigs.loading && hideGlobalMessage();
				message.error({
					content: customConfigs.useMsgFromEnd && err.data.msg ? err.data.msg : customConfigs.errorTitle,
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
