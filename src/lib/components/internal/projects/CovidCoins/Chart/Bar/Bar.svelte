<script lang="ts">
	import { fly } from 'svelte/transition';
	import { bounceOut, backOut } from 'svelte/easing';
	import type { ScaleBand, ScaleLinear } from 'd3';

	import RegularCoin from '../../icons/RegularCoin.svelte';
	import CovidCoin from '../../icons/CovidCoin.svelte';
	import InjuryCoin from '../../icons/InjuryCoin.svelte';
	import type { Outcome, RiskItem } from '../../constants';
	import { getCoins } from './logic';

	export let d: RiskItem;
	export let xScale: ScaleBand<string>;
	export let yScale: ScaleLinear<number, number, never>;
	export let columnIndex: number;
	export let innerHeight: number;
	export let outcome: Outcome;
	export let barsSwappedPlaces: boolean;

	$: coinDiameter = xScale.bandwidth();
	$: coinRadius = coinDiameter / 2;

	$: coins = getCoins({
		d,
		yScale,
		coinRadius,
		columnIndex,
		barsSwappedPlaces,
		innerHeight,
	});
</script>

<rect
	x={7}
	y={-(innerHeight - yScale(d.coins))}
	width={xScale.bandwidth()}
	height={innerHeight - yScale(d.coins)}
	fill="black"
	style="transition: all 300ms ease;"
	opacity={0}
/>
{#each coins as coin}
	<g
		transform="translate({0} {coin.yPosition})"
		in:fly|global={{
			delay: coin.inDelay,
			y: -200,
			duration: 250,
			easing: bounceOut,
		}}
		out:fly|local={{
			delay: coin.outDelay,
			y: -20,
			duration: 250,
			easing: backOut,
		}}
	>
		{#if d.item === 'Covid-19'}
			<CovidCoin size={coinDiameter} />
		{:else if outcome === 'mortality'}
			<RegularCoin size={coinDiameter} />
		{:else}
			<InjuryCoin size={coinDiameter} />
		{/if}
	</g>
{/each}
{#each d.item.split(' ') as word, index}
	<text x={0} y={0} dx={coinRadius} dy={index * 18 + coinRadius} text-anchor="middle">
		{word}
	</text>
{/each}

<style lang="scss">
	text {
		font-size: 1.4rem;
		font-family: var(--font-base);
		user-select: none;
		fill: #464646;
	}
</style>
