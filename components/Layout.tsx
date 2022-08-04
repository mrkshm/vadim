import { Props } from "../lib/types";
import Navbar from "./Navbar";
import NavMobile from "./NavMobile";
import PlayerBar from "./PlayerBar";
import { useMemo } from "react";
import { useRouter } from "next/router";

function Layout({ children }: Props) {
  const router = useRouter();
  const currentPage = router.pathname;

  return (
    <div className={`bg-black`}>
      <div
        className={`relative h-screen w-screen max-w-screen-2xl m-auto ${
          currentPage === "/" ? "bg-black z-0" : "bg-dark"
        }`}
      >
        <div>
          <div className="md:hidden fixed w-full bg-dark z-30">
            <NavMobile currentPage={currentPage} />
          </div>
          <div className="hidden md:inline">
            <Navbar currentPage={currentPage} />
          </div>

          <div className="">
            <main>{children}</main>
          </div>
          <PlayerBar currentPage={currentPage} />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {}

export default Layout;
