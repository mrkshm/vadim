import type { NextPage } from "next";
import Link from "next/link";
import { getEntry } from "../lib/contentful";
import Script from "next/script";
import MetaHead from "../components/MetaHead";

const options = {
  renderText: (text: any) => {
    // @ts-ignore
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
};

const Success: NextPage = ({ bio }: any) => {
  const { text, image } = bio.fields;

  return (
    <div className="pt-14 text-textColor">
      <MetaHead title="Contact" />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
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
        <div className="mt-8 bg-cream text-lg h-[calc(100%-32px)] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor contentfulText">
          Votre message à été anvoyé.
          <br />
          Merci.
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
    revalidate: 20,
  };
}

export default Success;
