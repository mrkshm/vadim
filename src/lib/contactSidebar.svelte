<script>
	let sidebarImage = "image";
</script>

<div class="bar">
	<div class="title">Contact</div>
	<div class="photo">
		<img class={sidebarImage} alt="Vadim Sher avec vélo" src="vadim_velo.jpg" />
	</div>
</div>

<style>
	.bar {
		position: relative;
		background-color: var(--dark);
		color: var(--off-white);
		height: calc(100vh - 200px);
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 5fr;
		gap: 16px;
		padding: 0 8px 16px 16px;
	}
	.title {
		font-family: var(--font-title);
		letter-spacing: 0.05em;
		font-size: 48px;
	}
	.image {
		width: 75%;
		object-fit: contain;
		border-radius: 2px;
	}
	.image-big {
		position: absolute;
		height: 120vmin;
		width: 100vmin;
		object-fit: contain;
		top: 0px;
		left: 250px;
	}
	.close-icon {
		position: absolute;
		top: 0;
		left: calc(100vmin + 100px);
		color: var(--cream);
	}
	.citationRow {
		color: var(--egg);
		font-size: 16px;
		line-height: 22px;
		letter-spacing: 0.05em;
		font-weight: 300;
		padding: 8px 24px 0 0;
	}
	.source {
		padding: 4px 0 8px;
	}
	.cv {
		align-self: end;
	}
</style>
