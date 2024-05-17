<main><slot /></main>

<style lang="scss">
	@import '/src/styles/mixins.scss';
	main {
		padding: var(--spacing-64);

		@include respond(mobile) {
			padding: var(--spacing-32) var(--spacing-4);
		}
	}
</style>
