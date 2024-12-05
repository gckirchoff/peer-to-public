<script lang="ts">
	import { Body1 } from '../typography';

	export let category: string;
</script>

<li>
	<a href="/posts/category/{category}">{category}</a>
</li>

<style lang="scss">
	a {
		color: var(--clr-text-on-primary-500);
		background-color: var(--clr-primary-500);
		font-size: var(--font-12);
		font-weight: var(--font-weight-regular);
		text-transform: uppercase;
		

		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);
		transition: all 0.1s ease-in;

		cursor: pointer;

		&:hover {
			filter: brightness(0.9);
		}
	}
</style>
