<script context="module">
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
		const response = await fetch("http://musards.fr/wp/vadimsher/wp-json/wp/v2/posts?categories=6");
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
	console.log(result);

	function compare(a, b) {
		if (a.acf.ordre > b.acf.ordre) {
			return -1;
		}
		if (a.acf.ordre < b.acf.ordre) {
			return 1;
		}
		return 0;
	}

	const concerts = result.sort(compare);
</script>

<svelte:head>
	<title>Ciné-concerts</title>
	<meta name="description" content="Vadim Sher - Ciné-concerts" />
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
					<img class="pieceImage" src={concert.acf.imageUrl} alt="affiche du spectacle" />
				</div>
				<div class="textPart">
					<h3>{concert.title.rendered}</h3>
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
	.line {
		grid-area: line;
	}
	h3 {
		font-family: var(--font-title);
		font-size: 20px;
		line-height: 1;
		letter-spacing: 0.05em;
		font-weight: 600;
		padding-right: 15px;
	}

	.content :global(p) {
		padding: 2px 0;
	}

	.description {
		padding: 8px 0;
		font-size: 16px;
		line-height: 1.2;
		color: var(--dark);
	}

	.pieceImage {
		max-width: 150px;
		max-height: 150px;
		object-fit: contain;
	}

	@media (min-width: 768px) {
		.pieceImage {
			max-width: 200px;
			max-height: 200px;
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
