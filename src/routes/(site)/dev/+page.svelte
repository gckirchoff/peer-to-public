<script>
	import H2 from '$lib/components/internal/typography/H2.svelte';
</script>

<H2>Dev Routes</H2>
<ul>
	<li>
		<a href="/dev/admin">Admin</a>
	</li>
	<li>
		<a href="/dev/palette">Palette</a>
	</li>
	<li>
		<a href="/dev/typography">Typography</a>
	</li>
	<li>
		<a href="/dev/usables">Usables</a>
	</li>
</ul>

<style lang="scss">
	ul {
		padding: var(--spacing-32);
		list-style: inside;
	}
	a {
		font-size: var(--font-24);
	}
</style>
