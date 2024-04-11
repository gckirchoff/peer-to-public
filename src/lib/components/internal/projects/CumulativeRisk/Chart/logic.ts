import { maxInfectionCount, type InfectionCumulativeRisk } from './constants';

export const getCumulativeRisks = (
	longCovidChance: number,
	totalInfectionCount = maxInfectionCount,
): InfectionCumulativeRisk[] => {
	const cumulativeRisks: InfectionCumulativeRisk[] = [];
	for (let i = 0; i < totalInfectionCount + 1; i++) {
		const risk = 1 - Math.pow(1 - longCovidChance, i);
		cumulativeRisks.push({
			infectionCount: i,
			risk,
		});
	}
	return cumulativeRisks;
};
