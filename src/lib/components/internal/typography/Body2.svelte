<script lang="ts">
	export let style = '';
</script>

<p {style}><slot /></p>

<style lang="scss">
	p {
		font-size: 1.8rem;
		font-weight: var(--font-weight-regular);
		line-height: 1.43;
		font-family: var(--font-accent);
		color: var(--clr-txt);
	}
</style>
