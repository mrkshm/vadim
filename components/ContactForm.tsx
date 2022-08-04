function ContactForm() {
  return (
    <div>
      <form
        className="flex flex-col gap-4 pt-4 w-full md:w-[85%] max-w-[500px]"
        name="contact"
        action="/success"
        method="POST"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="contact" />

        <label htmlFor="name" className="flex flex-col gap-2">
          Votre nom
          <input
            className="p-2 border-midnight border-solid border-[1px] rounded-sm"
            type="text"
            name="name"
            id="name"
            placeholder="nom"
          />
        </label>

        <label htmlFor="email" className="flex flex-col gap-2">
          Votre email
          <input
            className="p-2 border-midnight border-solid border-[1px] rounded-sm"
            type="email"
            id="email"
            name="email"
            placeholder="email@email.com"
          />
        </label>

        <label htmlFor="message" className="flex flex-col gap-2">
          Votre message
          <textarea
            className="p-2 border-midnight border-solid border-[1px] rounded-sm"
            rows={8}
            name="message"
            id="message"
            placeholder="Bonjour Vadim, "
          />
        </label>
        <button
          type="submit"
          className="text-offWhite max-w-[250px] inline-flex justify-center items-center px-5 py-4 shadow-sm font-medium rounded-md text-white bg-light hover:opacity-80 text-lg"
        >
          <div>Envoyer le message</div>
        </button>
      </form>
    </div>
  );
}

export default ContactForm;
