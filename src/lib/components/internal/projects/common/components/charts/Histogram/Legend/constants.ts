interface Group {
	label: string;
	color: string;
}

export interface LegendProps {
	groups: Group[];
	chartWidth: number;
	chartHeight: number;
}
