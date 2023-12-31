<script>
	import { siteConfig } from '$lib/config';
	import { Body1, H2, H4, H5 } from '$lib/components/internal/typography';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';

	export let data;

	const { recentPosts, allCategories, featuredPosts } = data;
</script>

<main>
	<div class="profile">
		<div class="avatar">
			<img
				src="/images/config/{siteConfig.pages.landing.miniAboutMe.img}"
				alt={siteConfig.pages.landing.miniAboutMe.quickDescription}
			/>
		</div>
		<H5>Welcome!</H5>
		<Body1>{siteConfig.pages.landing.miniAboutMe.quickDescription}</Body1>
	</div>

	<div class="welcome">
		<H2>{siteConfig.pages.landing.welcome.header}</H2>
		<H4 style="font-weight: var(--font-weight-light); padding-left: var(--spacing-2);">
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

			.avatar {
				width: 18rem;

				img {
					max-height: 100%;
					border-radius: 50%;
				}
			}
		}

		.welcome {
			align-self: center;
		}
	}
</style>
