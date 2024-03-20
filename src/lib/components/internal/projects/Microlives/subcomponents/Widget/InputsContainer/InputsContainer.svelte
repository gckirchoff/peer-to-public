<div>
	<slot />
</div>

<style lang="scss">
	div {
		display: flex;
		flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-8);
        margin-bottom: var(--spacing-16);
	}
</style>
