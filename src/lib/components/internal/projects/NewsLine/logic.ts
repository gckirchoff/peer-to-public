import type { WastewaterReport, UnprocessedWastewaterReport } from './constants';

export const parseRow = (row: UnprocessedWastewaterReport): WastewaterReport => ({
	...row,
	value: +row.value,
});
