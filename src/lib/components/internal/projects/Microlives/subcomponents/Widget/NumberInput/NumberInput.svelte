<script lang="ts">
	export let value: number;
	export let label = '';
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: string | undefined = undefined;
</script>

<label>
	<input bind:value type="number" {min} {max} {step} />
	{label}
</label>

<style lang="scss">
	label {
		display: flex;
		align-items: center;
		gap: var(--spacing-8);
		cursor: pointer;
		user-select: none;

		input {
			border: 2px solid black;
			line-height: 1.5;
			text-align: center;
			width: 6rem;
			padding-left: 1.4rem;

			&:focus {
				outline: none;
			}
		}
	}
</style>
