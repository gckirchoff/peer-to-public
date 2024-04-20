<script lang="ts">
	export let value: number;
	export let label = '';
	export let min: number | undefined = undefined;
	export let max: number | undefined = undefined;
	export let step: string | undefined = undefined;

	let errorMessage = '';

	$: handleChange = (
		event: Event & {
			currentTarget: HTMLInputElement;
		},
	) => {
		errorMessage = '';
		const newVal = Number((event.target as HTMLInputElement).value);
		if (isNaN(newVal)) {
			return;
		}

		if (min !== undefined && newVal < min) {
			errorMessage = `min: ${min}`;
			return;
		}
		if (max !== undefined && newVal > max) {
			errorMessage = `max: ${max}`;
			return;
		}
		value = newVal;
	};
</script>

<label>
	<input {value} on:input={handleChange} type="number" {min} {max} {step} />
	{label}
</label>
{#if errorMessage}
	<p class="error-message">{errorMessage}</p>
{/if}

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
	.error-message {
		color: var(--clr-error-500);
	}
</style>
