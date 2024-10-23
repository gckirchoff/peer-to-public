import type { ScaleBand } from 'd3';

export interface AxisXProps {
	label: string;
	xScale: ScaleBand<string>;
	chartHeight: number;
}
