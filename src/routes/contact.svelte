<script context="module">
	import { browser } from "$app/env";

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = true;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	// export const prerender = true;
</script>

<script>
	import ContactSidebar from "../lib/contactSidebar.svelte";
	let name = "";
	let email = "";
	let message = "";
	let resultMessage = "Votre message à été envoyé. Merci !";
	let resultStyle = "hiddenMessage";

	const submitForm = async () => {
		let post = new FormData();
		post.append("name", name);
		post.append("email", email);
		post.append("message", message);

		let res = await fetch("/api/contact", {
			method: "POST",
			body: post
		});
		console.log("res is", res);
		if (!res.ok) {
			resultMessage = "Il y avait un problême. Veuillez reessayer ou contactez l'administrateur.";
			resultStyle = "errorMessage";
		} else {
			name = "";
			email = "";
			message = "";
			resultMessage = "Votre message à été envoyé. Merci !";
			resultStyle = "resultMessage";
		}
		const results = await res.json();
		console.log("results are", results);

		if (results.message === "success") {
			name = "";
			email = "";
			message = "";
			resultMessage = "Votre message à été envoyé. Merci !";
			resultStyle = "resultMessage";
		} else {
			resultMessage = "Il y avait un problême. Veuillez reessayer ou contactez l'administrateur.";
			resultStyle = "errorMessage";
		}
	};
</script>

<svelte:head>
	<title>Agenda - Live</title>
	<meta name="description" content="Vadim Sher - Agenda" />
	<style>
		body {
			background: var(--dark);
		}
	</style>
</svelte:head>
<div class="content">
	<div class="innerContent">
		<div class="titles">
			<h1>Contact</h1>
			<div class="legalese"><a href="/mentionslegales">mentions<br />legales</a></div>
		</div>
		<div class="sidebar">
			<ContactSidebar />
		</div>
		<div class="contactForm">
			<div class="flexing">
				<div class="instructions">
					Pour prendre contact avec Vadim,<br />veuillez remplir ce formulaire.
				</div>
				<div class="mentions"><a href="/mentionslegales">Mentions légales</a></div>
			</div>
			<div class={resultStyle}>{resultMessage}</div>
			<form on:submit|preventDefault={submitForm} method="POST">
				<label for="name"
					>Votre nom
					<input type="text" name="name" placeholder="nom" bind:value={name} required /></label
				>
				<label for="email" required
					>Votre adresse email<input
						type="email"
						placeholder="email@email.com"
						name="email"
						bind:value={email}
						required
					/></label
				>
				<label id="message" for="message"
					>Votre message<textarea
						placeholder="Bonjour Vadim !"
						name="message"
						bind:value={message}
					/></label
				>
				<button type="submit">Envoyer</button>
			</form>
		</div>
	</div>
</div>

<style>
	.hiddenMessage {
		display: none;
	}
	.flexing {
		display: flex;
		justify-content: space-between;
	}
	.innerContent {
		max-width: 1400px;
		margin: auto;
	}
	.sidebar {
		display: none;
	}
	.mentions {
		color: var(--dark);
		font-weight: 300;
		display: none;
	}
	.resultMessage {
		font-size: 20px;
		color: var(--off-white);
		background-color: var(--light);
		padding: 12px 12px;
		border-radius: 4px;
	}
	.errorMessage {
		font-size: 20px;
		color: red;
		background-color: var(--off-white);
		padding: 12px 12px;
		border-radius: 4px;
	}
	.content {
		width: 100%;
		background-color: var(--dark);
		position: relative;
		height: 100%;
	}
	label {
		padding-top: 12px;
	}
	input {
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px var(--dark) solid;
	}
	textarea {
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px var(--dark) solid;
	}
	.titles {
		width: 100%;
		background-color: var(--dark);
		margin: 0;
		padding: 8px 8px 16px 8px;
		color: var(--off-white);
		font-family: var(--font-title);
		font-weight: 400;
		letter-spacing: 0.05em;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.legalese {
		font-family: "Nunito Sans";
		line-height: 1;
		font-size: 14px;
		opacity: 70%;
	}

	.contactForm {
		display: flex;
		flex-direction: column;
		gap: 16px;
		padding: 4px 8px;
		background-color: var(--cream);
	}

	button {
		background-color: var(--light);
		padding: 8px 16px;
		margin: 16px 0 16px 0;
		color: var(--off-white);
		font-size: 20px;
		font-weight: 600;
		border-radius: 4px;
	}

	form {
		max-width: 600px;
		background-color: var(--cream);
		border-radius: 2px;
	}

	label {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}
	@media screen and (min-width: 768px) {
		.titles {
			display: none;
		}
		.sidebar {
			display: block;
		}
		.content {
			height: calc(100vh - 130px);
		}
		.innerContent {
			display: grid;
			grid-template-columns: 35% 1fr;
			grid-template-rows: 1fr;
			/* height: calc(100vh - 130px); */
		}
		.contactForm {
			margin-top: 32px;
			padding: 32px;
			margin-right: 12px;
			height: calc(100vh - 200px);
			overflow: auto;
		}
		textarea {
			height: 12em;
		}
		.instructions {
			font-size: 18px;
			color: var(--dark);
			line-height: 1.5;
			letter-spacing: 0.02em;
		}
		::-webkit-scrollbar {
			width: 20px;
		}

		::-webkit-scrollbar-track {
			background: var(--dark);
		}

		::-webkit-scrollbar-thumb {
			border-radius: 12px;
			width: 8px;
			border: 0.25em solid var(--dark);
			background: var(--light);
		}
		::-webkit-scrollbar-thumb:hover {
			opacity: 80%;
		}
		.mentions {
			display: inline;
		}
	}
</style>
