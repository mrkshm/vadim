<script>
	import { closeModal, closeAllModals, openModal, modals } from "svelte-modals";
	import { X } from "phosphor-svelte";

	export let isOpen;
	export let image;

	let stackIndex = modals.length;
</script>

{#if isOpen}
	<div role="dialog" class="modal">
		<div class="contents">
			<div on:click={closeModal} class="icon"><X /></div>
			<img class="image" on:click={closeModal} src={image} alt="some image" />
			<!-- <div class="actions">
				{#if stackIndex > 1}
					<button on:click={closeModal}>Close One</button>
				{:else}
					<button on:click={closeModal}>Close</button>
				{/if}
			</div> -->
		</div>
	</div>
{/if}

<style>
	.icon {
		color: var(--off-white);
		position: absolute;
		right: 8px;
		top: 8px;
		font-size: 48px;
	}
	.modal {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 30;

		/* allow click-through to backdrop */
		pointer-events: none;
	}

	.contents {
		position: relative;
		min-width: 240px;
		border-radius: 2px;
		padding: 0px;
		background: white;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		pointer-events: auto;
	}

	.image {
		max-width: 100vw;
		max-height: 100vh;
		object-fit: contain;
	}
</style>
