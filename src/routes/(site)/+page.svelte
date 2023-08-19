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

	<!-- <div class="panel">
		<div class="content">
			<section class="left">
				<H1>Welcome to your site!</H1>
				<H3>Create posts, photo galleries, and more!</H3>
				<div>
					<Body1>
						To begin, start editing the config with your info in <code>/src/lib/config.ts</code>
					</Body1>
					<Body1>
						For more information, please visit <a
							href="https://github.com/gr-eggory/site-template"
							target="_blank">here</a
						>.
					</Body1>
				</div>
			</section>
			<section class="right" />
		</div>
	</div> -->
</main>

<style lang="scss">
	main {
		padding: var(--spacing-24);
		display: grid;
		grid-template-columns: 1fr 4fr;
		grid-template-rows: 50vh;
		column-gap: 10%;
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

		.content {
			padding: 10rem;
			display: grid;
			grid-template-columns: 2fr 1fr;
			height: 100%;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				gap: var(--spacing-32);
			}
		}
	}

	.panel {
		background-color: var(--clr-surface-300);
		border-radius: var(--rounded-20);
		box-shadow: var(--shadow-md);
	}

	a {
		color: var(--clr-primary-400);
	}
</style>
