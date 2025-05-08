export const randNumBetween = (min: number, max: number): number =>
	Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Box-Muller transform to generate standard normally distributed random number.
 * N(0, 1)
 */
const randn_bm = (): number => {
	let u = 0,
		v = 0;
	while (u === 0) u = Math.random(); // Avoid 0
	while (v === 0) v = Math.random();
	return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

export const randomLogNormal = (mu: number = 0, sigma: number = 1): number => {
	const normal = randn_bm();
	const logNormalTransformed = Math.exp(mu + sigma * normal);
	return logNormalTransformed;
};
