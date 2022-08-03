import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import ConcertCard from "../components/ConcertCard";
import SidebarMusique from "../components/SidebarMusique";
import { getEntries } from "../lib/contentful";
import { Concert } from "../lib/types";
import { sortAsc } from "../lib/helpers";

const Theatre: NextPage = ({ concerts }: any) => {
  return (
    <div className="pt-14 text-textColor">
      <Head>
        <title>Vadim Sher - Concerts</title>
        <meta name="description" content="Vadim Sher" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-dark h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr_8fr]">
        {/* Sidebar */}
        <div>
          <SidebarMusique />
        </div>
        <main className="relative mt-8 bg-cream h-[100%-30px] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor">
          {concerts.sort(sortAsc).map((concert: Concert) => (
            <ConcertCard key={concert.sys.id} concert={concert} />
          ))}
        </main>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntries("theatre");

  return {
    props: {
      concerts: res.items,
    },
  };
}

export default Theatre;
