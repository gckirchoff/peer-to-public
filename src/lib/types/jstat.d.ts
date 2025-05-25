declare module 'jstat' {
	export function mean(values: number[]): number;
	export function median(values: number[]): number;
	export function variance(values: number[], flag?: boolean): number;

	export namespace centralF {
		function cdf(x: number, df1: number, df2: number): number;
	}

	export namespace studentt {
		function cdf(t: number, df: number): number;
	}
}
