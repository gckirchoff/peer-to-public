<script lang="ts">
	import '../styles/styles.scss';

	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	import { H1, H3, H4 } from '$lib/components/internal/typography';

	onMount(() => {
		document.body.style.visibility = 'visible';
	});
</script>

<main>
	<H1>{$page.status}</H1>
	<H3>{$page.error?.message}</H3>

	<H4>
		<a href="/">Back to home</a>
	</H4>
</main>

<style lang="scss">
	main {
		min-height: 100vh;
		padding: var(--spacing-24);
		background-color: whitesmoke;
	}
</style>
