export interface Margin {
	top: number;
	left: number;
	right: number;
	bottom: number;
}

export interface Series {
	group: string;
	values: number[];
	color?: string;
}
