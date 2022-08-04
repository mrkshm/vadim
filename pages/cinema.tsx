import type { NextPage } from "next";
import CinemaCard from "../components/CinemaCard";
import SidebarMusique from "../components/SidebarMusique";
import { getEntries } from "../lib/contentful";
import { Film } from "../lib/types";
import { sortDesc } from "../lib/helpers";
import Script from "next/script";
import MetaHead from "../components/MetaHead";

const Cinema: NextPage = ({ concerts }: any) => {
  return (
    <div className="pt-14 text-textColor">
      <MetaHead title="Cinéma" />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
      <div className="bg-dark md:h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr_8fr]">
        {/* Sidebar */}
        <div className=" overflow-x-hidden overflow-y-auto no-scrollbar">
          <SidebarMusique />
        </div>
        <main className="relative mt-8 bg-cream h-[100%-30px] overflow-x-hidden overflow-y-scroll py-6 mx-0 px-2 md:px-6 text-textColor">
          {concerts.sort(sortDesc).map((concert: Film) => (
            <CinemaCard key={concert.sys.id} concert={concert} />
          ))}
        </main>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntries("cinema");

  return {
    props: {
      concerts: res.items,
    },
    revalidate: 20,
  };
}

export default Cinema;
