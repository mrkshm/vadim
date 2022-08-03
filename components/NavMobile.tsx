import { useRouter } from "next/router";
import { X, List } from "phosphor-react";
import { Menu } from "@headlessui/react";
import Link from "next/link";
import { motion } from "framer-motion";

const mobileNav = [
  { name: "Concerts", url: "/concerts" },
  { name: "Ciné-concerts", url: "/cine-concerts" },
  { name: "Théâtre", url: "/theatre" },
  { name: "Cinéma", url: "/cinema" },
  { name: "Discographie", url: "/discographie" },
  { name: "Agenda", url: "/agenda" },
  { name: "Biographie", url: "/biographie" },
  { name: "Contact", url: "/contact" },
];

interface NavMobileProps {
  currentPage: string;
}

export default function NavMobile({ currentPage }: NavMobileProps) {
  return (
    <div className="absolute w-full flex justify-between px-4 py-3">
      <div className="text-3xl text-egg font-titleFont tracking-widest">
        {currentPage === "/" ? "Vadim Sher" : <Link href="/">Vadim Sher</Link>}
      </div>
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button className="text-3xl text-pureWhite z-30">
              {open ? (
                <div onClick={() => (open = false)}>
                  <X />
                </div>
              ) : (
                <List />
              )}
            </Menu.Button>

            {/* Modal Menu */}
            {open && (
              <motion.div
                className="absolute right-0"
                animate={{ height: 0, opacity: 1 }}
                initial={{ height: "auto", opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu.Items
                  className="bg-dark z-20 absolute text-2xl w-screen h-screen right-0 pl-4 pr-12 pb-4 pt-8 flex-col gap-2  text-offWhite flex font-titleFont tracking-widest"
                  static
                >
                  {mobileNav.map((nav) => (
                    <Menu.Item key={nav.name}>
                      {({ active }) => (
                        <Link
                          href={nav.url}
                          className={`${active ? "bg-cream" : null} ${
                            nav.url === currentPage
                              ? "text-offWhite text-opacity-50"
                              : null
                          } block px-5 py-1`}
                        >
                          {nav.name}
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                </Menu.Items>
              </motion.div>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
