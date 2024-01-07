<script lang="ts">
	import { spring } from 'svelte/motion';

	export let d: string | null;
	export let fill = 'none';
	export let stroke = 'black';
	export let strokeWidth: string | number = '1';
	export let style = '';
	export let percent = 1;

	let svgLine: SVGPathElement;

	let percentThroughLength = spring(1 - percent, { stiffness: 0.08, damping: 0.4 });
	$: $percentThroughLength = 1 - percent;

	$: lineStyles =
		style +
		(svgLine
			? `
            stroke-dasharray: ${svgLine.getTotalLength()};
            stroke-dashoffset: ${svgLine.getTotalLength() * $percentThroughLength}
        `
			: '');
</script>

<path {d} {fill} {stroke} stroke-width={strokeWidth} bind:this={svgLine} style={lineStyles} />
