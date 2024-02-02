<script lang="ts">
	import type { Distribution } from './constants';
	import { beginningOfPandemic } from './constants';

	let hazardRatio = 1.5;
	let delay = 20;
	let dateOfPrevention = new Date('2025/05/12');

	let distributions: Distribution[] = [];
	$: {
		const differenceInMilliseconds = dateOfPrevention.getTime() - beginningOfPandemic.getTime();
		const standardDeviation = delay / 3;
		const yearsDifference = dateOfPrevention.getFullYear() - beginningOfPandemic.getFullYear();
		const newDistributions: Distribution[] = [];
		for (let i = 0; i <= yearsDifference; i++) {
			const year = beginningOfPandemic.getFullYear() + i;
			const casesBinDate = i === yearsDifference ? dateOfPrevention : new Date(year, 11, 31);
			const futureMeanIncidenceDate = new Date(casesBinDate.getTime());
			futureMeanIncidenceDate.setFullYear(futureMeanIncidenceDate.getFullYear() + delay);
			const distribution: Distribution = {
				start: casesBinDate,
				mean: futureMeanIncidenceDate,
				standardDeviation,
			};
			newDistributions.push(distribution);
		}
		distributions = newDistributions;
        console.log('distributions', distributions);
	}
</script>
