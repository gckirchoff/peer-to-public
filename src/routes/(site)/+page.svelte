<script>
	import Body1 from '$lib/components/internal/typography/Body1.svelte';
	import H1 from '$lib/components/internal/typography/H1.svelte';
	import H3 from '$lib/components/internal/typography/H3.svelte';
</script>

<main>
	<div class="panel">
		<div class="content">
			<section class="left">
				<H1>Welcome to your site!</H1>
				<H3>Create posts, photo galleries, and more!</H3>
				<div>
					<Body1>
						To begin, start editing the config with your info in <code>/src/lib/config.ts</code>
					</Body1>
					<Body1>
						For more information, please visit <a
							href="https://github.com/gr-eggory/site-template"
							target="_blank">here</a
						>.
					</Body1>
				</div>
			</section>
			<section class="right" />
		</div>
	</div>
</main>

<style lang="scss">
	main {
		padding: var(--spacing-24);
		width: 90%;
		margin: 0 auto;
		margin-top: 5rem;

		.content {
			padding: 10rem;
			display: grid;
			grid-template-columns: 2fr 1fr;
			height: 100%;

			.left {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				gap: var(--spacing-32);
			}
		}
	}

	.panel {
		background-color: var(--clr-surface-300);
		border-radius: var(--rounded-20);
		box-shadow: var(--shadow-md);
	}

	a {
		color: var(--clr-primary-400);
	}
</style>
