import React from "react";

import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/auth.config";

import { Button } from "./ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import AdminDropDown from "./admin-dropdown/admin-dropdown";

async function DashboardNavbar() {
    const session = await getServerSession(authOptions);
      if (!session || !session.user) redirect("/");
  return (
    <div className="col-span-12 relative flex justify-between items-center bg-white border-b-2 border-black">
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
            <Link href="/admin/nuevo-post" className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">Crear Post</h3>{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-plus-icon lucide-file-plus"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M9 15h6" />
                <path d="M12 18v-6" />
              </svg>
            </Link>
          </Button>
        </li>
      </ul>
      {session && <AdminDropDown session={session} title={session.user.name} />}
    </div>
  );
}

export default DashboardNavbar;
