<script lang="ts">
	import { siteConfig } from '$lib/config';
	import { Body1, H2, H4 } from '$lib/components/internal/typography';
	import CanvasBanner from '$lib/components/internal/CanvasBanner/CanvasBanner.svelte';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';
	import Logo from '$lib/components/internal/icons/Logo/Logo.svelte';

	export let data;

	const { recentPosts, allCategories, featuredPosts } = data;

	let bannerHeight = 0;
</script>

<main>
	<div class="banner" bind:clientHeight={bannerHeight}>
		<div class="canvas-container">
			<CanvasBanner />
		</div>
		<div class="title">
			<Logo />
			<H2>{siteConfig.pages.landing.welcome.header}</H2>
		</div>
		<H4
			style="font-weight: var(--font-weight-light); padding-left: var(--spacing-2); pposition: relative; z-index: 2; pointer-events: none;"
		>
			{siteConfig.pages.landing.welcome.description}
		</H4>
	</div>

	<div class="site-description">
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
			position: relative;
			align-content: center;
			text-align: center;
			position: relative;
			padding: var(--spacing-64) 0;
			background-color: var(--clr-surface-200);
			user-select: none;

			.canvas-container {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				z-index: 1;
			}

			.title {
				position: relative;
				z-index: 2;
				pointer-events: none;
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
