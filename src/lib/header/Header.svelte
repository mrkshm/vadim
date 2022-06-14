<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Close from "../icons/close.svelte";
	import Menu from "../icons/menu.svelte";

	let mobileMenu = false;
	function openMenu() {
		mobileMenu = true;
	}
	function closeMenu() {
		mobileMenu = false;
	}
	function goHome() {
		switch ($page.url.pathname) {
			case "/":
				break;
			default:
				goto("/");
				break;
		}
	}
	onMount(() => console.log($page.url.pathname));
</script>

<header>
	<div class="navbar">
		<h1 on:click={goHome}>Vadim Sher</h1>
		<div class="menu-icon" on:click={openMenu}>
			<Menu />
		</div>
	</div>
	{#if mobileMenu}
		<div class="mobile-menu" transition:fly={{ x: 200, duration: 400 }}>
			<div class="close-icon" on:click={closeMenu}>
				<Close />
			</div>
			<div class="centerflex">
				<ul>
					<li on:click={() => (mobileMenu = false)}><a href="/musique/">Musique</a></li>
					<li>Agenda</li>
					{#if $page.url.pathname == "/biographie"}
						<li class="inactive">Biographie</li>
					{:else}
						<li on:click={() => (mobileMenu = false)}><a href="biographie">Biographie</a></li>
					{/if}
					<li>Contact</li>
				</ul>
			</div>
		</div>
	{/if}
	<!-- 
	<nav>
		<ul>
			<li class:active={$page.url.pathname === "/"}><a sveltekit:prefetch href="/">Home</a></li>
			<li class:active={$page.url.pathname === "/about"}>
				<a sveltekit:prefetch href="/about">About</a>
			</li>
			<li class:active={$page.url.pathname === "/todos"}>
				<a sveltekit:prefetch href="/todos">Todos</a>
			</li>
		</ul>
	</nav> -->
</header>

<style>
	header {
		position: relative;
		padding: 0;
		margin: 0;
		height: 60px;
		/* background-color: var(--midnight); */
	}
	.bgDark {
		background-color: var(--dark);
	}
	.inactive {
		opacity: 50%;
	}
	.bgMidnight {
		background-color: var(--midnight);
	}
	.navbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 0 0 4px;
	}

	.menu-icon {
		z-index: 0;
	}

	.centerflex {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: -20px;
	}

	.close-icon {
		position: absolute;
		right: 8px;
		top: 8px;
	}

	.mobile-menu {
		position: absolute;
		color: white;
		height: 100vh;
		width: 100%;
		max-width: 500px;
		background-color: var(--dark);
		top: 0;
		right: 0px;
		z-index: 50;
	}

	ul {
		list-style: none;
		font-family: var(--font-title);
		font-size: 32px;
		letter-spacing: 0.1em;
		text-align: right;
	}

	h1 {
		color: var(--egg);
		font-family: var(--font-title);
		margin: 0;
		padding: 0;
		font-size: 32px;
		letter-spacing: 0.1em;
		font-weight: 400;
	}

	header :global(.icon) {
		color: var(--off-white);
		padding-top: 6px;
	}

	/* iPhone 8 Size */
	@media only screen and (min-width: 350px) {
		h1 {
			font-size: 32px;
		}
		header :global(.icon) {
			padding-top: 10px;
		}
	}
	/* iPhone 8 Plus Size */
	@media only screen and (min-width: 400px) {
		h1 {
			font-size: 48px;
		}
		.navbar {
			padding: 0 0 0 8px;
		}
		header :global(.icon) {
			padding-top: 16px;
		}
	}
	/* iPad Size */
	@media only screen and (min-width: 750px) {
		h1 {
			font-size: 48px;
		}
		header :global(.icon) {
			padding-top: 0;
		}
		.navbar {
			padding: 0 0 0 16px;
		}
	}
	/* iPad Pro and Desktop */
	@media only screen and (min-width: 810px) {
		.menu-icon {
			visibility: hidden;
		}
	}
</style>
