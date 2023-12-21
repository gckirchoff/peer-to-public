<script>
	import { onMount } from 'svelte';

	onMount(() => {
		setTimeout(() => {
			alert('Hello there');
		}, 3000);

		console.log('no html');
	});
</script>

<div>
	<p>Custom Component</p>
	<div style="color: red;"><slot /></div>
</div>
