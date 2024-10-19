<script>
	import { siteConfig } from '$lib/config';
	import { Body1, H4 } from '$lib/components/internal/typography';
</script>

<div class="about">
	<div class="description">
		<H4>About</H4>

		{#each siteConfig.pages.about.content as paragraph}
			<Body1>{paragraph}</Body1>
		{/each}
	</div>
	<div class="image-container">
		<img src="/images/config/{siteConfig.pages.about.img}" alt="me" />
	</div>
</div>

<style lang="scss">
	@use '/src/styles/mixins.scss';

	.about {
		max-width: 100rem;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap-reverse;
		gap: var(--spacing-16);

		@include mixins.respond('mobile') {
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
			img {
				border-radius: 50%;
				aspect-ratio: 1/1;
				float: right;
				object-fit: cover;
			}
		}
	}
</style>
