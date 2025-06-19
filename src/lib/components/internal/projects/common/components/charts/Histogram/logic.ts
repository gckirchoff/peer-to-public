import type { Bin } from 'd3';

interface GetYDomainParams {
	yDomain: [number, number] | undefined;
	showPercentage: boolean;
	maxBucketValue: number;
	maxPercent: number;
}

export const getYDomain = ({
	yDomain,
	showPercentage,
	maxBucketValue,
	maxPercent,
}: GetYDomainParams): [number, number] => {
	if (yDomain) {
		const [, givenYMax] = yDomain;
		const dataMax = showPercentage ? maxPercent : maxBucketValue;

		return dataMax > givenYMax ? [0, dataMax] : yDomain;
	}

	return showPercentage ? [0, maxPercent] : [0, maxBucketValue];
};
