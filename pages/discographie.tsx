import type { NextPage } from "next";
import AlbumCard from "../components/AlbumCard";
import SidebarMusique from "../components/SidebarMusique";
import { getEntries } from "../lib/contentful";
import { Concert } from "../lib/types";
import { sortDesc } from "../lib/helpers";
import Script from "next/script";
import MetaHead from "../components/MetaHead";

const Discographie: NextPage = ({ concerts }: any) => {
  return (
    <div className="pt-14 text-textColor">
      <MetaHead title="Discographie" />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
      <div className="bg-dark h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr_8fr]">
        {/* Sidebar */}
        <div>
          <SidebarMusique />
        </div>
        <main className="relative mt-8 bg-cream h-[100%-30px] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor">
          {concerts.sort(sortDesc).map((concert: Concert) => (
            <AlbumCard key={concert.sys.id} concert={concert} />
          ))}
        </main>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntries("album");

  return {
    props: {
      concerts: res.items,
    },
    revalidate: 20,
  };
}

export default Discographie;
