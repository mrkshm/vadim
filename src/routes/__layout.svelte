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
	@import "@fontsource/fira-mono";
	@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Nunito+Sans:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Oswald:wght@400;500;600;700&display=swap");

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
