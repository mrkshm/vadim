<div class="all">
	<img class="bgImage" src="wall.jpg" alt="wall" />

	<p>Hello</p>
	hello
</div>

<style>
	.all {
		/* background-color: green; */
		height: calc(100vh - 80px);
		width: 100%;
		padding: 0;
		justify-self: center;
	}
	.bgImage {
		position: absolute;
		top: 0px;
		left: 0;
		height: 100vh;
		width: 100vw;
		object-fit: fill;
		z-index: -10;
	}
	p {
		color: white;
	}
</style>
