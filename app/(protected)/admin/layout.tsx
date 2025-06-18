import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="col-span-12">
        <ul className="flex flex-col md:flex-row gap-4 p-4 md:items-end">
          <li>
            <header className="">
              <Button variant="link" asChild>
                <Link href="/admin">
                  <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                </Link>
              </Button>
            </header>
          </li>
          <li>
            <Button variant="link" asChild className="decoration-2">
              <Link href="/admin/nuevo-post">
                <h3 className="text-xl font-semibold">Crear Post</h3>
              </Link>
            </Button>
          </li>
        </ul>
      </div>
      {children}
    </>
  );
}
