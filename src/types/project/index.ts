// 表单数据
export interface ChartData {
	id: number;
	chartpic_id: string; // 图表id
	project_id: string; // 项目id
	chart_type: string; // 图表类型
	chart_title: null | string; // 图表标题
	vis_config: string; // 图表可视化相关配置
	watermark_config: string; // 图表水印相关配置
	export_img: null | string; // 导出图片base64
	create_time: string;
	modify_time: string;
}
