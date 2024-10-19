<main><slot /></main>

<style lang="scss">
	@use '/src/styles/mixins.scss';
	main {
		padding: var(--spacing-64);

		@include mixins.respond(mobile) {
			padding: var(--spacing-32) var(--spacing-4);
		}
	}
</style>
