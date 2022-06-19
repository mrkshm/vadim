<script context="module">
	import { browser, dev } from "$app/env";

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	// export const prerender = true;

	export async function load({ fetch }) {
		const response = await fetch("http://musards.fr/wp/vadimsher/wp-json/wp/v2/posts?categories=9");
		const result = await response.json();
		return {
			cache: {
				maxage: 3000,
				private: false
			},
			props: { result }
		};
	}
</script>

<script>
	export let result;
	function compare(a, b) {
		if (a.acf.ordre > b.acf.ordre) {
			return -1;
		}
		if (a.acf.ordre < b.acf.ordre) {
			return 1;
		}
		return 0;
	}
	const spectacles = result.sort(compare);

	import { Modals, closeModal, openModal, modals } from "svelte-modals";
	import Modal from "$lib/Modal.svelte";
	function handleOpen(arg) {
		openModal(Modal, {
			image: `${arg}`
		});
	}
</script>

<svelte:head>
	<title>Agenda - Live</title>
	<meta name="description" content="Vadim Sher - Agenda" />
	<style>
		body {
			background: var(--dark);
		}
	</style>
</svelte:head>
<div class="content">
	<div class="titles">
		<h1>Agenda</h1>
		<div class="images">
			<img
				on:click={() => handleOpen("/vadim_piano_sm.jpg")}
				class="agendapic"
				src="/vadim_piano_sm.jpg"
				alt="Vadim au piano"
			/>
			<img class="agendapic" src="/vadim_dessin.jpg" alt="dessin de Vadim" />
		</div>
	</div>
	<!-- <div class="contentSection" /> -->
	<div class="agendaItems">
		{#each spectacles as spectacle}
			<div class="agendaItem">
				<div class="info">
					{#if spectacle.acf.lien_spectacle}
						<h3><a href={spectacle.acf.lien_spectacle}>{spectacle.title.rendered}</a></h3>
					{:else}
						<h3>{spectacle.title.rendered}</h3>
					{/if}
					{#if spectacle.content.rendered}
						<div class="description">{@html spectacle.content.rendered}</div>
					{/if}
					<div class="date">
						{#if spectacle.acf.heure}
							{spectacle.acf.date}, {spectacle.acf.heure}
						{:else}
							{spectacle.acf.date}
						{/if}
					</div>
					<div class="place">
						{#if spectacle.acf.lien_theatre}
							<a href={spectacle.acf.lien_theatre}>{spectacle.acf.salle_ville}</a>
						{:else}
							{spectacle.acf.salle_ville}
						{/if}
					</div>
				</div>
				{#if spectacle.acf.imageUrl}
					<div class="image">
						<img
							on:click={() => handleOpen(spectacle.acf.imageUrl)}
							class="imageSpectacle"
							src={spectacle.acf.imageUrl}
							alt="spectacle"
						/>
					</div>
				{/if}
				{#if spectacle.acf.youtube || spectacle.acf.vimeo}
					<div class="video">
						{#if spectacle.acf.vimeo}
							<iframe
								src="https://player.vimeo.com/video/716393806?h=aca79089e0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
								frameborder="0"
								allow="autoplay; fullscreen; picture-in-picture"
								allowfullscreen
								title="L&amp;#039;installation de la peur - Teaser"
								class="player"
							/>
							<script src="https://player.vimeo.com/api/player.js"></script>
						{/if}
					</div>
				{/if}
			</div>
			<hr />
		{/each}
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
	hr {
		background: linear-gradient(to right, #f5ef4e, #d1deff);
		height: 1px;
		border: none;
		margin: 16px 8px;
	}
	.content {
		max-width: 1400px;
		margin: auto;
		background-color: var(--cream);
		position: relative;
	}
	.titles {
		width: 100%;
		background-color: var(--dark);
		margin: 0;
		padding: 8px 4px 16px 8px;
		color: var(--off-white);
		font-family: var(--font-title);
		font-weight: 400;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		justify-content: space-between;
		overflow: hidden;
	}
	.agendaItems {
		min-height: calc(100vh - 190px);
		padding: 8px 8px;
	}
	.imageSpectacle {
		width: 80%;
		padding-top: 16px;
	}
	.video {
		padding-top: 16px;
	}
	.images {
		display: none;
	}
	h1 {
		font-family: var(--font-title);
		font-weight: 400;
		font-size: 32px;
		letter-spacing: 0.05em;
	}
	h3 {
		font-family: var(--font-title);
		font-size: 20px;
		letter-spacing: 00.05em;
		padding-top: 12px;
	}
	.date {
		font-weight: 300;
		line-height: 1;
	}
	.place {
		font-size: 18px;
	}

	a {
		color: var(--light);
		font-weight: 600;
	}
	.description {
		font-size: 16px;
		padding: 8px 0;
	}

	@media (min-width: 768px) {
		.content {
			display: grid;
			grid-template-columns: 1fr 4fr;
			grid-template-rows: calc(100vh - 152px);
			align-items: start;
			margin-top: 24px;
		}
		.images {
			display: inline;
		}
		h1 {
			font-family: var(--font-title);
			letter-spacing: 0.05em;
			font-size: 48px;
		}
		.agendaItems {
			height: calc(100vh - 152px);
			padding-left: 16px;
			padding-right: 16px;
		}
		.agendaItem {
			display: grid;
			grid-template-rows: 1fr;
			grid-template-columns: 300px 1fr 1fr;
			width: 90%;
		}
		.agendapic {
			width: 85%;
			object-fit: contain;
			padding-top: 24px;
		}
		.titles {
			height: 100%;
			display: inline;
			padding-top: 0;
			padding-left: 16px;
		}
		.imageSpectacle {
			max-height: 200px;
			object-fit: cover;
			object-position: left top;
		}
	}
</style>
