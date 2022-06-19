<script>
	import Close from "../lib/icons/close.svelte";

	export let citation;
	export let source;
	export let photo;

	let sidebarImage = "image";

	import { Modals, closeModal, openModal, modals } from "svelte-modals";
	import Modal from "$lib/Modal.svelte";
	function handleOpen(arg) {
		openModal(Modal, {
			image: `${arg}`
		});
	}
</script>

<div class="bar">
	<div class="title">Biographie</div>
	<div class="photo">
		<img on:click={() => handleOpen(photo)} class="image" alt="Vadim Sher assis" src={photo} />
	</div>
	<div class="citationRow">
		<figure>
			<figcaption>
				<cite>{citation}</cite>
				<div class="source">{source}</div>
			</figcaption>
		</figure>
	</div>
	<div class="cv"><button>Télécharger CV</button></div>
	<Modals>
		<div slot="backdrop" class="backdrop" on:click={closeModal} />
	</Modals>
</div>

<style>
	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}
	.bar {
		position: relative;
		background-color: var(--dark);
		color: var(--off-white);
		height: 100%;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 2fr 5fr 2.5fr 2fr;
		padding: 0 8px 16px 16px;
	}
	.title {
		font-family: var(--font-title);
		letter-spacing: 0.05em;
		font-size: 48px;
	}
	.image {
		width: 80%;
		transition: all ease-in-out;
		transition-duration: 400ms;
	}
	.image-big {
		position: absolute;
		height: 120vmin;
		width: 100vmin;
		object-fit: contain;
		top: 0px;
		left: 250px;
	}
	.close-icon {
		position: absolute;
		top: 0;
		left: calc(100vmin + 100px);
		color: var(--cream);
	}
	.citationRow {
		color: var(--egg);
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.05em;
		font-weight: 300;
		padding: 8px 24px 0 0;
	}
	.source {
		padding: 4px 0 8px;
	}
	.cv {
		align-self: end;
	}
	button {
		background-color: var(--light);
		color: var(--off-white);
		border: none;
		padding: 12px 12px;
		border-radius: 4px;
		font-size: 18px;
		font-weight: 400;
		letter-spacing: 0.05em;
		width: 90%;
	}
	button:hover {
		opacity: 90%;
		color: white;
	}
	@media screen and (max-height: 600px) {
		.image {
			display: none;
		}
	}
</style>
