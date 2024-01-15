<script lang="ts">
	import { fade, fly } from 'svelte/transition';

	import type { Article } from '../../constants';

	export let article: Article;
</script>

<a class="headline" href={article.href} target="_blank">
	{#if article.img}
		{#key article.img}
			<img src="/data/NewsLine/{article.img}" alt={article.alt} in:fly={{ y: 10, delay: 1000 }} />
		{/key}
	{/if}
</a>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	.headline {
		border-radius: var(--rounded-4);
		display: flex;
		align-items: center;
		justify-content: center;

		img {
			width: auto;
			object-fit: scale-down;

			@include respond('tab-land') {
				max-height: 17rem;
			}

			@include respond('tab-port') {
				max-height: none;
				width: 45vw;
			}

			@include respond('mobile') {
				width: 100vw;
				max-height: 17rem;
			}
		}
	}
</style>
