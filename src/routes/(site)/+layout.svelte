<script lang="ts">
	import { onMount } from 'svelte';
	import { preloadCode } from '$app/navigation';

	import '../../styles/styles.scss';
	import { navItems } from '$lib/config';
	import Header from '$lib/components/internal/Header/Header.svelte';
	import Transition from '$lib/components/internal/Transition/Transition.svelte';

	export let data;

	onMount(() => {
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);
	});
</script>

<Header />
<main>
	<Transition url={data.currentUrl} exceptions={['/posts']}>
		<slot />
	</Transition>
</main>

<style lang="scss">
	main {
		padding: var(--spacing-24);
	}
</style>
