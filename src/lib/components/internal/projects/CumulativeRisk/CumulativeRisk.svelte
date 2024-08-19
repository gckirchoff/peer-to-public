<script lang="ts">
	import Body2 from '../../typography/Body2.svelte';
	import Chart from './Chart/Chart.svelte';
	import Highlight from './Highlight/Highlight.svelte';
	import { roundTo } from './logic';

	let inputLongCovidPercent = 15;
	let infectionCount = 3;

	$: longCovidChance = inputLongCovidPercent / 100;
	$: chanceOfNotGettingLongCovid = 1 - longCovidChance;
	$: chanceOfNotGettingLongCovidAfterNInfections = Math.pow(
		chanceOfNotGettingLongCovid,
		infectionCount,
	);
	$: cumulativeRiskOfLongCovid = 1 - chanceOfNotGettingLongCovidAfterNInfections;
</script>

<p>
	When people say “during Covid”, they're referring to the pandemic in the past tense, something
	that's already over, despite the fact that the WHO still regards Covid-19 as an <a
		href="https://www.who.int/europe/emergencies/situations/covid-19"
		target="_blank">active pandemic</a
	>. At this point, we have gone back to “living our (pre-pandemic) lives”, which - for most - means
	taking no precautions at all.
</p>

<p>
	It has become apparent that without decisive mitigation becoming established through government
	and societal action, most of us will continue to get infected with SARS-CoV-2, likely <a
		href="https://fortune.com/2022/05/25/how-often-can-you-get-covid-yearly-modeling-shows/"
		target="_blank">once or twice</a
	>
	a year. Because some of the health risks of Covid are
	<a
		href="https://finance.yahoo.com/news/surviving-pandemic-only-half-battle-100000219.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAK8oN5Ok9gW-aBGtmLCxIdj2s0RsR5N0FbEw59qkNO8agXlEcXS2gJolOD6Q-9tGI6ILc9KnNulKEuYMljOdy8HJhRBUwqTx3fa3OkL-Q3t8Mi0TC_zvZ-4S85Cu3Nj7L_N1kCzxAjQo62pAjAHgQhDjOJxHr8QYD6lfpiWhW74c"
		target="_blank">irreversible</a
	>, it's worth digging a little deeper into the practical implications of that.
</p>

<p>
	The first thing to know is that Covid is not a cold, it's a car accident. It spreads throughout
	the body, impacting many different organ systems. Some percentage of people who get Covid end up
	with Long Covid, a debilitating cluster of symptoms that involves fatigue and reduced cognitive
	ability. Some percentage of people who get Covid end up harboring the virus in their bodies
	persistently (this may or may not overlap with Long Covid). Separate from those two categories of
	delayed harm, many individuals infected with Covid have delayed health effects (heart attacks,
	strokes, kidney damage) that are in some cases <a
		href="https://www.panaccindex.info/p/what-covid-19-does-to-the-body-fourth"
		target="_blank">progressive</a
	>. It's not unusual to get into a car accident and be just fine, but a lifestyle that involves
	getting into a car accident once a year comes with a reduced life expectancy.
</p>

<p>
	This makes sense if we think about it from the concept of cumulative risk. Much of the argument
	around Covid has centered around the persistent robustness of our immune response, <a
		href="https://torontolife.com/city/i-was-appalled-to-see-the-prime-minister-making-those-comments-a-u-of-t-epidemiologist-on-the-myth-of-immunity-debt-and-the-real-reason-everyones-getting-sick/"
		target="_blank">neglecting</a
	> the persistent damage that infection can cause.
</p>

<p>
	To understand this, we need to understand cumulative risk. This concept is simple to understand,
	but is often misinterpreted. According to data gathered by Statistics Canada, the risk of
	developing symptomatic Long Covid is around 15% per infection. This makes perfect sense when
	looking at one infection. Your chance of developing symptomatic Long Covid is 15%. However, what
	is the chance from 3 infections? Does the overall chance remain 15% because each infection has a
	15% chance, or is the overall chance 45% from adding them all up? The answer is about 38.6%.
</p>

<p>
	To explain this in the context of COVID-19, the default value for this interactive guide is 15%,
	but adjust it to any number between 0 and 100% to gain a better understanding of how this works.
</p>

<p>For the rest of the article:</p>

<p>
	The chance of getting symptomatic Long Covid is
	<input bind:value={inputLongCovidPercent} type="number" />%
</p>

<p>
	We want to know the probability of having contracted Long Covid after
	<input bind:value={infectionCount} type="number" />
	infections
</p>

<p>
	The final question we want answered is, “What is the overall chance I get Long Covid if I get
	infected <Highlight>{infectionCount}</Highlight>. times?" A simpler way to think of this at first
	is , “If I flip a coin <Highlight>{infectionCount}</Highlight>
	times, what is the chance that at least 1 of them lands heads up?” It could be 1 or 2 {infectionCount >
	2
		? `or ${infectionCount}`
		: ''}
	times for example, just as long as at least 1 coin lands heads up.
</p>

<p>
	Going back to Long Covid as our primary example, our next question to ask is, “What is the chance
	I get infected <Highlight>{infectionCount}</Highlight> times and don't get any Long Covid?” This is
	important to ask because this is the only combination of results that doesn't include any Covid cases
	resulting in Long Covid. Let's find that.
</p>

<p>The chance of NOT getting symptomatic Long Covid from an infection is:</p>

<p>
	1 -<Highlight>{roundTo(longCovidChance, 4)}</Highlight> = <Highlight
		>{roundTo(chanceOfNotGettingLongCovid, 4)}</Highlight
	> Which is <Highlight>{roundTo(chanceOfNotGettingLongCovid * 100, 2)}</Highlight>%.
</p>

<p>
	The formula to find the chance that something occurs <i>n</i> times is <i>(p)^n</i> where p is the
	probability of the event occurring and n is the number of “successes” we are expecting.
</p>

<p>
	So, the chance that someone gets infected with Covid <Highlight>{infectionCount}</Highlight> times
	and hasn't gotten symptomatic Long Covid from any of them is:
</p>

<p>
	(<Highlight>{roundTo(chanceOfNotGettingLongCovid, 4)}</Highlight>)^<Highlight
		>{infectionCount}</Highlight
	> = <Highlight>{roundTo(chanceOfNotGettingLongCovidAfterNInfections, 2)}</Highlight> which is <Highlight
		>{roundTo(chanceOfNotGettingLongCovidAfterNInfections * 100, 2)}</Highlight
	>%
</p>

<p>
	There is a <Highlight>{roundTo(chanceOfNotGettingLongCovidAfterNInfections * 100, 2)}</Highlight>%
	chance that someone doesn't get Long Covid after having been infected
	<Highlight>{infectionCount}</Highlight> times. In order to know the chance of getting Long Covid from
	at least one of these infections, we want to know the chance that this DOESN'T happen. For that, you
	simply subtract this from 1:
</p>

<p>
	1 - <Highlight>{roundTo(chanceOfNotGettingLongCovidAfterNInfections, 4)}</Highlight> = <Highlight
		>{roundTo(cumulativeRiskOfLongCovid, 4)}</Highlight
	> = <Highlight>{roundTo(cumulativeRiskOfLongCovid * 100, 2)}</Highlight>%
</p>

<p>
	So there we have it. Assuming Covid infections come with a <Highlight
		>{roundTo(inputLongCovidPercent, 2)}</Highlight
	>% chance of getting Long Covid each time, getting Covid <Highlight>{infectionCount}</Highlight> times
	results in a cumulative risk of getting Long Covid of <Highlight
		>{roundTo(cumulativeRiskOfLongCovid * 100, 2)}</Highlight
	>%.
</p>

<p>
	Note that if you made the chance of getting Long Covid 14% per infection, the result of 1, 2, and
	3 infections tracks remarkably close with the population data gathered by <a
		href="https://www150.statcan.gc.ca/n1/pub/75-006-x/2023001/article/00015-eng.htm"
		target="_blank">Statistics Canada</a
	>.
</p>

<img
	src="/images/postImages/understanding-cumulative-risk/cumulative-long-covid-risk-stats-can.png"
	alt="cumulative risk data derived from Stats Can population study. The risk rises near identically to what would be expected from the probability mass function"
/>

<p>
	This interactive chart below makes an important practical point: should the data found by
	Statistics Canada be indicative of a cumulative risk pattern, getting Long Covid becomes an
	inevitability.
</p>

<p>
	Getting Covid repeatedly is not a game we can win in the long-term. Like playing roulette, we can
	win a game, maybe even a few, but given enough chances, the house always wins. The good news is
	that you <a
		href="https://typingmonkeys.substack.com/p/you-dont-need-to-catch-that-wave"
		target="_blank">don't</a
	>
	have to sign up for getting Covid once a year. There are things you can do to avoid that. And if you
	do get Covid, there are
	<a href="https://typingmonkeys.substack.com/p/what-to-do-if-you-get-covid" target="_blank"
		>concrete steps</a
	> you can take to reduce the risk of long-term health outcomes.
</p>

<p>
	“Learning to live with Covid” should mean learning to live our lives while rationally mitigating
	the ever-present risks of an airborne disease with debilitating consequences. Not learning to live
	while harboring the virus, or the scars it leaves, in our bodies.
</p>

<label class="range-input">
	<Body2><Highlight>{inputLongCovidPercent}%</Highlight> Long Covid risk per infection:</Body2>
	<input bind:value={inputLongCovidPercent} type="range" min={0} max={100} step={0.1} />
</label>

<Chart {longCovidChance} />

<style lang="scss">
	img {
		margin-bottom: var(--spacing-24);
	}
	input[type='number'] {
		width: 6rem;
		border: 1px solid black;
		border-radius: var(--rounded-4);
	}

	.range-input {
		display: flex;
		flex-direction: column;
		align-items: center;
		row-gap: var(--spacing-4);

		input {
			cursor: pointer;
		}
	}
</style>
