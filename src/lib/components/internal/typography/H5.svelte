<script lang="ts">
	export let style = '';
</script>

<h5 {style}><slot /></h5>

<style lang="scss">
	h5 {
		font-size: var(--font-20);
		font-weight: var(--font-weight-regular);
		line-height: 1.334;
		font-family: var(--font-base);
		color: var(--clr-txt-500);
	}
</style>
