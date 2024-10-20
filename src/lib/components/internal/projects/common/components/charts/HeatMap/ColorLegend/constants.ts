import type { ScaleSequential } from 'd3';

import type { TooltipData } from '../constants';

export interface ColorLegendProps {
	colorScale: ScaleSequential<string>;
	chartWidth: number;
	chartHeight: number;
	tooltipData: TooltipData | null;
}
