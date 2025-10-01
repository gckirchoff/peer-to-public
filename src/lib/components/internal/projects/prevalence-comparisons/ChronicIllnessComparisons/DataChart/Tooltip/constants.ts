import type { PrevalenceData } from "../../constants";

export interface TooltipProps {
	data: PrevalenceData;
	xAccessorScaled: (d: PrevalenceData) => number;
	yAccessorScaled: (d: PrevalenceData) => number;
	width: number;
	yProperty: keyof PrevalenceData;
	ratioYProperty: keyof PrevalenceData;
	ratioed: boolean;
}
