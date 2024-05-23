<script lang="ts">
	import type { Variant } from '$lib/types/styles';

	export let type: 'submit' | 'button' | 'reset' | null | undefined = undefined;
	export let style: string = '';
	export let disabled = false;
	export let variant: Variant = 'primary';

	$: finalStyles =
		`--background-color: var(--clr-${variant}-500); --color: var(--clr-text-on-${variant}); --hover-color: var(--clr-${variant}-400);` +
		style;
</script>

<button on:click {type} style={finalStyles} {disabled}><slot /></button>

<style lang="scss">
	button {
		color: var(--color);
		background-color: var(--background-color);
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);
		transition: all 0.1s;

		&:hover {
			background-color: var(--hover-color);
		}

		&:disabled {
			filter: brightness(0.8);
			pointer-events: none;
		}
	}
</style>
