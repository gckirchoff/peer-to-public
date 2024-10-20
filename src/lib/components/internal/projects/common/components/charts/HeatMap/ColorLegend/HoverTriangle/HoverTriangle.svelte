<script lang="ts">
	import type { HoverTriangleProps } from './constants';

	let { yScale, tooltipData }: HoverTriangleProps = $props();

	const triangleWidth = 8;
	const triangleHeight = 12;
	const xNudge = -1;

	let triangleY = $derived(yScale(tooltipData.value));
</script>

<polygon
	style="transform: translate(0, {triangleY}px);"
	points={`
                ${0 + xNudge},${0} 
                ${0 - triangleWidth + xNudge},${0 - triangleHeight / 2} 
                ${0 - triangleWidth + xNudge},${0 + triangleHeight / 2}
              `}
	fill="grey"
/>

<style lang="scss">
	polygon {
		transition: all 100ms ease;
	}
</style>
