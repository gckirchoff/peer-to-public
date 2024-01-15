<script lang="ts">
	import Article from './Article/Article.svelte';
	import type { StoppingPoint } from '../constants';

	export let stoppingPoint: StoppingPoint;
</script>

<div class="headlines-container">
	<Article article={stoppingPoint.science} />
	<Article article={stoppingPoint.media} />
</div>

<style lang="scss">
	.headlines-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(35rem, 1fr));
		align-items: center;
		column-gap: var(--spacing-8);
		overflow: hidden;
	}
</style>
