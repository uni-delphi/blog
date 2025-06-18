import AdminDropDown from "@/components/admin-dropdown/admin-dropdown";
import DashboardNavbar from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
