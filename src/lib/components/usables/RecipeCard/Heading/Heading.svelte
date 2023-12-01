<script lang="ts">
	import { H5, Body1 } from '$lib/components/internal/typography';

	export let img: string;
	export let title: string;
	export let prepTime: number;
	export let cookTime: number;
	export let result: string;
	export let description = '';

	const typographyStyle = 'color: var(--clr-surface-100);';

	$: totalTime = prepTime + cookTime;
</script>

<div class="heading">
	<figure>
		<img src="/images{img}" alt={title} />
	</figure>
	<div class="recipe-info-container">
		<H5 style={typographyStyle}><strong>{title}</strong></H5>
		<div class="info-items">
			<Body1 style={typographyStyle}>
				<strong>Prep Time:</strong>
				{prepTime}
			</Body1>
			<Body1 style={typographyStyle}>
				<strong>Cook Time:</strong>
				{cookTime}
			</Body1>
			<Body1 style={typographyStyle}>
				<strong>Total Time:</strong>
				{totalTime}
			</Body1>
			<Body1 style={typographyStyle}>
				<strong>Yield:</strong>
				{result}
			</Body1>
		</div>
		{#if description}
			<div class="description-container">
				<Body1 style={typographyStyle}>{description}</Body1>
			</div>
		{/if}
	</div>
</div>

<style lang="scss">
	.heading {
		background-color: var(--clr-primary-500);
		color: var(--clr-surface-100);
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: var(--spacing-32);

		padding: calc((var(--image-dimension) * 0.5) + 1rem) var(--spacing-64) var(--spacing-16)
			var(--spacing-64);

		figure {
			position: absolute;
			top: 0;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			height: var(--image-dimension);
			width: var(--image-dimension);
			overflow: hidden;
			border-radius: 50%;
			border: 8px solid var(--clr-primary-500);

			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		.recipe-info-container {
			text-align: center;
			display: flex;
			flex-direction: column;
			gap: var(--spacing-4);

			.info-items {
				display: flex;
				flex-wrap: wrap;
				column-gap: var(--spacing-16);
				justify-content: center;
			}

			.description-container {
				padding-top: var(--spacing-32);
				border-top: 1px solid var(--clr-surface-500);
			}
		}
	}
</style>
