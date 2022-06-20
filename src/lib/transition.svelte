<script>
	import { fly } from "svelte/transition";
	export let url;
</script>

<div transition:fly={{ y: -150, duration: 1250, delay: 300 }}>
	<slot />
</div>
