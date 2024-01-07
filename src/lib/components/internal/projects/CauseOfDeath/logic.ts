import type { ScaleBand, ScaleLinear, ScaleOrdinal } from 'd3-scale';
import type {
	BarData,
	MortalityData,
	MortalityDataHierarchical,
	Stage,
	UnprocessedMortalityData,
} from './constants';
import { max } from 'd3-array';

export const getBarData = (
	mortalityData: MortalityData[],
	xScale: ScaleLinear<number, number, never>,
	yScale: ScaleBand<string>,
	colorScale: ScaleOrdinal<string, string, never>,
	stage: Stage,
): BarData[] => {
	const bars: BarData[] = [];

	mortalityData.forEach((disease, index, array) => {
		let x = 0;
		let y = 0;
		y =
			(yScale(stage === 'flattened' ? disease.subType || disease.type : disease.type) as number) -
			yScale.bandwidth() * 0.5;

		if (stage === 'initial' || stage === 'differentiated') {
			const prevBar = bars.at(-1);
			const currentTypeIsSameAsPrevious = array[index - 1]?.type === disease.type;

			if (currentTypeIsSameAsPrevious && prevBar) {
				x = prevBar.x + prevBar.width;
			}
		}

		const height = yScale.bandwidth();
		const width = xScale(disease.year2020);
		const color = colorScale(stage === 'initial' ? disease.type : disease.subType);
		const name = getName(disease.type, disease.subType);

		bars.push({
			x,
			y,
			height,
			width,
			color,
			name,
			data: disease,
		});
	});

	return bars;
};

export const getMaxDeathForEachCategory = (mortalityData: MortalityData[]): number[] => {
	const categorized = mortalityData.reduce((acc: { [type: string]: number }, cur) => {
		if (!acc[cur.type]) {
			acc[cur.type] = 0;
		}
		acc[cur.type] += cur.year2020;

		return acc;
	}, {});

	const values = Object.values(categorized);

	return values;
};

const getName = (type: string, subType: string | undefined): string => {
	if (type === 'Cancer') {
		return `${subType} ${type}`;
	}
	return subType || type;
};

export const getYValuesBySubType = (mortalityData: MortalityData[]): string[] =>
	mortalityData
		.reduce((acc: { name: string; quantity: number }[], cur) => {
			acc.push({
				name: cur.subType || cur.type,
				quantity: cur.year2020,
			});
			return acc;
		}, [])
		.sort((a, b) => b.quantity - a.quantity)
		.map(({ name }) => name);

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

export const getDomainValuesForColorScale = (mortalityData: MortalityData[]): string[] =>
	mortalityData.map((d) => {
		if (d.subType === 'Total') {
			return d.type;
		} else {
			return d.subType;
		}
	});
