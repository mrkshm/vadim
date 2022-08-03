import Link from "next/link";

const mainNav = [
  { name: "Musique", url: "/concerts" },
  { name: "Agenda", url: "/agenda" },
  { name: "Biographie", url: "/biographie" },
  { name: "Contact", url: "/contact" },
];

interface NavbarProps {
  currentPage: string;
}

export default function Navbar({ currentPage }: NavbarProps) {
  return (
    <div
      className={`${
        currentPage === "/" ? "bg-black" : "bg-dark"
      } absolute w-full flex justify-between items-center px-4 py-3 z-20 font-titleFont tracking-widest`}
    >
      <div className="text-egg text-3xl">
        {currentPage === "/" ? "Vadim Sher" : <Link href="/">Vadim Sher</Link>}
      </div>
      <ul className="flex gap-12 text-offWhite text-3xl">
        {mainNav.map((nav) => (
          <li key={nav.name}>
            {nav.url === currentPage ? (
              <div className="text-offWhite text-opacity-70">{nav.name}</div>
            ) : (
              <Link
                className="transition-all duration-300 hover:text-cream hover:text-opacity-80"
                href={nav.url}
              >
                {nav.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
