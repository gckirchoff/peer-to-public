<script lang="ts">
	export let style = '';
</script>

<h3 {style}><slot /></h3>

<style lang="scss">
	h3 {
		font-size: var(--font-32);
		font-weight: var(--font-weight-regular);
		line-height: 1.167;
		font-family: var(--font-accent);
		color: var(--clr-txt);
	}
</style>
