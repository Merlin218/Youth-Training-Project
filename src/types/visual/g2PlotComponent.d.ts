import {
	AreaChartProps,
	// BarChartProps,
	// BidirectionalBarChartProps,
	// BoxChartProps,
	// BulletChartProps,
	// CirclePackingChartProps,
	// ColumnChartProps,
	// DualAxesChartProps,
	// FacetChartProps,
	// FunnelChartProps,
	// GaugeChartProps,
	// HeatmapChartProps,
	// HistogramChartProps,
	LineChartProps,
	// LiquidChartProps,
	// MixChartProps,
	// MultiViewChartProps,
	// PieChartProps,
	// ProgressChartProps,
	// RadarChartProps,
	// RadialBarChartProps,
	// RingProgressChartProps,
	// RoseChartProps,
	// SankeyChartProps,
	// ScatterChartProps,
	// StockChartProps,
	// SunburstChartProps,
	// TinyAreaChartProps,
	// TinyColumnChartProps,
	// TinyLineChartProps,
	// TreemapChartProps,
	// VennChartProps,
	// ViolinChartProps,
	// WaterfallChartProps,
	// WordCloudChartProps,
} from '@opd/g2plot-vue';

export interface G2Component {
	AreaChart: AreaChartProps;
	// BarChart: BarChartProps;
	// BidirectionalBarChart: BidirectionalBarChartProps;
	// BoxChart: BoxChartProps;
	// BulletChart: BulletChartProps;
	// CirclePackingChart: CirclePackingChartProps;
	// ColumnChart: ColumnChartProps;
	// DualAxesChart: DualAxesChartProps;
	// FacetChart: FacetChartProps;
	// FunnelChart: FunnelChartProps;
	// GaugeChart: GaugeChartProps;
	// HeatmapChart: HeatmapChartProps;
	// HistogramChart: HistogramChartProps;
	LineChart: LineChartProps;
	// LiquidChart: LiquidChartProps;
	// MixChart: MixChartProps;
	// MultiViewChart: MultiViewChartProps;
	// PieChart: PieChartProps;
	// ProgressChart: ProgressChartProps;
	// RadarChart: RadarChartProps;
	// RadialBarChart: RadialBarChartProps;
	// RingProgressChart: RingProgressChartProps;
	// RoseChart: RoseChartProps;
	// SankeyChart: SankeyChartProps;
	// ScatterChart: ScatterChartProps;
	// StockChart: StockChartProps;
	// SunburstChart: SunburstChartProps;
	// TinyAreaChart: TinyAreaChartProps;
	// TinyColumnChart: TinyColumnChartProps;
	// TinyLineChart: TinyLineChartProps;
	// TreemapChart: TreemapChartProps;
	// VennChart: VennChartProps;
	// ViolinChart: ViolinChartProps;
	// WaterfallChart: WaterfallChartProps;
	// WordCloudChart: WordCloudChartProps;
}

export type ComponentNameType = keyof G2Component;

export type ComponentPropsType = G2Component[keyof G2Component];

export type getComponentPropsType<T extends ComponentNameType> = G2Component[T];

export interface ComponentType<T extends ComponentNameType> {
	componentName: T;
	componentProps: getComponentPropsType<T>;
}
