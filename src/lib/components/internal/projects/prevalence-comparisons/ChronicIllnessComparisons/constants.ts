export type RawCsv<T> = {
	[K in keyof T]: string;
};

export type CompareMode = 'to each other' | 'to rare baseline';

export interface ChronicIlnessComparisonsProps {
	src: string;
	compareMode?: CompareMode;
}
export interface PrevalenceData {
	illness: string;
	adultPrevalence: number;
	isRareInAdults: boolean;
	adultPrevalenceSource: string;
	relativeSearchInterest: number;
	relativeSearchInterestSource: string;
	funding: number;
	fundingSource: string;
	isPreventable: boolean;
	ratioValue: number | null;
}

export type CsvPrevalenceData = RawCsv<PrevalenceData>;

export const options = [
	{
		value: 'adultPrevalence',
		label: 'Prevalence'
	},
	{
		value: 'relativeSearchInterest',
		label: 'Search Interest'
	},
	{
		value: 'funding',
		label: 'Funding'
	}
];

export const adultLcPrevalenceSourceOptions = [
	{
		value: 1,
		label: '6% (WHO 2025)',
		href: 'https://www.who.int/news-room/fact-sheets/detail/post-covid-19-condition-(long-covid)',
		adultPrevalence: 0.06
	},
	{
		value: 2,
		label: '7% (CDC 2025)',
		href: 'https://www.cdc.gov/long-covid/php/scientific-approach/index.html',
		adultPrevalence: 0.07
	},
	{
		value: 3,
		label: '8% (Cidrap UMN 2024)',
		href: 'https://www.cidrap.umn.edu/covid-19/about-8-us-adults-have-ever-had-long-covid-survey-finds',
		adultPrevalence: 0.08
	},
	{
		value: 4,
		label: '14% (Yale Medicine 2024)',
		href: 'https://www.yalemedicine.org/news/long-covid-keeps-people-out-of-work-and-hurts-the-economy',
		adultPrevalence: 0.14
	},
	{
		value: 5,
		label: '36% (OFID 2025)',
		href: 'https://academic.oup.com/ofid/article/12/9/ofaf533/8244677',
		adultPrevalence: 0.36
	}
	// {
	// 	label: '14% (Plos One), 2023',
	// 	href: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10621843',
	// 	value: 3,
	// 	adultPrevalence: 0.14
	// },
];
