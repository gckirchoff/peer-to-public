import type { CompareMode, PrevalenceData } from '../constants';

export interface DataChartProps {
	data: PrevalenceData[];
	xProperty: keyof PrevalenceData;
	yProperty?: keyof PrevalenceData;
	showRare: boolean;
	allData: string[];
	compareMode: CompareMode;
	ratioed: boolean;
	ratioYProperty: keyof PrevalenceData;
}

export const margin = {
	top: 25,
	bottom: 200,
	left: 100,
	right: 10
};

export const yLabelMap: Partial<Record<keyof PrevalenceData, string>> = {
	adultPrevalence: 'Adult Prevalence',
	relativeSearchInterest: 'Relative Search Interest',
	funding: 'Research Funding'
};

export const sourceMap: Partial<Record<keyof PrevalenceData, keyof PrevalenceData>> = {
	adultPrevalence: 'adultPrevalenceSource',
	relativeSearchInterest: 'relativeSearchInterestSource',
	funding: 'fundingSource'
};

const rareIllnessUpperPopulationLimit = 200000;
const americaPopulation = 340110988;
export const rarityThreshold = rareIllnessUpperPopulationLimit / americaPopulation;

// this number can be negative to get darker or positive to fade lighter
export const fadeAmount = 55;
