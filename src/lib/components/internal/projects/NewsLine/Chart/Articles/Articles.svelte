<script lang="ts">
	import Article from './Article/Article.svelte';
	import type { StoppingPoint } from '../../constants';

	export let stoppingPoint: StoppingPoint;
</script>

<Article article={stoppingPoint.science} position="top" />
<Article article={stoppingPoint.media} position="bottom" />
