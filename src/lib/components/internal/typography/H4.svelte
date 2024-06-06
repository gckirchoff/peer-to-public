<script lang="ts">
	export let style = '';
</script>

<h4 {style}><slot /></h4>

<style lang="scss">
	h4 {
		font-size: var(--font-32);
		font-weight: var(--font-weight-regular);
		line-height: 1.235;
		font-family: var(--font-base);
		color: var(--clr-txt-500);
	}
</style>
