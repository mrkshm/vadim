<script context="module">
	import { browser } from "$app/env";
	import BioSidebar from "$lib/bioSidebar.svelte";

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = true;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	// export const prerender = true;

	export async function load({ fetch }) {
		const response = await fetch("http://musards.fr/wp/vadimsher/wp-json/wp/v2/pages/2");
		const result = await response.json();
		return {
			props: { result }
		};
	}
</script>

<script>
	export let result;

	import Close from "../lib/icons/close.svelte";
	import Download from "../lib/icons/download.svelte";
	let bioImageSizing = "bio-image";

	function makeItBig() {
		if (bioImageSizing === "bio-image") {
			bioImageSizing = "bio-image bio-image-big";
		} else {
			bioImageSizing = "bio-image";
		}
	}

	import { Modals, closeModal, openModal, modals } from "svelte-modals";
	import Modal from "$lib/Modal.svelte";

	function handleOpen(arg) {
		openModal(Modal, {
			image: `${arg}`
		});
	}
</script>

<svelte:head>
	<title>Biographie</title>
	<meta name="description" content="Vadim Sher - Biographie" />
	<style>
		body {
			background: var(--dark);
		}
	</style>
</svelte:head>

<div class="content">
	<div class="innerContent">
		<div class="titles">
			<h1>Biographie</h1>
			<a
				href="https://musards.fr/wp/vadimsher/wp-content/uploads/sites/2/img/CV_Vadim_Sher.doc"
				class="flexing"
			>
				<Download />
				<div class="cv">CV</div>
			</a>
		</div>
		<div class="contentSection">
			<div class="bioSidebar">
				<BioSidebar
					citation={result.acf.citation}
					source={result.acf.source}
					photo={result.acf.imageUrl}
				/>
			</div>
			<div class="citation-row">
				<figure>
					<figcaption>
						<cite>{result.acf.citation}</cite>
						<div class="source">{result.acf.source}</div>
					</figcaption>
				</figure>
				<div class="bio-image-div">
					<img
						src={result.acf.imageUrl}
						alt="Vadim Sher, assis"
						class="bio-image"
						on:click={() => handleOpen(result.acf.imageUrl)}
					/>
					{#if bioImageSizing === "bio-image bio-image-big"}
						<div on:click={makeItBig} class="close-icon">
							<Close />
						</div>
					{/if}
				</div>
			</div>
			<div class="bio">
				{@html result.content.rendered}
			</div>
		</div>
	</div>
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
	.bioSidebar {
		display: none;
	}
	.content {
		width: 100%;
		position: relative;
	}

	.innerContent {
		max-width: 1400px;
		margin: auto;
		background-color: var(--dark);
	}

	.flexing {
		display: flex;
		gap: 8px;
		align-items: center;
		opacity: 70%;
	}

	.bio-image-div {
		color: var(--off-white);
	}
	.close-icon {
		position: absolute;
		top: 0px;
		right: 12px;
	}

	.titles {
		width: 100%;
		background-color: var(--dark);
		margin: 0;
		padding: 0px 4px 16px;
		color: var(--off-white);
		font-family: var(--font-title);
		font-weight: 400;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.cv {
		font-size: 32px;
	}
	h1 {
		font-weight: 400;
		font-size: 32px;
	}
	.citation-row {
		display: flex;
		overflow: hidden;
		align-items: flex-end;
		padding-bottom: 12px;
		background-color: var(--cream);
	}
	.bio-image {
		height: 200px;
		/* margin-left: -20px; */
		transition: all ease-in-out;
		transition-duration: 400ms;
	}

	figure {
		margin: 0;
		width: 60%;
		flex-shrink: 0;
		padding: 0 4px 0 8px;
	}
	figcaption {
		font-size: 18px;
		padding-top: 8px;
	}
	.source {
		padding: 4px 0;
	}

	.bio {
		padding: 8px 12px;
		color: var(--dark);
		background-color: var(--cream);
		margin-top: 20px;
		margin-right: 0px;
		border-radius: 2px;
	}
	.bio :global(p) {
		padding: 4px 0;
	}

	/* larger than iPad width */
	@media screen and (min-width: 768px) {
		.content {
			height: calc(100vh - 80px);
		}
		.citation-row {
			display: none;
		}
		.bioSidebar {
			display: block;
			height: calc(100% - 50px);
		}
		.titles {
			display: none;
		}
		.contentSection {
			display: grid;
			grid-template-rows: calc(100vh - 80px);
			grid-template-columns: 350px 1fr;
			overflow: hidden;
		}
		.bio {
			height: calc(100% - 80px);
			padding-left: 32px;
			padding-right: 32px;
			overflow: hidden scroll;
		}
		.bio:global(p) {
			padding-bottom: 8px;
		}

		::-webkit-scrollbar {
			width: 20px;
		}

		::-webkit-scrollbar-track {
			background: var(--dark);
		}

		::-webkit-scrollbar-thumb {
			border-radius: 12px;
			width: 8px;
			border: 0.25em solid var(--dark);
			background: var(--light);
		}
		::-webkit-scrollbar-thumb:hover {
			opacity: 80%;
		}
	}
</style>
