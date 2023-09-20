<script lang="ts">
	import MarkdownEditor from '$lib/components/internal/MarkdownEditor/MarkdownEditor.svelte';

	export let data;
	const { postContent, meta } = data;

	let value = postContent;
</script>

<MarkdownEditor bind:value />
