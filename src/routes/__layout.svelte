<script>
	import Header from "$lib/Header.svelte";
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
		position: relative;
		height: 100vh;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 80px 1fr;
		padding: 0;
		gap: 0;
	}
</style>
