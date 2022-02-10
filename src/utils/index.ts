/*
 * @Author: Merlin218
 * @Date: 2022-02-10 01:45:25
 * @LastEditors: Merlin218
 * @LastEditTime: 2022-02-10 01:45:26
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
