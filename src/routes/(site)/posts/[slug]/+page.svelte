<script lang="ts">
	import { dev } from '$app/environment';

	import { siteConfig } from '$lib/config.js';
	import { prettyDate } from '$lib/utils/logic';
	import Button from '$lib/components/internal/Button/Button.svelte';
	import CategoryTag from '$lib/components/internal/CategoryTag/CategoryTag.svelte';
	import CategoryTagsList from '$lib/components/internal/CategoryTagsList/CategoryTagsList.svelte';
	import { Body2, H1 } from '$lib/components/internal/typography';

	export let data;

	const {
		title,
		date,
		description,
		categories,
		authors,
		slug,
		coverImage,
		coverWidth,
		coverHeight,
		subtitle,
		updated,
		published,
	} = data.meta;
	const { PostContent } = data;
</script>

<svelte:head>
	<title>{title}</title>
	<meta data-key="description" name="description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta name="twitter:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:description" content={description} />
	<!-- <meta property="og:image" content="https://yourdomain.com/image_path" /> -->
	<!-- <meta property="og:image:width" content={coverWidth} />
	<meta property="og:image:height" content={coverHeight} /> -->
	<!-- <meta name="twitter:image" content="https://yourdomain.com/image_path" /> -->
</svelte:head>

<div class="content">
	<div class="heading">
		{#if dev}
			<div class="edit-button">
				<a href="/dev/admin/post/{slug}">
					<Button>Edit</Button>
				</a>
			</div>
		{/if}
		<figure class="cover-image">
			<img src="/images/postImages/{slug}/{coverImage}" alt={title} />
		</figure>
		<CategoryTagsList>
			{#each categories as category}
				<CategoryTag {category} />
			{/each}
		</CategoryTagsList>
		<div class="dates">
			<Body2>Published: {prettyDate(new Date(date))}</Body2>
			{#if updated}
				<Body2>Updated: {prettyDate(new Date(updated))}</Body2>
			{/if}
			<Body2>By: {authors?.join(', ') ?? siteConfig.author}</Body2>
		</div>
		<H1 style="text-align: center;">{title}</H1>
	</div>
	<div class="prose">
		<PostContent />
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;

		.heading {
			--spacing: var(--spacing-32);

			display: flex;
			flex-direction: column;
			align-items: center;
			gap: var(--spacing);
			margin-bottom: var(--spacing);

			.cover-image {
				display: flex;
				justify-content: center;
				max-height: 60rem;
				max-width: 80rem;
				aspect-ratio: 16 / 9;

				img {
					object-fit: contain;
					height: auto;
					width: 100%;
				}
			}

			.dates {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
		}
	}

	.edit-button {
		position: absolute;
		right: 0px;
		top: 0px;
	}
</style>
