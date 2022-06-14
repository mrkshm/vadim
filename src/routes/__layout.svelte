<script>
	import { onMount } from "svelte";
	import { page } from "$app/stores";
	import Header from "$lib/header/Header.svelte";
	import "../app.css";

	onMount(() => {
		let value = "100vh";
		console.log(window.innerHeight);
		if (window.innerWidth && window.innerWidth <= 1024) {
			value = `${window.innerHeight}px`;
		}
		document.documentElement.style.setProperty("--real100vh", value);
	});
</script>

<Header />

<main>
	<slot />
</main>

<style>
</style>
