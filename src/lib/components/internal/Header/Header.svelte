<script>
	import { navItems, siteConfig } from '$lib/config';
	import LightModeToggle from '../LightModeToggle/LightModeToggle.svelte';
	import { H4 } from '../typography';
	import NavItem from '../NavItem/NavItem.svelte';
	import Logo from '../icons/Logo/Logo.svelte';
</script>

<header>
	<nav>
		<a href="/" class="site-name">
			<div class="logo">
				<Logo mode="dark" />
			</div>
			<H4 style="font-family: var(--font-base); color: var(--clr-text-on-surface-500);">
				{siteConfig.title}
			</H4>
		</a>
		<ul>
			{#each navItems as { route, title } (route)}
				<NavItem href={route}>
					<span class="nav-item">{title}</span>
				</NavItem>
			{/each}
			<LightModeToggle />
		</ul>
	</nav>
</header>

<style lang="scss">
	@use '/src/styles/mixins.scss';

	header {
		--flex-gap: var(--spacing-24);
		--row-gap: var(--spacing-8);
		padding: 0 var(--spacing-16);
		background-color: var(--clr-surface-500);

		@include mixins.respond(mobile) {
			padding: 0 var(--spacing-16) var(--spacing-16);
		}

		nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex-wrap: wrap;
			gap: var(--flex-gap);
			row-gap: var(--row-gap);

			@include mixins.respond(mobile) {
				justify-content: center;
			}

			.site-name {
				display: flex;
				align-items: center;
				gap: var(--spacing-8);

				.logo {
					:global(svg) {
						height: 6rem;
						width: auto;
					}
				}
			}

			ul {
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				gap: var(--flex-gap);
				row-gap: var(--row-gap);
				list-style: none;

				.nav-item {
					font-family: var(--font-base);
				}
			}
		}
	}
</style>
