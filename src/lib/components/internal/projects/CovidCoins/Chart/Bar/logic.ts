import type { ScaleLinear } from 'd3';

import type { RiskItem } from '../../constants';

interface Coin {
	yPosition: number;
	inDelay: number;
	outDelay: number;
}

interface GetCoinsArgs {
	d: RiskItem;
	yScale: ScaleLinear<number, number, never>;
	coinRadius: number;
	columnIndex: number;
	barsSwappedPlaces: boolean;
	innerHeight: number;
}

interface CalcOutDelay {
	i: number;
	totalLength: number;
	columnIndex: number;
	barsSwappedPlaces: boolean;
	direction: 'in' | 'out';
}

class DelayCalculator {
	private totalLength: number;
	private columnIndex: number;
	private barsSwappedPlaces: boolean;

	private coinDelay = 30;
	private columnDelay = 25;

	constructor(totalLength: number, columnIndex: number, barsSwappedPlaces: boolean) {
		this.totalLength = totalLength;
		this.columnIndex = columnIndex;
		this.barsSwappedPlaces = barsSwappedPlaces;
	}

	calcDelay = (direction: 'in' | 'out', index: number): number => {
		const position = direction === 'in' ? index : this.totalLength - index;
		const constantDelay = this.barsSwappedPlaces ? 1000 : 200;

		const delay = position * this.coinDelay + this.columnIndex * this.columnDelay + constantDelay;
		return delay;
	};
}

export const getCoins = ({
	d,
	yScale,
	coinRadius,
	columnIndex,
	barsSwappedPlaces,
	innerHeight,
}: GetCoinsArgs): Coin[] => {
	const coinsArr: Coin[] = [];
	const delayCalculator = new DelayCalculator(d.coins, columnIndex, barsSwappedPlaces);

	if (d.coins <= 0) {
		const badCoin: Coin = {
			yPosition: -(innerHeight - yScale(1) + coinRadius),
			inDelay: delayCalculator.calcDelay('in', 1),
			outDelay: delayCalculator.calcDelay('out', 1),
		};
		coinsArr.push(badCoin);
		return coinsArr;
	}

	for (let i = 1; i < d.coins + 1; i++) {
		const coin: Coin = {
			yPosition: -(innerHeight - yScale(i) + coinRadius),
			inDelay: delayCalculator.calcDelay('in', i),
			outDelay: delayCalculator.calcDelay('out', i),
		};
		coinsArr.push(coin);
	}
	return coinsArr.sort((a, b) => b.yPosition - a.yPosition);
};

export const splitSentenceDownMiddle = (sentence: string): string[] => {
	const words = sentence.split(' ');
	const middle = Math.floor(words.length / 2);
	const firstHalf = words.slice(0, middle).join(' ');
	const secondHalf = words.slice(middle, words.length).join(' ');
	return [firstHalf, secondHalf];
};
