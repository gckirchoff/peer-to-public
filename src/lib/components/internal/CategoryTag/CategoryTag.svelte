<script lang="ts">
	import { Body1 } from '../typography';

	export let category: string;
</script>

<li>
	<Body1><a href="/posts/category/{category}">{category}</a></Body1>
</li>

<style lang="scss">
	a {
		background-color: var(--clr-surface-600);
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);
		color: var(--clr-text);

		&:hover {
			background-color: var(--clr-surface-700);
			color: var(--clr-txt-neg);
		}
	}
</style>
