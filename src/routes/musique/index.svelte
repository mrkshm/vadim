<script context="module">
	import { onMount } from "svelte";
	import { browser } from "$app/env";

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
		const response = await fetch("http://musards.fr/wp/vadimsher/wp-json/wp/v2/posts?categories=4");
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
		if (a.acf.ordre < b.acf.ordre) {
			return -1;
		}
		if (a.acf.ordre > b.acf.ordre) {
			return 1;
		}
		return 0;
	}

	const concerts = result.sort(compare);
</script>

<svelte:head>
	<title>Concerts</title>
	<meta name="description" content="Vadim Sher - Concerts" />
	<style>
		body {
			background: var(--dark);
		}
	</style>
</svelte:head>

<div class="content">
	<div class="contentSection">
		{#each concerts as concert}
			<div class="gridder">
				<div class="imagePart">
					<img class="concertImage" src={concert.acf.imageUrl} alt="Affiche du concert" />
				</div>
				<div class="textPart">
					<h3>{concert.title.rendered}</h3>
					<div class="distribution">{concert.acf.distribution}</div>
					<div class="description">{@html concert.content.rendered}</div>
				</div>
				<hr class="line" />
			</div>
		{/each}
	</div>
</div>

<style>
	hr {
		background: linear-gradient(to right, #f5ef4e, #d1deff);
		height: 1px;
		border: none;
		margin: 16px;
	}
	.content {
		width: 100%;
		height: 100%;
		background-color: var(--cream);
		position: relative;
		padding: 0 8px;
	}

	.imagePart {
		padding: 8px 0;
		grid-area: imagePart;
	}
	.textPart {
		grid-area: textPart;
	}

	h3 {
		font-family: var(--font-title);
		font-size: 20px;
		line-height: 1.2;
		letter-spacing: 0.1em;
		font-weight: 600;
	}

	.content :global(p) {
		padding: 2px 0;
	}

	.line {
		grid-area: line;
	}

	.distribution {
		font-weight: 300;
		font-size: 16px;
		line-height: 1.2;
		color: var(--dark);
		padding: 8px 0;
		max-width: 450px;
	}

	.description {
		font-size: 16px;
		line-height: 1.4;
		color: var(--dark);
	}

	.concertImage {
		max-width: 150px;
		max-height: 150px;
		object-fit: contain;
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

	@media (min-width: 768px) {
		.concertImage {
			max-width: 200px;
			max-height: 200px;
			object-fit: contain;
		}
		.gridder {
			padding: 12px;
			display: grid;
			grid-template-rows: 1fr 20px;
			align-items: center;
		}
		.gridder:nth-child(odd) {
			grid-template-columns: 1fr 4fr;
			grid-template-areas:
				"imagePart textPart"
				"line line";
		}
		.gridder:nth-child(even) {
			grid-template-columns: 3fr 1fr;
			grid-template-areas:
				"textPart imagePart"
				"line line";
		}

		.gridder:nth-child(even) .imagePart {
			justify-self: end;
			padding-right: 16px;
		}

		.gridder:nth-child(odd) .imagePart {
			padding-right: 16px;
		}
		.gridder:last-child .line {
			display: none;
		}
	}
</style>
