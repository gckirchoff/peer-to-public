<script lang="ts">
	import { fade } from 'svelte/transition';

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
		display: flex;
		justify-content: space-between;
		align-items: center;
		overflow: hidden;
		flex-wrap: wrap;
	}
</style>
