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
	}
</style>
