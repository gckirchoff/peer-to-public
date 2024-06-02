<script lang="ts">
	export let style = '';
</script>

<h1 {style}><slot /></h1>

<style lang="scss">
	h1 {
		font-size: var(--font-60);
		line-height: 1.167;
		font-family: var(--font-accent);
		color: var(--clr-txt-500);
	}
</style>
