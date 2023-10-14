<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' | null | undefined = undefined;
	export let style: string = '';
	export let disabled = false;
</script>

<button on:click {type} {style} {disabled}><slot /></button>

<style lang="scss">
	button {
		color: var(--clr-txt);
		background-color: var(--clr-primary-300);
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);
		transition: all 0.1s;

		&:hover {
			background-color: var(--clr-primary-400);
		}

		&:disabled {
			filter: brightness(0.8);
			pointer-events: none;
		}
	}
</style>
