<script lang="ts">
	import type { HoverTriangleProps } from './constants';

	let { yScale, tooltipData }: HoverTriangleProps = $props();

	const triangleWidth = 8;
	const triangleHeight = 12;
	const xNudge = -1;

	let triangleY = $derived(yScale(tooltipData.value));
</script>

<polygon
	points={`
                ${0 + xNudge},${triangleY} 
                ${0 - triangleWidth + xNudge},${triangleY - triangleHeight / 2} 
                ${0 - triangleWidth + xNudge},${triangleY + triangleHeight / 2}
              `}
	fill="grey"
/>
