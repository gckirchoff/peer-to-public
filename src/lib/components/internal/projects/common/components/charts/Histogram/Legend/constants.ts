import type { ScaleOrdinal } from 'd3';

export interface LegendProps {
	colorScale: ScaleOrdinal<string, string, never>;
	chartWidth: number;
	chartHeight: number;
}
