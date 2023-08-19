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
<div class="content">
	<Transition url={data.currentUrl} exceptions={['/posts']}>
		<slot />
	</Transition>
</div>

<style lang="scss">
	.content {
		padding: var(--spacing-64);
	}
</style>
