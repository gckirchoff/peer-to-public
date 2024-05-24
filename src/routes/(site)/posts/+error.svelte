<script lang="ts">
	import { page } from '$app/stores';

	import { H1, H3 } from '$lib/components/internal/typography';
</script>

<H1>{$page.status}</H1>
<H3>{$page.error?.message}</H3>
