<script lang="ts">
	import { fly } from 'svelte/transition';

	import type { Article } from '../../../constants';

	export let article: Article;
	export let position: 'top' | 'bottom';
</script>

<a class="headline" href={article.href} target="_blank" style="--area: article-{position}">
	{#key article.img}
		<img src="/data/NewsLine/{article.img}" alt={article.alt} in:fly={{ y: 10, delay: 600 }} />
	{/key}
</a>

<style lang="scss">
	.headline {
		grid-area: var(--area);
		border-radius: var(--rounded-4);
		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden;

		img {
			max-width: 100%;
			max-height: 100%;
			object-fit: contain;
			width: auto;
			height: auto;
		}
	}
</style>
