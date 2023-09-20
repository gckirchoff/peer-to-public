<script lang="ts">
	export let type: 'submit' | 'button' | 'reset' | null | undefined = undefined;
	export let style: string = '';
</script>

<button on:click {type} {style}><slot /></button>

<style lang="scss">
	button {
		color: var(--clr-txt);
		background-color: var(--clr-primary-300);
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);

		&:hover {
			background-color: var(--clr-primary-400);
		}
	}
</style>
