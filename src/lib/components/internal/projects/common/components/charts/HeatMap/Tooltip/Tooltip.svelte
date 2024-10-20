<script lang="ts">
	import type { TooltipProps } from './constants';

	let { tooltipData }: TooltipProps = $props();
</script>

<div class="tooltip" style="left: {tooltipData.xPosition}px; top: {tooltipData.yPosition}px">
	<div>
		<span>
			<b>x</b>: {tooltipData.xLabel}
		</span>
	</div>
	<div>
		<span>
			<b>y</b>: {tooltipData.yLabel}
		</span>
	</div>
	<div>
		<span>
			<b>value</b>: {tooltipData.value}
		</span>
	</div>
</div>

<style lang="scss">
	.tooltip {
		font-size: var(--font-20);
		position: absolute;
		background-color: rgba(0, 0, 0, 0.8);
		border-radius: 4px;
		color: white;
		padding: 4px;
		margin-left: 15px;
		transform: translateY(-50%);
		transition: all 150ms ease;
		pointer-events: none;

		&::after {
			content: '';
			position: absolute;
			border-width: 5px; /* Arrow width */
			left: -10px; /* Arrow width * 2 */
			top: 50%;
			transform: translateY(-50%);
			border-color: transparent black transparent transparent;
		}
	}
</style>
