

import { Headroom } from "./Headroom";
import { Nav } from "./nav";
// import { SITE_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const pages = [
  { uid: "", data: { title: "Inicio" } },
  { uid: "nosotros", data: { title: "Nosotros" } },
];

// type HeaderProps = {
//   lang: string;
// };

export async function Header() {
  const data  = {};
  
  if (!data) return null;
  return (
    <Headroom>
      <header className={cn("fixed top-0 left-0 right-0 z-50 w-full")}>
        <Nav items={pages} data={data}/>
      </header>
    </Headroom>
  );
}
