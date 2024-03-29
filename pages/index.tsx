import { motion } from "framer-motion";
import type { NextPage } from "next";
import Link from "next/link";
import Script from "next/script";
import MetaHead from "../components/MetaHead";

const Home: NextPage = () => {
  return (
    <div>
      <MetaHead title="Accueil" />
      <Script
        async
        defer
        data-website-id="fafc8256-3873-4ad6-adfa-9dc8ffc13593"
        src="https://s.abla.io/abla.js"
      ></Script>
      <div className=" hidden md:inline absolute bg-egg w-[2px] h-screen top-0 left-0 z-50"></div>
      <main className="relative h-[calc(100vh-50px)] w-screen max-w-screen-2xl m-auto overflow-hidden">
        <picture>
          <img
            className="absolute top-0 left-0 object-cover w-full h-full blur-sm hidden md:inline -z-10"
            alt="fond d'écran"
            src="/wall.jpg"
          />
          <img
            className="absolute top-8 left-0 object-fill w-full h-full md:hidden -z-10"
            alt="fond d'écran"
            src="/wall_mob.jpg"
          />
        </picture>
        <div className=" h-full grid grid-cols-1 md:grid-rows-[60%_1fr]">
          <ul className="text-offWhite pt-32 md:pt-0 px-8 self-center md:self-end w-full relative text-4xl font-titleFont tracking-widest flex flex-col gap-8">
            <motion.li
              className="self-center hover:text-egg hover:opacity-70 duration-1000"
              style={{ originX: 0, originY: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                delay: 9,
                duration: 24,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link href="/cine-concerts">Ciné-concerts</Link>
            </motion.li>
            <motion.li
              className="self-start hover:text-egg hover:opacity-70 duration-1000"
              style={{ originX: 0, originY: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                delay: 5,
                duration: 22,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link href="/concerts">Concerts</Link>
            </motion.li>
            <motion.li
              className="self-end hover:text-egg hover:opacity-70 duration-1000"
              style={{ originX: 0, originY: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                delay: 2,
                duration: 17,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link href="/theatre">Théâtre</Link>
            </motion.li>
            <motion.li
              className="self-center hover:text-egg hover:opacity-70 duration-1000"
              style={{ originX: 0, originY: 0 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{
                duration: 27,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link className="hover:transform hover:scale-150" href="/cinema">
                Cinéma
              </Link>
            </motion.li>
          </ul>

          <div className="hidden md:inline text-egg self-end px-4 pb-2 font-titleFont tracking-wider">
            <div className="text-[3.5vmin] m-0 p-0 leading-[0.5]">
              Pianiste, compositeur, musicien de scène
            </div>
            <div className="text-[16vmin] m-0 p-0 leading-none">Vadim Sher</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
