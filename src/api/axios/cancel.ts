import axios, { AxiosRequestConfig } from 'axios';

function generateReqKey(config: AxiosRequestConfig) {
	const { method, url, params, data } = config;
	return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&');
}

const pendingRequest = new Map();

function addPendingRequest(config: AxiosRequestConfig) {
	const requestKey = generateReqKey(config);
	// eslint-disable-next-line no-param-reassign
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken(cancel => {
			if (!pendingRequest.has(requestKey)) {
				pendingRequest.set(requestKey, cancel);
			}
		});
}

function removePendingRequest(config: AxiosRequestConfig) {
	const requestKey = generateReqKey(config);
	if (pendingRequest.has(requestKey)) {
		const cancelToken = pendingRequest.get(requestKey);
		cancelToken(requestKey);
		pendingRequest.delete(requestKey);
	}
}

export default {
	addPendingRequest,
	removePendingRequest,
};
