<script>
	import { siteConfig } from '$lib/config';
	import { Body1, H4 } from '$lib/components/internal/typography';
	import PageWrapper from '$lib/components/internal/PageWrapper/PageWrapper.svelte';
	import Logo from '$lib/components/internal/icons/Logo/Logo.svelte';
</script>

<PageWrapper>
	<div class="about">
		<div class="image-container">
			<Logo />
		</div>
		<div class="description">
			<H4>About</H4>

			{#each siteConfig.pages.about.content as paragraph}
				<Body1>{paragraph}</Body1>
			{/each}
		</div>
	</div>
</PageWrapper>

<style lang="scss">
	@import '/src/styles/mixins.scss';

	.about {
		max-width: 80rem;
		margin: 0 auto;

		@include respond('mobile') {
			padding: var(--spacing-24);
		}

		.description {
			display: flex;
			flex-direction: column;
			gap: var(--spacing-16);
			flex: 1 1 50%;
		}

		.image-container {
			flex: 0 1 36rem;
			display: flex;
			justify-content: center;

			:global(svg) {
				aspect-ratio: 1/1;
				float: right;
				object-fit: cover;
			}
		}
	}
</style>
