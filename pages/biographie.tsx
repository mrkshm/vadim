import type { NextPage } from "next";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { getEntry } from "../lib/contentful";
import Head from "next/head";
import { DownloadSimple } from "phosphor-react";

const Biographie: NextPage = ({ bio }: any) => {
  const { citation, source, image, cv, biographie } = bio.fields;

  return (
    <div className="pt-14">
      <Head>
        <title>Vadim Sher - Biographie</title>
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
            Biographie
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
          <figure className="p-4 text-cream w-[85%] leading-snug">
            <figcaption>
              <cite>{citation}</cite>
              <div className="pt-2">{source}</div>
            </figcaption>
          </figure>
          <div className="px-4">
            <button
              type="button"
              className=" inline-flex items-center px-5 py-3 shadow-sm text-base font-medium rounded-md text-white bg-light hover:opacity-80"
            >
              <DownloadSimple
                className="-ml-1 mr-3 h-5 w-5"
                aria-hidden="true"
              />
              <Link
                href={`https:${cv.fields.file.url}`}
                className="text-lg text-offWhite"
              >
                Télécharger CV
              </Link>
            </button>
          </div>
        </div>
        <div className="bg-cream mt-8 h-[calc(100%-32px)] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor contentfulText">
          {documentToReactComponents(biographie)}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntry("4VLyf4hvoRxdB3fpwr1O5w");

  return {
    props: {
      bio: res,
    },
  };
}

export default Biographie;
