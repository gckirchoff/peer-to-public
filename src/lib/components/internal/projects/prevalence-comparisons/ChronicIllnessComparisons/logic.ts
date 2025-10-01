import { format } from 'd3';
import { rarityThreshold } from './DataChart/constants';

export const isRare = (prevalence: number) => prevalence < rarityThreshold;

export const roundTo = (num: number, precision: number) => {
	const factor = Math.pow(10, precision);
	return Math.round(num * factor) / factor;
};

export const formatNumber = (num: number, base = 1) => {
	const adjustedNum = num * base;
	const formattedNum =
		adjustedNum > 1
			? format('.2s')(adjustedNum).replace('G', 'B')
			: String(roundTo(adjustedNum, 5));
	if (formattedNum === '0') {
		return `~0`;
	}
	return formattedNum;
};

export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
