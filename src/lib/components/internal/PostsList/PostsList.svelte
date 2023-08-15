<script lang="ts">
	import type Post from '$lib/types/post';
	import H3 from '../typography/H3.svelte';
	import SubTitle1 from '../typography/SubTitle1.svelte';
	import SubTitle2 from '../typography/SubTitle2.svelte';

	export let posts: Post[];
</script>

<ul>
	{#each posts as post (post.title)}
		<li>
			<article>
				<a href="/posts/{post.slug}">
					<img src="/postImages/{post.coverImage}" alt={post.title} />
					<H3>
						{post.title}
					</H3>
					<SubTitle1>{post.description}</SubTitle1>
					<SubTitle2>Created on {post.date}</SubTitle2>
				</a>
			</article>
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;
	}
</style>
