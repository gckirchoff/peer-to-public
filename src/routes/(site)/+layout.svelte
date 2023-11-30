<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { preloadCode } from '$app/navigation';
	import { inject } from '@vercel/analytics';

	import '../../styles/styles.scss';
	import { navItems } from '$lib/config';
	import Header from '$lib/components/internal/Header/Header.svelte';
	import Transition from '$lib/components/internal/Transition/Transition.svelte';

	export let data;

	onMount(() => {
		const navRoutes = navItems.map((item) => item.route);
		preloadCode(...navRoutes);
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<Header />
<div class="content">
	<Transition url={data.currentUrl} exceptions={['/posts']}>
		<slot />
	</Transition>
</div>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	.content {
		padding: var(--spacing-64);

		@include respond(mobile) {
			padding: var(--spacing-4);
		}
	}
</style>
