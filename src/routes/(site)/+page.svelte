<script lang="ts">
	import { onMount } from 'svelte';
	import type { SvelteComponent } from 'svelte';
	import { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim'; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.

	import { theme } from '$lib/store';
	import { siteConfig } from '$lib/config';
	import { Body1, H2, H4, H5 } from '$lib/components/internal/typography';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';

	export let data;

	const { recentPosts, allCategories, featuredPosts } = data;

	let particlesContainerDiv: HTMLDivElement | null = null;
	let ParticlesComponent: SvelteComponent;
	onMount(async () => {
		const module = await import('@tsparticles/svelte');

		ParticlesComponent = module.default as unknown as SvelteComponent;
	});

	$: particlesConfig = {
		fullScreen: { enable: false },
		particles: {
			color: {
				value: ['#6EFFD1', '#9E95F1'],
			},
			size: {
				value: {
					min: 5,
					max: 10,
				},
			},
			links: {
				enable: true,
				color: $theme === 'light' ? '#000' : '#fff',
				// distance: 150,
				// opacity: 0.4,
				// width: 1,
			},
			move: {
				enable: true,
				speed: 1.5,
			},
			number: {
				value: 4,
				density: {
					enable: true,
					width: particlesContainerDiv?.clientWidth,
					height: particlesContainerDiv?.clientHeight,
				},
			},
		},
		interactivity: {
			events: {
				onHover: {
					enable: true,
					mode: 'grab',
				},
				onClick: {
					enable: true,
					mode: 'push',
				},
			},
			modes: {
				grab: {
					distance: 140,
					links: {
						opacity: 1,
					},
				},
				push: {
					quantity: 4,
				},
			},
		},
	};

	let onParticlesLoaded = (event) => {
		const particlesContainer = event.detail.particles;

		// you can use particlesContainer to call all the Container class
		// (from the core library) methods like play, pause, refresh, start, stop
	};

	void particlesInit(async (engine) => {
		// call this once per app
		// you can use main to customize the tsParticles instance adding presets or custom shapes
		// this loads the tsparticles package bundle, it's the easiest method for getting everything ready
		// starting from v2 you can add only the features you need reducing the bundle size
		//await loadFull(main);
		await loadSlim(engine);
	});
</script>

<main>
	<div class="profile" bind:this={particlesContainerDiv}>
		<H5>Welcome!</H5>
		<Body1>{siteConfig.pages.landing.miniAboutMe.quickDescription}</Body1>
	</div>

	<div class="welcome">
		{#if ParticlesComponent}
			<ParticlesComponent
				id="tsparticles"
				class="put your classes here"
				style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: -1;"
				options={particlesConfig}
				on:particlesLoaded={onParticlesLoaded}
			/>
		{/if}
		<H2>{siteConfig.pages.landing.welcome.header}</H2>
		<H4 style="font-weight: var(--font-weight-light); padding-left: var(--spacing-2); z-index: 2;">
			{siteConfig.pages.landing.welcome.description}
		</H4>
	</div>

	<div />

	<H4>Recent Posts</H4>

	<Sidebar {featuredPosts} {allCategories} />

	<div>
		<PostsList posts={recentPosts} />
	</div>
</main>

<style lang="scss">
	@import '/src/styles/mixins.scss';

	main {
		@include base-layout;
		row-gap: var(--spacing-16);

		.profile {
			flex: 1 0 30rem;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: var(--spacing-24);
		}

		.welcome {
			height: 100%;
			align-content: center;
			position: relative;
		}
	}
</style>
