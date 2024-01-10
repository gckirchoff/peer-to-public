import type { Modify } from '$lib/types/util';

export interface WastewaterReport {
	date: string;
	value: number;
}

export type UnprocessedWastewaterReport = Modify<
	WastewaterReport,
	{
		value: string;
	}
>;

export const fakeData: WastewaterReport[] = [
	{
		date: '2020-03-01',
		value: 0,
	},
	{
		date: '2020-04-01',
		value: 500,
	},
	{
		date: '2020-07-01',
		value: 1500,
	},
	{
		date: '2020-12-01',
		value: 500,
	},
	{
		date: '2021-02-01',
		value: 750,
	},
	{
		date: '2021-05-01',
		value: 1250,
	},
	{
		date: '2021-10-01',
		value: 2000,
	},
	{
		date: '2022-01-01',
		value: 2500,
	},
	{
		date: '2022-04-01',
		value: 3000,
	},
];
