<script lang="ts">
	import { browser } from '$app/environment';

	import MarkdownEditor from './MarkdownEditor.svelte';

	let loaded = false;
	let mdValue = '# Hi Everybody!';

	$: {
		if (browser) {
			if (loaded) {
				window.localStorage.setItem('create-markdown', mdValue);
			} else {
				const storedMd = window.localStorage.getItem('create-markdown');
				if (storedMd) {
					mdValue = storedMd;
				}
				loaded = true;
			}
		}
	}
</script>

<form method="POST">
	<MarkdownEditor bind:value={mdValue} />
</form>

<style lang="scss">
	div {
		margin-bottom: 2rem;
	}
</style>
