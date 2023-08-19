<script>
	import { siteConfig } from '$lib/config';
	import { Body1, H2, H4, H5 } from '$lib/components/internal/typography';
	import PostsList from '$lib/components/internal/PostsList/PostsList.svelte';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';

	export let data;

	const { recentPosts, allCategories, popularPosts } = data;
</script>

<main>
	<div class="profile">
		<div class="avatar">
			<img
				src="/images/{siteConfig.landingPage.miniAboutMe.img}"
				alt={siteConfig.landingPage.miniAboutMe.quickDescription}
			/>
		</div>
		<H5>Welcome!</H5>
		<Body1>{siteConfig.landingPage.miniAboutMe.quickDescription}</Body1>
	</div>

	<div class="welcome">
		<H2>{siteConfig.landingPage.welcome.header}</H2>
		<H4>{siteConfig.landingPage.welcome.description}</H4>
	</div>

	<div />

	<H4>Recent Posts</H4>

	<Sidebar {popularPosts} {allCategories} />

	<div>
		<PostsList posts={recentPosts} />
	</div>
</main>

<style lang="scss">
	@import '/src/styles/mixins.scss';

	main {
		padding: var(--spacing-24);
		@include base-layout;
		grid-template-rows: 50vh;
		row-gap: var(--spacing-32);

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
