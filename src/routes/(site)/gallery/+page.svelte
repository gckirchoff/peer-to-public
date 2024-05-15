<script lang="ts">
	import PageWrapper from '$lib/components/internal/PageWrapper/PageWrapper.svelte';
	import H3 from '$lib/components/internal/typography/H3.svelte';
	import SubTitle1 from '$lib/components/internal/typography/SubTitle1.svelte';

	export let data;

	const { galleries } = data;
</script>

<PageWrapper>
	<ul>
		{#each galleries as gallery (gallery.title)}
			<li>
				<a href="/gallery/{gallery.slug}">
					<H3>{gallery.title}</H3>
				</a>
				<SubTitle1>{gallery.excerpt}</SubTitle1>
			</li>
		{/each}
	</ul>
</PageWrapper>

<style>
	ul {
		list-style: none;
	}
</style>
