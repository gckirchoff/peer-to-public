<script lang="ts">
	export let open: boolean;
</script>

<div class="modal-root" class:open>
	<div class="backdrop" />

	<div class="modal-container">
		<div class="modal">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.modal-root {
		position: fixed;
		z-index: 1300;
		inset: 0px;
		width: 100vw;
		height: 100vh;
		display: none;
		&.open {
			display: block;
		}

		.backdrop {
			background-color: rgba(0, 0, 0, 0.5);
			width: 100vw;
			height: 100vh;
			position: fixed;
		}
		.modal-container {
			display: grid;
			place-items: center;
			width: 100vw;
			height: 100vh;
			position: fixed;

			.modal {
				max-width: 600px;
				max-height: calc(100% - 64px);
				background-color: var(--clr-surface-500);
				border-radius: var(--rounded-4);
				margin: var(--spacing-32);
                padding: var(--spacing-24);
				box-shadow: var(--shadow-md);
				display: flex;
				flex-direction: column;
			}
		}
	}
</style>
