<script lang="ts">
	export let style = '';
</script>

<h2 {style}><slot /></h2>

<style lang="scss">
	h2 {
		font-size: var(--font-60);
		font-weight: var(--font-weight-regular);
		line-height: 1.2;
		font-family: var(--font-accent);
		color: var(--clr-txt-500);
	}
</style>
