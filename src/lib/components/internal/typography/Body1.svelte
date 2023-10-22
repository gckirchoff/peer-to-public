<script lang="ts">
	export let style = '';
</script>

<p {style}><slot /></p>

<style lang="scss">
	p {
		font-size: var(--font-20);
		font-weight: 500;
		line-height: 1.5;
		font-family: var(--font-accent);
		color: var(--clr-txt);
	}
</style>
