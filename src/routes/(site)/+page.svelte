<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import type { SvelteComponent } from 'svelte';
	import { particlesInit } from '@tsparticles/svelte';
	import { loadSlim } from '@tsparticles/slim';

	import { theme } from '$lib/store';
	import { siteConfig } from '$lib/config';
	import { rgbToHex, parseRgbString } from '$lib/utils/styles/styles.js';
	import { Body1, H2, H4 } from '$lib/components/internal/typography';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';
	import Logo from '$lib/components/internal/icons/Logo/Logo.svelte';

	export let data;

	const { recentPosts, allCategories, featuredPosts } = data;

	let particlesContainerDiv: HTMLDivElement | null = null;
	let ParticlesComponent: SvelteComponent;
	onMount(async () => {
		const module = await import('@tsparticles/svelte');

		ParticlesComponent = module.default as unknown as SvelteComponent;
	});

	$: colorSurface200 = browser
		? $theme === 'light'
			? parseRgbString(getComputedStyle?.(document.body)?.getPropertyValue('--clr-surface-200'))
			: parseRgbString(getComputedStyle?.(document.body)?.getPropertyValue('--clr-surface-200'))
		: null;

	$: bannerBackgroundColor = colorSurface200
		? rgbToHex(colorSurface200.r, colorSurface200.g, colorSurface200.b)
		: '#000';

	$: particlesConfig = {
		fullScreen: { enable: false },
		background: {
			color: {
				value: bannerBackgroundColor,
			},
		},
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
	<div class="banner">
		{#if ParticlesComponent}
			<svelte:component
				this={ParticlesComponent}
				id="tsparticles"
				class="put your classes here"
				style="position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: -1;"
				options={particlesConfig}
				on:particlesLoaded={onParticlesLoaded}
			/>
		{/if}
		<div class="title">
			<Logo />
			<H2>{siteConfig.pages.landing.welcome.header}</H2>
		</div>
		<H4 style="font-weight: var(--font-weight-light); padding-left: var(--spacing-2); z-index: 2;">
			{siteConfig.pages.landing.welcome.description}
		</H4>
	</div>

	<div class="site-description" bind:this={particlesContainerDiv}>
		<Body1>{siteConfig.pages.landing.miniAboutMe.quickDescription}</Body1>
	</div>

	<div class="site-content">
		<div class="grid-placeholder"></div>

		<H4 style="margin-bottom: var(--spacing-24);">Recent Articles</H4>

		<Sidebar {featuredPosts} {allCategories} />

		<div>
			<PostsList posts={recentPosts} />
		</div>
	</div>
</main>

<style lang="scss">
	@use '/src/styles/mixins.scss';

	main {
		row-gap: var(--spacing-16);

		.banner {
			height: 100%;
			align-content: center;
			text-align: center;
			position: relative;
			padding: var(--spacing-64) 0;
			user-select: none;

			.title {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-wrap: wrap;
				gap: var(--spacing-8);

				@include mixins.respond(mobile) {
					gap: 0;
				}

				:global(svg) {
					height: 12rem;
					width: auto;
				}
			}
		}

		.site-description {
			padding: var(--spacing-64);
			max-width: 80ch;
			margin: 0 auto;
		}

		.site-content {
			padding: 0 var(--spacing-64) var(--spacing-64);
			@include mixins.base-layout;
		}
	}
</style>
