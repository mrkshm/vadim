import type { NextPage } from "next";
import Script from "next/script";
import ConcertCard from "../components/ConcertCard";
import SidebarMusique from "../components/SidebarMusique";
import { getEntries } from "../lib/contentful";
import { Concert } from "../lib/types";
import { sortAsc } from "../lib/helpers";
import MetaHead from "../components/MetaHead";

const Theatre: NextPage = ({ concerts }: any) => {
  return (
    <div className="pt-14 text-textColor">
      <MetaHead title="Théâtre" />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
      <div className="bg-dark md:h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr_8fr]">
        {/* Sidebar */}
        <div>
          <SidebarMusique />
        </div>
        <main className="relative mt-8 bg-cream h-[100%-30px] overflow-x-hidden overflow-y-scroll py-6 px-2 md:px-6 text-textColor">
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
    revalidate: 20,
  };
}

export default Theatre;
