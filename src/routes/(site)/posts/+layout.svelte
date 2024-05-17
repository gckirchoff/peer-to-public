<script lang="ts">
	import type { LayoutData } from './$types';
	import Sidebar from '$lib/components/internal/Sidebar/Sidebar.svelte';
	import Transition from '$lib/components/internal/Transition/Transition.svelte';
	import PageWrapper from '$lib/components/internal/PageWrapper/PageWrapper.svelte';

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

<PageWrapper>
	<div class="layout">
		<Sidebar {featuredPosts} {allCategories} />
		<div>
			<Transition url={data.currentUrl}>
				<slot />
			</Transition>
		</div>
	</div>
</PageWrapper>

<style lang="scss">
	@import '/src/styles/mixins.scss';

	.layout {
		@include base-layout;
	}
</style>
