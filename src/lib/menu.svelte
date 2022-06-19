<script>
	import { page } from "$app/stores";
</script>

<ul>
	{#if $page.url.pathname == "/musique"}
		<li class="inactive">Musique</li>
	{:else}
		<li class="active">
			<a href="/musique">Musique</a>
		</li>
	{/if}
	{#if $page.url.pathname == "/agenda"}
		<li class="inactive">Agenda</li>
	{:else}
		<li class="active">
			<a href="/agenda">Agenda</a>
		</li>
	{/if}
	{#if $page.url.pathname == "/biographie"}
		<li class="inactive">Biographie</li>
	{:else}
		<li class="active">
			<a href="/biographie">Biographie</a>
		</li>
	{/if}
	{#if $page.url.pathname == "/contact"}
		<li class="inactive">Contact</li>
	{:else}
		<li class="active">
			<a href="/contact">Contact</a>
		</li>
	{/if}
</ul>

<style>
	ul {
		display: flex;
		font-family: var(--font-title);
		font-weight: 400;
		font-size: 24px;
		letter-spacing: 0.1em;
		list-style: none;
		gap: 58px;
		padding-right: 16px;
	}
	.active {
		color: var(--off-white);
		transition: all 400ms;
	}
	.active:hover {
		color: var(--egg);
	}

	.inactive {
		color: var(--off-white);
		opacity: 50%;
	}

	@media (max-width: 809px) {
		ul {
			display: none;
		}
	}
</style>
