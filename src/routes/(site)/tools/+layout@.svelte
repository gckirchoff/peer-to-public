<script lang="ts">
	import { onMount } from 'svelte';
	import '../../../styles/styles.scss';

	onMount(() => {
		document.body.style.visibility = 'visible';
	});
</script>

<div class="container">
	<slot />
</div>

<style lang="scss">
	.container {
		padding: var(--spacing-24);
	}
</style>
