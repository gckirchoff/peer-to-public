import { maxInfectionCount, type InfectionCumulativeRisk } from './constants';

const calculateCumulativeRisk = (
	longCovidChance: number,
	infectionCount: number,
	riskGrowthFactor: number,
) => {
	let chanceOfNotGettingLongCovid = 1;

	for (let i = 1; i <= infectionCount; i++) {
		let adjustedRisk = Math.min(longCovidChance * Math.pow(riskGrowthFactor, i - 1), 1);
		chanceOfNotGettingLongCovid *= 1 - adjustedRisk;
	}

	return 1 - chanceOfNotGettingLongCovid;
};

export const getCumulativeRisks = (
	longCovidChance: number,
	riskGrowthFactor: number,
	totalInfectionCount = maxInfectionCount,
): InfectionCumulativeRisk[] => {
	const cumulativeRisks: InfectionCumulativeRisk[] = [];
	for (let i = 0; i < totalInfectionCount + 1; i++) {
		const risk = calculateCumulativeRisk(longCovidChance, i, riskGrowthFactor);
		cumulativeRisks.push({
			infectionCount: i,
			risk,
		});
	}
	return cumulativeRisks;
};
