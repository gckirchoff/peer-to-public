<script lang="ts">
	export let style = '';
</script>

<h6 {style}><slot /></h6>

<style lang="scss">
	h6 {
		font-size: var(--font-14);
		font-weight: var(--font-weight-medium);
		line-height: 1.57;
		font-family: var(--font-accent);
		color: var(--clr-txt);
	}
</style>
