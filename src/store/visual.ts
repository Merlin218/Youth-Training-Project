import { defineStore } from 'pinia';
import { ComponentNameType, ComponentType } from '@/types/visual/g2PlotComponent';

export const useVisualStore = defineStore('visual', {
	state: () => ({
		userConfiguration: {
			componentName: 'LineChart',
			componentProps: {
				width: 400,
				height: 350,
				autoFit: true,
				xField: 'year',
				yField: 'value',
				smooth: true,
				meta: {
					value: {
						max: 15,
					},
				},
				annotations: [
					{
						type: 'text',
						offsetX: 0,
						offsetY: 0,
						position: ['1997', '7'],
						content: '辅助文本',
						style: {
							fill: 'red',
						},
					},
					{
						type: 'text',
						offsetX: 0,
						offsetY: 0,
						position: ['1997', '7'],
						content: '辅助文本',
						style: {
							fill: 'red',
						},
					},
				],
				data: [
					{ year: '1991', value: 3 },
					{ year: '1992', value: 4 },
					{ year: '1993', value: 3.5 },
					{ year: '1994', value: 5 },
					{ year: '1995', value: 4.9 },
					{ year: '1996', value: 6 },
					{ year: '1997', value: 7 },
					{ year: '1998', value: 9 },
					{ year: '1999', value: 11 },
				],
			},
		} as ComponentType<ComponentNameType>,
	}),
	getters: {},
	actions: {
		handleNameChange(name: ComponentNameType) {
			this.userConfiguration.componentName = name;
		},
	},
});
