<script lang="ts">
	import { Body1 } from '../typography';
	import Button from '../Button/Button.svelte';
	import Modal from '../Modal/Modal.svelte';

	export let open: boolean;
	export let handleClose: () => void;
	export let handleConfirm: () => void;

	$: handleConfirmButtonClick = () => {
		handleConfirm();
		handleClose();
	};
</script>

<Modal {open} {handleClose}>
	<Body1>Are you sure you want to discard changes</Body1>
	<div class="confirmation">
		<Button on:click={handleClose}>No</Button>
		<Button on:click={handleConfirmButtonClick}>Yes</Button>
	</div>
</Modal>
