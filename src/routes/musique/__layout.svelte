<script>
	import MusicNav from "$lib/musicNav.svelte";
</script>

<div class="outgrid">
	<MusicNav />

	<main>
		<slot />
	</main>
</div>

<style>
	.outgrid {
		display: grid;
		max-width: 1400px;
		margin: auto;
	}
	@media (min-width: 768px) {
		.outgrid {
			grid-template-columns: 1fr 3fr;
			grid-template-rows: 1fr;
			margin-top: 32px;
			height: calc(100vh - 154px);
			overflow-x: hidden;
			overflow-y: scroll;
		}
	}
</style>
