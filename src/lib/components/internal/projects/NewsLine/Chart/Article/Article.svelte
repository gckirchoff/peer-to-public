<script lang="ts">
	import type { Article } from '../constants';

	export let article: Article;
</script>

<a class="headline" href={article.href} target="_blank">
	{#if article.img}
		<img src="/data/NewsLine/{article.img}" alt={article.alt} />
	{/if}
</a>

<style lang="scss">
	.headline {
		width: 45%;
		border-radius: var(--rounded-4);
		background-color: plum;
		display: flex;
		align-items: center;
		min-height: 80%;
	}
</style>
