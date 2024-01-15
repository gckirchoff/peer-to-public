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
	.headline {
		height: 100%;
		border-radius: var(--rounded-4);
		display: flex;
		align-items: center;

		img {
			max-width: 100%;
			height: auto;
		}
	}
</style>
