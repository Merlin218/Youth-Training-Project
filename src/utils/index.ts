/* eslint-disable no-restricted-syntax */
/*
 * @Author: Merlin218
 * @Date: 2022-02-10 01:45:25
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 14:25:50
 * @Description: 请填写简介
 */
import { commonApi } from '@/api';

export const getPicUrl = (name: string) => {
	return `/src/assets/img/${name}.png`;
};

// eslint-disable-next-line camelcase
export const getCurrentProjectStatus = async (project_id: string) => {
	const res = await commonApi.getAllProjects();
	console.log(res, project_id);
};

/**
 * @description: 判断一个值是否是基本类型及函数
 * @param {string} value 任何值
 * @return {*}
 */

function isPrimitive(value: any) {
	return /Number|Boolean|String|Null|Undefined|Symbol|Function/.test(Object.prototype.toString.call(value));
}

/**
 * @description: 深拷贝函数，包括基础类型，函数，Map，Set，Date，Regex，引用类型等。
 * @param {any} source 原数据
 * @param {WeakMap} memory 记录临时值
 * @return {*}
 */
export const deepClone = (source: any, memory: WeakMap<object, any> = new WeakMap()) => {
	let result: any = null;
	// 记录临时值
	memory || memory;
	// 原始数据类型及函数
	if (isPrimitive(source)) {
		result = source;
	}
	// 数组
	else if (Array.isArray(source)) {
		result = source.map(value => deepClone(value, memory));
	}
	// 内置对象Date、Regex
	else if (Object.prototype.toString.call(source) === '[object Date]') {
		result = new Date(source);
	} else if (Object.prototype.toString.call(source) === '[object Regex]') {
		result = new RegExp(source);
	}
	// 内置对象Set、Map
	else if (Object.prototype.toString.call(source) === '[object Set]') {
		result = new Set();
		for (const value of source) {
			result.add(deepClone(value, memory));
		}
	} else if (Object.prototype.toString.call(source) === '[object Map]') {
		result = new Map();
		for (const [key, value] of source.entries()) {
			result.set(key, deepClone(value, memory));
		}
	}
	// 引用类型
	else if (memory.has(source)) {
		result = memory.get(source);
	} else {
		result = Object.create(null);
		memory.set(source, result);
		Object.keys(source).forEach(key => {
			const value = source[key];
			result[key] = deepClone(value, memory);
		});
	}
	return result;
};
