<script context="module">
	import { browser, dev } from "$app/env";
	import { onMount } from "svelte";

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
		const response = await fetch("http://musards.fr/wp/vadimsher/wp-json/wp/v2/pages/2");
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
					class={bioImageSizing}
					on:click={makeItBig}
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

<style>
	.content {
		width: 100%;
		background-color: var(--cream);
		position: relative;
	}

	.flexing {
		display: flex;
		gap: 8px;
		align-items: center;
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
		padding: 8px 4px 16px;
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
	}
	.bio-image {
		height: 200px;
		transition: all ease-in-out;
		transition-duration: 400ms;
	}
	.bio-image-big {
		position: absolute;
		object-fit: cover;
		width: 100vw;
		height: 100vh;
		top: 0px;
		right: 0px;
	}
	figure {
		margin: 0;
		width: 65%;
		flex-shrink: 0;
		padding: 0 12px;
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
	}
</style>
