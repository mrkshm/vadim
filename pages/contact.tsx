import type { NextPage } from "next";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getEntry } from "../lib/contentful";
import Head from "next/head";
import ContactForm from "../components/ContactForm";

const options = {
  renderText: (text: any) => {
    // @ts-ignore
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const Contact: NextPage = ({ bio }: any) => {
  const { text, image } = bio.fields;

  return (
    <div className="pt-14 text-textColor">
      <Head>
        <title>Vadim Sher - Contact</title>
        <meta
          name="Vadim Sher"
          content="Vadim Sher - Pianiste, compositeur, musicien de scène"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      {/* Sidebar */}
      <div className="bg-dark h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr,8fr]">
        <div className="bg-dark text-offWhite h-full overflow-x-hidden overflow-y-auto no-scrollbar">
          <div className="p-4 font-titleFont text-5xl tracking-wider">
            Contact
          </div>
          <div className="w-full px-4 pt-2">
            <picture>
              <img
                alt={image.fields.description}
                src={`https:${image.fields.file.url}`}
                className="w-[85%]"
              ></img>
            </picture>
          </div>
          <div className="p-4">
            <Link href="mentions-legales">→ Mentions légales</Link>
          </div>
        </div>
        <div className="mt-8 bg-cream h-[calc(100%-32px)] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor contentfulText">
          {documentToReactComponents(text, options)}
          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntry("2uoxZIJjBKRiBMY4dm3FFV");

  return {
    props: {
      bio: res,
    },
  };
}

export default Contact;
