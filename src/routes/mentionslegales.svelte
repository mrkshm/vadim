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
	export const prerender = true;
</script>

<script>
</script>

<svelte:head>
	<title>Contact</title>
	<meta name="description" content="Vadim Sher - Contact" />
	<style>
		body {
			background: var(--dark);
		}
	</style>
</svelte:head>
<div class="content">
	<div class="titles">
		<h1><a href="/contact">Contact</a></h1>
		<div class="legalese">mentions<br />legales</div>
	</div>

	<div class="mentions">
		<p>Le site vadimsher.com est publié par Vadim Sher.</p>
		<p>Il a été conçu par <a href="mrks.me">mrks.me.</a></p>
		<p class="hebergement">Hébergement : <br />mrks.me<br />59, de l'Aqueduc<br />75010 Paris</p>
	</div>
</div>

<style>
	.content {
		width: 100%;
		background-color: var(--cream);
		position: relative;
		height: 100%;
	}
	.hebergement {
		line-height: 1.5;
	}

	.titles {
		width: 100%;
		background-color: var(--dark);
		margin: 0;
		padding: 8px 8px 16px 8px;
		color: var(--off-white);
		font-family: var(--font-title);
		font-weight: 400;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.legalese {
		font-family: "Nunito Sans";
		line-height: 1;
		font-size: 14px;
		opacity: 70%;
	}

	.mentions {
		color: var(--midnight);
		padding: 24px;
	}
	p {
		padding: 12px 0;
	}
</style>
