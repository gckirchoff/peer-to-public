<script lang="ts">
	import { Body1 } from '../typography';

	export let category: string;
</script>

<li>
	<Body1><a href="/posts/category/{category}">{category}</a></Body1>
</li>

<style lang="scss">
	a {
		color:  var(--clr-primary-800);
		background-color:  var(--clr-primary-300);
		font-size: var(--font-14);
		font-weight: var(--font-weight-regular);
		text-transform: uppercase;
		
		padding: var(--spacing-4) var(--spacing-8);
		border-radius: var(--rounded-4);
		transition: all 0.2s ease-in;


		&:hover {
			background-color: var(--clr-primary-600);
			color: var(--clr-txt-neg);
		}
	}
</style>
