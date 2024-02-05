<script lang="ts">
	export let id = '';
	export let x1: number | string = 0;
	export let x2: number | string;
	export let y1: number | string = 0;
	export let y2: number | string;
	export let colors: string[] = [];
</script>

<linearGradient {id} {x1} {x2} {y1} {y2} gradientUnits="userSpaceOnUse" spreadMethod="pad">
	{#each colors as color, i}
		<stop offset={`${(i * 100) / (colors.length - 1)}%`} stop-color={color} />
	{/each}
</linearGradient>
