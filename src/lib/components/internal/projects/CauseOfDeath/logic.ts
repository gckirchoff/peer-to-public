import type { ScaleBand, ScaleLinear, ScaleOrdinal } from 'd3-scale';
import type { BarData, Label, MortalityData, Stage, UnprocessedMortalityData } from './constants';
import { max } from 'd3-array';

export const getBarData = (
	mortalityData: MortalityData[],
	xScale: ScaleLinear<number, number, never>,
	yScale: ScaleBand<string>,
	colorScale: ScaleOrdinal<string, string, never>,
	stage: Stage,
): { bars: BarData[]; labels: Label[] } => {
	const bars: BarData[] = [];
	const labels: Label[] = [];

	mortalityData.forEach((disease, index, array) => {
		const height = yScale.bandwidth();
		const width = xScale(disease.value);

		const color = colorScale(stage === 'initial' ? disease.type : disease.category || disease.type);
		const name = getName(disease.type, disease.category);

		let x = 0;
		let y = 0;
		let labelX = 0;

		y =
			(yScale(stage === 'flattened' ? disease.category || disease.type : disease.type) as number) -
			yScale.bandwidth() * 0.5;

		if (stage === 'initial' || stage === 'differentiated') {
			const prevBar = bars.at(-1);
			const currentTypeIsSameAsPrevious = array[index - 1]?.type === disease.type;

			if (currentTypeIsSameAsPrevious && prevBar) {
				x = prevBar.x + prevBar.width;
			}

			const nextBar = array[index + 1];
			const isLastOfType = disease.type !== nextBar?.type;
			if (isLastOfType) {
				const startingXPosition = currentTypeIsSameAsPrevious
					? (prevBar?.x ?? 0) + (prevBar?.width ?? 0)
					: 0;
				labelX = startingXPosition + width;

				const textAnchor =
					disease.type === 'Cardiovascular Disease' ||
					disease.type === 'Cancer' ||
					disease.type === 'COVID-19'
						? 'end'
						: 'start';

				labels.push({
					x: labelX,
					y: y + height / 2,
					text: disease.type,
					textAnchor,
				});
			}
		}

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

	return { bars, labels };
};

export const getBarName = (bar: BarData): string => {
	if (
		(bar.data.type === 'Cancer' && bar.data.category !== 'Other Cancer') ||
		bar.data.type === 'Stroke'
	) {
		return bar.data.type;
	}
	return '';
};

export const getMaxDeathForEachCategory = (mortalityData: MortalityData[]): number[] => {
	const categorized = mortalityData.reduce((acc: { [type: string]: number }, cur) => {
		if (!acc[cur.type]) {
			acc[cur.type] = 0;
		}
		acc[cur.type] += cur.value;

		return acc;
	}, {});

	const values = Object.values(categorized);

	return values;
};

const getName = (type: string, category: string | undefined): string => {
	if (type === 'Cancer') {
		return `${category} ${type}`;
	}
	return category || type;
};

export const getYValuesBySubType = (mortalityData: MortalityData[]): string[] =>
	mortalityData
		.reduce((acc: { name: string; quantity: number }[], cur) => {
			acc.push({
				name: cur.category || cur.type,
				quantity: cur.value,
			});
			return acc;
		}, [])
		.sort((a, b) => b.quantity - a.quantity)
		.map(({ name }) => name);

export const getMaxValue = (data: MortalityDataHierarchical[]): number => {
	return max(data, (d) => {
		if (d.type !== 'All Deaths') {
			return d.categorys[0].value;
		}
		return 0;
	}) as number;
};

export const parseMortalityData = (d: UnprocessedMortalityData): MortalityData => {
	return {
		...d,
		percent: +d.percent,
		value: +Math.round(+d.value),
		year2021: +Math.round(+d.year2021),
	};
};

export const getDomainValuesForColorScale = (mortalityData: MortalityData[]): string[] =>
	mortalityData.map((d) => {
		if (d.category === 'Total') {
			return d.type;
		} else {
			return d.category;
		}
	});
