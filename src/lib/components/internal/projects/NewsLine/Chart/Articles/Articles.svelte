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
	@import '/src/styles/mixins.scss';
	.headlines-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		align-items: center;
		align-content: center;
		column-gap: var(--spacing-8);
		overflow: hidden;

		@include respond('tab-land') {
			grid-template-columns: 1fr;
			justify-content: center;
			justify-items: center;
		}

		@include respond('tab-port') {
			grid-template-columns: 1fr 1fr;
		}

		@include respond('mobile') {
			grid-template-columns: 1fr;
		}
	}
</style>
