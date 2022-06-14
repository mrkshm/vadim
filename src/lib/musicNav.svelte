<script>
	import { page } from "$app/stores";

	let title = "Concerts";
	let citation = "Les mots ont parfois besoin de la musique mais la musique n’a besoin de rien.";
	let citationSource = "Edward Grieg";

	$: switch ($page.url.pathname) {
		case "/musique":
			title = "Concerts";
			citation = "Les mots ont parfois besoin de la musique mais la musique n’a besoin de rien.";
			citationSource = "Edward Grieg";
			break;
		case "/musique/theatre":
			title = "Théâtre";
			citation =
				"Dans la composition musicale au théâtre, le croisement d’un texte provoque le plaisir d’un virage, l’idée d’un metteur en scène pousse vers l’inexploré, la proposition d’acteur indique un chemin jusque-là invisible. L’harmonie tant recherchée ne se crée jamais seule, elle est toujours le fruit du rapport aux autres.";
			citationSource = "Vadim Sher";
			break;
		case "/musique/cine-concerts":
			title = "Ciné-concerts";
			citation =
				"Le côté superficiel des plus éhontés s’est ancré dans l’accompagnement musical au cinéma. Le seul bon chemin à prendre serait celui de l’écriture de la musique originale. Son but principal – respecter le tempo et le rythme du film et renforcer l’impression sur le spectateur.";
			citationSource = "D. Chostakovitch";
			break;
		case "/musique/cinema":
			title = "Cinéma";
			citation =
				"Ce n’est pas d’écrire de la musique qui est difficile, c’est de barrer les notes en trop.";
			citationSource = "Johannes Brahms";
			break;
		default:
			break;
	}
</script>

<div>
	<div class="titles">
		<h1>{title}</h1>
		<figure>
			<figcaption>
				<cite>{citation}</cite>
				<div class="source">{citationSource}</div>
			</figcaption>
		</figure>
	</div>
</div>

<style>
	.titles {
		color: var(--off-white);
		padding: 0px 8px 20px;
	}
	figure {
		margin: 0px 0;
		line-height: 1.2;
	}
	h1 {
		font-family: var(--font-title);
		font-style: normal;
		font-weight: 400;
		letter-spacing: 0.05em;
		font-size: 32px;
	}
	cite {
		font-weight: 300;
	}
	.source {
		padding-top: 4px;
		opacity: 70%;
	}
</style>
