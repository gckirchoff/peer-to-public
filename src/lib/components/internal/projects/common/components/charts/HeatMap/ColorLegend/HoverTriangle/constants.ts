import type { ScaleLinear } from 'd3';

import type { TooltipData } from '../../constants';

export interface HoverTriangleProps {
	yScale: ScaleLinear<number, number, never>;
	tooltipData: TooltipData;
}
