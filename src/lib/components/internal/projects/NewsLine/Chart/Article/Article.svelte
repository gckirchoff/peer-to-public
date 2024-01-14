<script lang="ts">
	import { fade } from 'svelte/transition';

	import type { Article } from '../constants';

	export let article: Article;
</script>

<a class="headline" href={article.href} target="_blank">
	{#if article.img}
		{#key article.img}
			<img
				src="/data/NewsLine/{article.img}"
				alt={article.alt}
				in:fade={{ delay: 1200 }}
				out:fade={{ delay: 600, duration: 200 }}
			/>
		{/key}
	{/if}
</a>

<style lang="scss">
	.headline {
		height: 100%;
		max-width: 30vw;
		border-radius: var(--rounded-4);
		display: flex;
		align-items: center;

		img {
			max-width: 100%;
			height: auto;
		}
	}
</style>
