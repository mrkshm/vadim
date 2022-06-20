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
	<title>Vadim Sher - Accueil</title>
	<meta name="description" content="Vadim Sher" />
	<style>
		body {
			background: var(--midnight);
		}
	</style>
</svelte:head>

<div class="allPage">
	<!-- BG Image Section -->
	<img class="image small-screen" alt="wall" src="wall_mob2.jpg" />
	<img class="image big-screen" alt="wall" src="wall.jpg" />

	<!-- inner container -->
	<div class="container">
		<!-- Big Screen Links -->
		<div class="centerlist big">
			<ul>
				<li class="li2 breathing">
					<a sveltekit:prefetch href="/musique/cine-concerts">Ciné-concerts</a>
				</li>
				<li class="li1 breathing"><a sveltekit:prefetch href="/musique">Concerts</a></li>
				<li class="li3 breathing"><a sveltekit:prefetch href="/musique/theatre">Théâtre</a></li>
				<li class="li4 breathing"><a sveltekit:prefetch href="/musique/cinema">Cinéma</a></li>
			</ul>
		</div>
		<!-- Small Screen Links -->
		<div class="centerlist small">
			<ul>
				<li class="li1 breathing"><a sveltekit:prefetch href="/musique">Concerts</a></li>
				<li class="li2 breathing">
					<a sveltekit:prefetch href="/musique/cine-concerts">Ciné-concerts</a>
				</li>
				<li class="li3 breathing"><a sveltekit:prefetch href="/musique/theatre">Théâtre</a></li>
				<li class="li4 breathing"><a sveltekit:prefetch href="/musique/cinema">Cinéma</a></li>
			</ul>
		</div>
		<div class="bigVad">
			<div class="bigSlug">Pianiste, compositeur, musicien de scène</div>
			<div class="heroTitle">Vadim Sher</div>
		</div>
	</div>
</div>

<style>
	.allPage {
		height: calc(100vh - 80px);
		overflow: hidden;
	}
	.big {
		display: none;
		margin-bottom: 20px;
	}
	.small {
		display: inline;
		margin-bottom: 0px;
	}
	.container {
		max-width: 1400px;
		height: 82%;
		margin: auto;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		align-items: end;
	}
	.bigVad {
		display: none;
		color: var(--egg);
		font-family: var(--font-title);
		letter-spacing: 0.1em;
		margin-bottom: 8px;
	}
	.bigSlug {
		font-size: 3.5vmin;
		letter-spacing: 0.05em;
		line-height: 0.5;
		padding-left: 8px;
		margin: 0;
	}
	.heroTitle {
		font-size: 16vmin;
		padding: 0 0 12px 8px;
		margin: 0;
		line-height: 1;
	}
	.image {
		position: absolute;
		left: 0;
		top: 80px;
		width: 100vw;
		object-fit: fill;
		z-index: -10;
	}

	.small-screen {
		top: 50px;
		height: calc(100vh - 50px);
		filter: blur(3);
		display: inline;
		object-position: top left;
	}

	.big-screen {
		display: none;
		filter: blur(4);
		top: 60px;
		height: calc(100vh - 60px);
		object-fit: fill;
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
		font-family: var(--font-title);
		letter-spacing: 0.05em;
		color: var(--off-white);
		font-size: 28px;
		font-weight: 400;
		display: flex;
		flex-direction: column;
		gap: 12px;
		margin: 0;
		padding: 0;
	}

	.li1 {
		margin-left: 12px;
		animation-duration: 15s;
	}
	.li2 {
		align-self: flex-end;
		padding-right: 8px;
		animation-delay: 5s;
		animation-duration: 17s;
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

	li {
		transition: color 2s;
		color: var(--off-white);
	}
	li:hover {
		color: var(--cream);
	}

	/* iPad width */
	@media screen and (min-width: 768px) {
		.small-screen {
			display: none;
		}
		.big-screen {
			display: inline;
		}
		.big {
			display: inline;
		}
		.small {
			display: none;
		}

		ul {
			font-size: 48px;
		}
		.li1 {
			margin-left: 48px;
		}
		.li2 {
			align-self: flex-start;
			margin-left: 50%;
		}
		.li3 {
			align-self: flex-end;
			margin-right: 50px;
		}
		.li4 {
			align-self: center;
		}
		.bigVad {
			display: inline;
		}
		.container {
			height: 100%;
			grid-template-columns: 1fr;
			grid-template-rows: 70% 30%;
			align-items: end;
		}
	}
</style>
