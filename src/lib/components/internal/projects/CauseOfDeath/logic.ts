import type { ScaleBand, ScaleLinear, ScaleOrdinal } from 'd3-scale';
import type {
	BarData,
	MortalityData,
	MortalityDataHierarchical,
	UnprocessedMortalityData,
} from './constants';
import { max } from 'd3-array';

export const getBarData = (
	groupedData: MortalityDataHierarchical[],
	xScale: ScaleLinear<number, number, never>,
	yScale: ScaleBand<string>,
	colorScale: ScaleOrdinal<string, string, never>,
	differentiateColors: boolean,
	differentiateSubtypes: boolean,
): BarData[] => {
	const bars: BarData[] = [];
	groupedData.forEach((group) => {
		group.subTypes.forEach((item, index) => {
			const prevItem = group.subTypes[index - 1];
			const previousBar = bars.at(-1);
			let x: number;
			let y: number;
			if (differentiateSubtypes) {
				x = 0;
			} else {
				if (prevItem && previousBar) {
					x = previousBar.x + previousBar.width;
				} else {
					x = 0;
				}
			}
			if (differentiateSubtypes) {
				y = (yScale(item.subType || item.type) as number) - yScale.bandwidth() * 0.5;
			} else {
				y = (yScale(group.type) as number) - yScale.bandwidth() * 0.5;
			}
			const height = yScale.bandwidth();
			const width = xScale(item.year2020);
			const color = colorScale(differentiateColors ? item.subType : item.type);

			bars.push({
				x,
				y,
				height,
				width,
				color,
				data: item,
			});
		});
	});

	return bars;
};

export const getMaxValue = (data: MortalityDataHierarchical[]): number => {
	return max(data, (d) => {
		if (d.type !== 'All Deaths') {
			return d.subTypes[0].year2020;
		}
		return 0;
	}) as number;
};

export const parseMortalityData = (d: UnprocessedMortalityData): MortalityData => {
	return {
		...d,
		percent: +d.percent,
		rank: +d.rank,
		year2020: +Math.round(+d.year2020),
		year2021: +Math.round(+d.year2021),
	};
};
