<script lang="ts">
	import { onMount } from 'svelte';
	import '../../../styles/styles.scss';

	let { children } = $props();

	let inIframe = $state(false);

	onMount(() => {
		document.body.style.visibility = 'visible';

		inIframe = window.self !== window.top;
		if (inIframe) {
			document.body.style.backgroundColor = 'transparent';
		}
	});
</script>

<div class:container-in-ptp={!inIframe}>
	{@render children()}
</div>

<style lang="scss">
	.container-in-ptp {
		padding: var(--spacing-24);
	}
</style>
