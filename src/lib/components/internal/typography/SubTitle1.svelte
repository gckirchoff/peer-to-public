<script lang="ts">
	export let style = '';
</script>

<h6 {style}><slot /></h6>

<style lang="scss">
	h6 {
		font-size: var(--font-16);
		font-weight: var(--font-weight-regular);
		line-height: 1.75;
		font-family: var(--font-accent);
		color: var(--clr-txt-500);
	}
</style>
