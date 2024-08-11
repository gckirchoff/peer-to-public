<script lang="ts">
	import { navItems, siteConfig } from '$lib/config';
	import NavItem from '../NavItem/NavItem.svelte';
	import { Body2 } from '../typography';
</script>

<footer>
	<nav>
		<ul>
			{#each navItems as { route, title } (route)}
				<NavItem href={route}>
					<div class="nav-item">{title}</div>
				</NavItem>
			{/each}
			<NavItem href="/rss.xml">RSS</NavItem>
		</ul>
	</nav>
	<Body2>©{new Date().getFullYear()} {siteConfig.author}</Body2>
</footer>

<style lang="scss">
	footer {
		padding: var(--spacing-16) var(--spacing-24);
		background-color: var(--clr-surface-100);
		display: flex;
		justify-content: space-between;
		column-gap: var(--spacing-8);

		--flex-gap: var(--spacing-24);
		--row-gap: var(--spacing-8);

		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: var(--flex-gap);
			row-gap: var(--row-gap);

			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--flex-gap);
				row-gap: var(--row-gap);
				list-style: none;
			}
		}
	}
</style>
