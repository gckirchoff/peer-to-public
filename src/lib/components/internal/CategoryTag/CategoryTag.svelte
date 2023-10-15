<script lang="ts">
	import { Body1 } from '../typography';

	export let category: string;
</script>

<li>
	<Body1><a href="/posts/category/{category}">{category}</a></Body1>
</li>

<style lang="scss">
	a {
		background-color:  var(--clr-primary-300);
		padding: var(--spacing-2) var(--spacing-4);
		text-transform: uppercase;
		font-size: var(--font-14);
		border-radius: var(--rounded-4);
		color:  var(--clr-primary-800);

		&:hover {
			background-color: var(--clr-surface-700);
			color: var(--clr-txt-neg);
		}
	}
</style>
