<script lang="ts">
	export let open: boolean;
</script>

<div class="modal" class:open>
	<slot />
</div>

<style lang="scss">
	.modal {
		position: fixed;
		display: none;
	}

	.open {
		display: block;
	}
</style>
