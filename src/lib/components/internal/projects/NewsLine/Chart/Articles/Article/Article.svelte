<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import type { Article } from '../../constants';

	export let article: Article;
</script>

<a class="headline" href={article.href} target="_blank">
	{#if article.img}
		{#key article.img}
			<img
				src="/data/NewsLine/{article.img}"
				alt={article.alt}
				in:fly={{ y: 10, delay: 1000 }}
				out:fade
			/>
		{/key}
	{/if}
</a>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	.headline {
		border-radius: var(--rounded-4);

		img {
			min-height: 17rem;
			width: auto;
			object-fit: scale-down;

			@include respond('tab-land') {
				max-height: 17rem;
			}
		}
	}
</style>
