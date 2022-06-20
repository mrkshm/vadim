<script>
	import MusicNav from "$lib/musicNav.svelte";
	import Transition from "$lib/transition.svelte";
	import { page } from "$app/stores";
</script>

<div class="outgrid">
	<MusicNav />

	<main>
		<Transition url={$page.url}>
			<slot />
		</Transition>
	</main>
</div>

<style>
	.outgrid {
		display: grid;
		position: relative;
		max-width: 1400px;
		margin: auto;
	}

	@media (min-width: 768px) {
		.outgrid {
			position: relative;
			grid-template-columns: 1fr 3fr;
			grid-template-rows: 1fr;
			margin-top: 32px;
			height: calc(100vh - 154px);
			overflow-x: hidden;
			overflow-y: scroll;
		}
	}
</style>
