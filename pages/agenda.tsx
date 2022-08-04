import type { NextPage } from "next";
import { sortAsc } from "../lib/helpers";
import Script from "next/script";
import { getEntry, getEntries } from "../lib/contentful";
import AgendaCard from "../components/AgendaCard";
import MetaHead from "../components/MetaHead";

const Agenda: NextPage = ({ sidebar, agendaItems }: any) => {
  const { image1, image2 } = sidebar.fields;

  //   filter archived shows
  const currentAgenda = agendaItems.items
    .filter(function (spectacle: any) {
      return spectacle.fields.archived === false;
    })
    .sort(sortAsc);

  return (
    <div className="pt-14 text-textColor">
      <MetaHead title={"Agenda"} />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
      {/* Sidebar */}
      <div className="bg-dark md:h-[calc(100vh-106px)] grid grid-cols-1 md:grid-cols-[3fr,8fr]">
        <div className="bg-dark text-offWhite h-full overflow-x-hidden overflow-y-auto no-scrollbar">
          <div className="p-4 font-titleFont text-5xl tracking-wider">
            Agenda
          </div>
          <div className="w-full px-4 pt-2 hidden md:block">
            <picture>
              <img
                alt={image1.fields.description}
                src={`https:${image1.fields.file.url}`}
                className="w-[85%]"
              ></img>
              <img
                alt={image2.fields.description}
                src={`https:${image2.fields.file.url}`}
                className="w-[85%] pt-4"
              ></img>
            </picture>
          </div>
        </div>
        {/* Items */}
        <div className="mt-8 bg-cream h-[100%-30px] overflow-x-hidden overflow-y-scroll py-6 px-6 text-textColor">
          {currentAgenda.map((agendaItem: any) => (
            <AgendaCard spectacle={agendaItem} key={agendaItem.sys.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await getEntry("jnNYpMRjt0F9QL5gat9FR");
  const agendaItems = await getEntries("agenda");

  return {
    props: {
      sidebar: res,
      agendaItems: agendaItems,
    },
    revalidate: 20,
  };
}

export default Agenda;
