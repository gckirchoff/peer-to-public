<script lang="ts">
	export let value: number;
	export let label = '';
</script>

<label>
	<input type="number" bind:value />
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
