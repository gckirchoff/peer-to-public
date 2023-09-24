<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';
	import Transition from '$lib/components/internal/Transition/Transition.svelte';

	export let data: LayoutData;
	let featuredPosts: LayoutData['featuredPosts'];
	let allCategories: LayoutData['allCategories'];
	$: ({ featuredPosts, allCategories } = data);
	// onMount(() => {
	// 	if (!prefersReducedData()) {
	// 		featuredPosts.forEach((post) => {
	// 			preloadCode(`/posts/${post.slug}`);
	// 		});
	// 	}
	// });
</script>

<div class="layout">
	<Sidebar {featuredPosts} {allCategories} />
	<main>
		<Transition url={data.currentUrl}>
			<slot />
		</Transition>
	</main>
</div>

<style lang="scss">
	@import '/src/styles//mixins.scss';

	.layout {
		@include base-layout;
	}
</style>
