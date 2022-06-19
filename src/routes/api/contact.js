import mail from "@sendgrid/mail";
mail.setApiKey(import.meta.env.VITE_MAILAPI);
export async function post(event) {
	console.log(event);
	const body = await event.request.formData();
	const data = [...body];
	console.log(body);
	const name = data[0][1];
	const email = data[1][1];
	const message = data[2][1];

	const formulaire = `Vous avez reçu un message de nom : ${name}, email : ${email}. Voici le message : ${message}`;
	const formulaireHtml = `<p>Vous avez reçu un message de nom : ${name}, email : ${email}.</p><p>Voici le mesage :</p><p>${message}</p>`;

	mail
		.send({
			to: "hey@mrks.me",
			from: "mrks.heumann@gmail.com",
			subject: "New Message!",
			text: formulaire,
			html: formulaireHtml.replace(/\r\n/g, "<br>")
		})
		.then(() => {
			return {
				status: 200,
				headers: {
					"content-type": "application/json"
				},
				body: {
					message: "success"
				}
			};
		});

	return {
		status: 200,
		headers: {
			"content-type": "application/json"
		},
		body: {
			message: "success"
		}
	};
}
