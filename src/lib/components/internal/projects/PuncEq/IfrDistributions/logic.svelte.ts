export const logNormalPDF = (x: number, mu: number, sigma: number) => {
	if (x <= 0) {
		return 0;
	}
	return (
		(1 / (x * sigma * Math.sqrt(2 * Math.PI))) *
		Math.exp(-Math.pow(Math.log(x) - mu, 2) / (2 * sigma * sigma))
	);
};

export const xAccessor = (d: { x: number; y: number }) => d.x;
export const yAccessor = (d: { x: number; y: number }) => d.y;
