<script>
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import Close from "../icons/close.svelte";
	import List from "phosphor-svelte/lib/List";

	let mobileMenu = false;

	let bgCol = "bgDark";

	$: switch ($page.url.pathname) {
		case "/":
			bgCol = "bgMidnight";
			break;

		default:
			bgCol = "bgDark";
			break;
	}

	function openMenu() {
		mobileMenu = true;
	}

	function closeMenu() {
		mobileMenu = false;
	}

	function bgDark() {
		bgCol = "bgDark";
		console.log("darkening");
	}

	function goHome() {
		switch ($page.url.pathname) {
			case "/":
				break;
			default:
				goto("/");
				// bgCol = "bgMidnight";
				break;
		}
	}
	onMount(() => console.log($page.url.pathname));
</script>

<header>
	<div class={`navbar ${bgCol}`}>
		<h1 on:click={goHome}>Vadim Sher</h1>
		<div class="menu-icon" on:click={openMenu}>
			<List color="var(--off-white)" size="38px" />
		</div>

		{#if mobileMenu}
			<div class="mobile-menu" transition:fly={{ x: 200, duration: 400 }}>
				<div class="close-icon" on:click={closeMenu}>
					<Close />
				</div>
				<div class="centerflex">
					<ul>
						<!-- Musique -->
						{#if $page.url.pathname.includes("q")}
							<li class="inactive">Musique</li>
							<!-- Submenu -->
							<!-- Concerts -->
							{#if $page.url.pathname == "/musique"}
								<li class="inactive first">Concerts</li>
							{:else}
								<li class="first" on:click={() => (mobileMenu = false)}>
									<a href="/musique">Concerts</a>
								</li>
							{/if}
							<!-- Theatre -->
							{#if $page.url.pathname == "/musique/theatre"}
								<li class="inactive">Théâtre</li>
							{:else}
								<li on:click={() => (mobileMenu = false)}>
									<a href="/musique/theatre">Théâtre</a>
								</li>
							{/if}
							<!-- Cine-concerts -->
							{#if $page.url.pathname == "/musique/cine-concerts"}
								<li class="inactive">Ciné-concerts</li>
							{:else}
								<li on:click={() => (mobileMenu = false)}>
									<a href="/musique/cine-concerts">Ciné-concerts</a>
								</li>
							{/if}
							<!-- Cinéma -->
							{#if $page.url.pathname == "/musique/cinema"}
								<li class="last inactive">Cinéma</li>
							{:else}
								<li class="last" on:click={() => (mobileMenu = false)}>
									<a href="/musique/cinema">Cinéma</a>
								</li>
							{/if}
						{:else}
							<li class="collapsed" on:click={() => (mobileMenu = false)}>
								<a href="/musique/">Musique</a>
							</li>
						{/if}

						<li>Agenda</li>
						{#if $page.url.pathname == "/biographie"}
							<li class="inactive">Biographie</li>
						{:else}
							<li
								on:click={() => {
									bgDark();
									mobileMenu = false;
								}}
							>
								<a href="biographie">Biographie</a>
							</li>
						{/if}
						<li>Contact</li>
					</ul>
				</div>
			</div>
		{/if}
	</div>
</header>

<style>
	header {
		position: relative;
		z-index: 20;
	}
	.bgDark {
		background-color: var(--dark);
	}
	.bgMidnight {
		background-color: var(--midnight);
	}
	.inactive {
		opacity: 50%;
	}
	.collapsed {
		padding-top: 40px;
	}
	.navbar {
		position: fixed;
		z-index: 20;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 8px;
	}

	.menu-icon {
		z-index: 0;
		padding-top: 12px;
	}

	.first {
		padding-top: 8px;
	}
	.last {
		padding-bottom: 8px;
	}

	.centerflex {
		height: 100%;
		display: flex;
		padding-top: 50px;
		justify-content: center;
	}

	.close-icon {
		position: absolute;
		right: 8px;
		top: 8px;
	}

	.mobile-menu {
		position: absolute;
		color: white;
		min-height: 100vh;
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
		font-size: 24px;
		letter-spacing: 0.1em;
		text-align: right;
	}

	h1 {
		color: var(--egg);
		font-family: var(--font-title);
		font-size: 32px;
		letter-spacing: 0.1em;
		font-weight: 400;
	}

	header :global(.icon) {
		color: var(--off-white);
		margin-top: 12px;
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
