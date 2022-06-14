<script context="module">
	export const prerender = true;
</script>

<script>
	import Close from "$lib/icons/close.svelte";
	import Biographie from "./biographie.svelte";
	let slug = "h2default";
	function rectify() {
		slug = "h2default straight";
		setTimeout(() => {
			slug = "h2default";
		}, 12000);
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
	<style>
		body {
			background: var(--midnight);
		}
	</style>
</svelte:head>
<!-- <picture class="image">
	<source media="(max-width: 799px)" srcset="wall_mob.jpg">
	<source media="(min-width: 800px)" srcset="wall.jpg">
	<img src="wall_mob.jpg" alt="wall">
  </picture> -->
<img class="image" alt="wall" src="wall_mob.jpg" />

<section class="slugsection">
	<h2 on:click={rectify} class={slug}>Pianiste, compositeur,<br />musicien sur scène</h2>
	<div class="centerlist">
		<ul>
			<li class="li1 breathing">Concerts</li>
			<li class="li2 breathing">Ciné-concerts</li>
			<li class="li3 breathing">Théâtre</li>
			<li class="li4 breathing">Cinéma</li>
		</ul>
	</div>
</section>

<style>
	.centerlist {
		display: flex;
		align-items: center;
		width: 100vw;
		margin: 0;
		padding: 0;
	}

	section {
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.image {
		position: absolute;
		top: 60px;
		left: 0;
		height: calc(100% - 50px);
		width: 100%;
		object-fit: cover;
		object-position: top left;
		z-index: -10;
		filter: blur(3);
		padding: 0;
		margin: 0;
	}
	.h2default {
		color: var(--egg);
		font-family: var(--font-title);
		font-size: 24px;
		font-weight: 400;
		transform: rotate(-24deg);
		transform-origin: 80% 80%;
		line-height: 0.9;
		margin-top: -8px;
		letter-spacing: 0.07em;
		padding-left: 4px;
		padding-top: 20px;
	}

	:global(.straight) {
		animation-name: straighten;
		animation-duration: 12s;
	}

	.breathing {
		animation: breathe1 infinite ease-in-out;
		animation-delay: 0;
	}

	@keyframes breathe1 {
		0% {
			scale: 1;
		}
		50% {
			scale: 1.15;
		}
		100% {
			scale: 1;
		}
	}

	@keyframes straighten {
		0% {
			transform: rotate(-24deg);
		}
		10% {
			transform: rotate(0deg);
		}
		60% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-24deg);
		}
	}

	ul {
		list-style: none;
		width: 100%;
		color: var(--off-white);
		font-size: 24px;
		font-weight: 600;
		padding: 0;
		margin: 0;
		padding-top: 80px;
		display: flex;
		flex-direction: column;
		gap: 12px;
	}

	li {
		margin: 0;
		padding: 0;
	}

	.li1 {
		margin-left: 12px;
		animation-duration: 12s;
	}
	.li2 {
		align-self: flex-end;
		padding-right: 8px;
		animation-delay: 5s;
		animation-duration: 15s;
	}
	.li3 {
		margin-left: 48px;
		animation-delay: 8s;
		animation-duration: 10s;
	}
	.li4 {
		margin-right: 8px;
		align-self: flex-end;
		animation-delay: 2s;
		animation-duration: 12s;
	}
</style>
