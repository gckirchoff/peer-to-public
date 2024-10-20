import type { HeatmapData } from './constants';

export const xAccessor = (d: HeatmapData) => d.x;
export const yAccessor = (d: HeatmapData) => d.y;
export const valueAccessor = (d: HeatmapData) => d.value;
