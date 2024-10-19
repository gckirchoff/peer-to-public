<script lang="ts">
	import { tick } from 'svelte';

	let show = false;
	let activateMobileOverlay = false;

	let tooltipIcon: HTMLSpanElement;
	let tooltipBox: HTMLSpanElement;

	let x = 0;
	let y = 0;

	const showTooltip = async () => {
		show = true;

		await tick();

		requestAnimationFrame(() => {
			const iconRect = tooltipIcon.getBoundingClientRect();
			const tooltipBoxRect = tooltipBox.getBoundingClientRect();

			x = iconRect.left + iconRect.width / 2 - tooltipBoxRect.width / 2;
			y = iconRect.top - tooltipBoxRect.height - 6;

			const overflowingRight = x + tooltipBoxRect.width / 2 > window.innerWidth;
			if (overflowingRight) {
				x = window.innerWidth - tooltipBoxRect.width / 2 - 10;
			}

			const overflowingLeft = x - tooltipBoxRect.width / 2 < 0;
			if (overflowingLeft) {
				x = tooltipBoxRect.width / 2 + 10;
			}

			const overflowingTop = y - tooltipBoxRect.height < 0;
			if (overflowingTop) {
				y = iconRect.bottom + 6;
			}
		});
	};

	const hideTooltip = () => {
		show = false;
		x = 0;
		y = 0;
	};

	const handleTouch = () => {
		activateMobileOverlay = true;
		showTooltip();
	};

	const handleMobileOverlayTouch = () => {
		activateMobileOverlay = false;
		hideTooltip();
	};
</script>

<span
	on:mouseover={showTooltip}
	on:mouseleave={hideTooltip}
	on:focus={showTooltip}
	on:blur={hideTooltip}
	on:touchstart={handleTouch}
	class="question-mark-icon"
	role="tooltip"
	bind:this={tooltipIcon}
></span>

<span
	class="tooltip-box"
	style="display: {show ? 'block' : 'none'}; top: {y}px; left: {x}px;"
	bind:this={tooltipBox}
>
	<slot />
</span>

{#if activateMobileOverlay}
	<div class="mobile-overlay" on:touchstart={handleMobileOverlayTouch}></div>
{/if}

<style>
	.question-mark-icon {
		margin: 0 0.15rem 0 0.25rem;
		content: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="-50 -50 100 100"%3E%3Cg fill="none" stroke="hsl(0, 0%25, 30%25)" stroke-linecap="round"%3E%3Cpath stroke-width="8" d="M -13 -13 m 0 -10 v 20 m 10 -10 h -20" /%3E%3Cg stroke-width="14"%3E%3Ccircle r="30" cx="-13" cy="-13" /%3E%3Cpath d="M 24 24 l 18 18" /%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
	}

	.tooltip-box {
		pointer-events: none;
		display: block;
		max-width: 50dvw;
		word-wrap: break-word; /* Enable wrapping */
		white-space: normal; /* Allow wrapping */
		border: 1px solid #ddd;
		box-shadow: 1px 1px 1px #ddd;
		background: white;
		border-radius: 4px;
		padding: 4px;
		position: fixed;
		z-index: 1000;
	}

	.mobile-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100dvh;
		background-color: transparent;
		z-index: 1001;
	}
</style>
