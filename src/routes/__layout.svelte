<script>
	import Header from "$lib/header/Header.svelte";
	import "../app.css";
</script>

<div class="container">
	<Header />
	<main>
		<slot />
	</main>
</div>

<style>
	.container {
		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr;
		grid-template-columns: 1fr;
	}
</style>
