<script lang="ts">
	export let value: string | number | object;
	export let id = '';
</script>

<div class="custom-select">
	<select bind:value {id}>
		<slot />
	</select>
</div>

<style lang="scss">
	.custom-select {
		position: relative;
		min-width: 3.5rem;

		select {
			appearance: none;
			width: 100%;
			font-size: 1.3rem;
			padding: 0.5em 6em 0.5em 1em;
			background-color: #fff;
			border: 2px solid black;
			border-radius: 0.25rem;
			color: #000;
			cursor: pointer;
		}

		&::before,
		&::after {
			--size: 0.3rem;
			position: absolute;
			content: '';
			right: 1rem;
			pointer-events: none;
		}

		&::before {
			border-left: var(--size) solid transparent;
			border-right: var(--size) solid transparent;
			border-bottom: var(--size) solid black;
			top: 40%;
		}

		&::after {
			border-left: var(--size) solid transparent;
			border-right: var(--size) solid transparent;
			border-top: var(--size) solid black;
			top: 55%;
		}
	}
</style>
