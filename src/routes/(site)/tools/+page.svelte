<script lang="ts">
	import { H1, H4 } from '$lib/components/internal/typography';
	import { links } from './constants';
</script>

<main>
	<H1>Tools</H1>
	<ul>
		{#each links as link}
			<li>
				<H4>
					<a href="/tools/{link.href}">{link.title}</a>
				</H4>
			</li>
		{/each}
	</ul>
</main>
