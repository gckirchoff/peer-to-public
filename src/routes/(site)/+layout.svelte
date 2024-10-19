<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';

	import '../../styles/styles.scss';
	import Header from '$lib/components/internal/Header/Header.svelte';
	import Footer from '$lib/components/internal/Footer/Footer.svelte';
	import Transition from '$lib/components/internal/Transition/Transition.svelte';

	export let data;

	onMount(() => {
		document.body.style.visibility = 'visible';
	});

	inject({ mode: dev ? 'development' : 'production' });
</script>

<div class="site">
	<Header />
	<div class="content">
		<Transition url={data.currentUrl} exceptions={['/posts']}>
			<slot />
		</Transition>
	</div>
	<Footer />
</div>

<style lang="scss">
	@use '/src/styles/mixins.scss';

	.site {
		min-height: 100vh;
		min-height: 100dvh;

		display: grid;
		grid-template-rows: auto 1fr auto;
	}
</style>
