<script>
	import { navItems, siteConfig } from '$lib/config';
	import LightModeToggle from '../LightModeToggle/LightModeToggle.svelte';
	import H3 from '../typography/H3.svelte';
	import NavItem from './NavItem/NavItem.svelte';
</script>

<header>
	<nav>
		<ul>
			{#each navItems as { route, title } (route)}
				<NavItem href={route}>{title}</NavItem>
			{/each}
		</ul>
		<a href="/" class="site-name">
			<H3>{siteConfig.title}</H3>
		</a>
		<div class="config">
			<LightModeToggle />
		</div>
	</nav>
</header>

<style lang="scss">
	header {
		padding: var(--spacing-24);
		background-color: var(--clr-surface-400);

		nav {
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			align-items: center;

			ul {
				display: flex;
				gap: 2rem;
				list-style: none;
			}

			.site-name {
				justify-self: center;
				font-size: var(--font-32);
			}

			.config {
				justify-self: flex-end;
			}
		}
	}
</style>
