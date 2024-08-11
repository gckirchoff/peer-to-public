<script lang="ts">
	import { Body1 } from '../typography';
	import Button from '../Button/Button.svelte';
	import Modal from '../Modal/Modal.svelte';

	export let open: boolean;
	export let handleClose: () => void;
	export let handleConfirm: () => void;
	export let message = 'Are you sure you wish to proceed?';

	$: handleConfirmButtonClick = () => {
		handleConfirm();
		handleClose();
	};
</script>

<Modal {open} {handleClose}>
	<Body1>{message}</Body1>
	<div class="buttons">
		<Button on:click={handleClose}>No</Button>
		<Button on:click={handleConfirmButtonClick} variant="warning">Yes</Button>
	</div>
</Modal>

<style lang="scss">
	.buttons {
		display: flex;
		justify-content: center;
		gap: var(--spacing-16);
	}
</style>
