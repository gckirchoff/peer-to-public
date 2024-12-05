<script lang="ts">
	export let style = '';
</script>

<h6 {style}><slot /></h6>

<style lang="scss">
	h6 {
		font-size: var(--font-16);
		line-height: 1.6;
		font-weight: var(--font-weight-regular);
		font-family: var(--font-base);
		color: var(--clr-txt);
	}
</style>
