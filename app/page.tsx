import { Metadata } from "next/types";
import { cache } from "react";


import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Session } from "next-auth";
import LogInForm from "@/components/login-form/login-form";
import { Button } from "@/components/ui/button";
import LayoutDefault from "@/components/image-layout/image-layout";

import { notFound } from "next/dist/client/components/not-found";

import {
  getResponsesForCSV,
  getAllEnunciados,
  getAllUsers,
  getEncuesta,
} from "@/lib/actions";

import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";
import { asImageSrc, isFilled } from "@/utils/metada-helper";

type PageMetaParams = {
  data?: {
    meta_title?: string;
    meta_description?: string;
    meta_image?: any; // Replace 'any' with the correct type if known
  };
  title: string;
  slug: string;
};

const getCachedEncuesta = cache(async () => {
  console.log("cache")
  return await getEncuesta();
});


export default async function Home({ searchParams }: any) {
  // const session: Session | null = await getServerSession(authOptions);
  // const redirectUrl = session?.user.role === "ADMIN" ? "/admin" : "/estado/1";

  // if (session) redirect(redirectUrl);

  const encuestas = await getCachedEncuesta();

  if (searchParams.error === "AccessDenied") {
    console.log("Access Denied");
  }

  return (
    <main>
      {encuestas?.map((items, i) => {
        return <div key={i}>{items.title}</div>
      })}
      {/* <LayoutDefault>
        <h2 className="font-bold text-2xl mt-10 pb-4 w-[80%] mx-auto">
          ¿Es tu primera vez en la plataforma? ¡Regístrate aquí!
        </h2>
        <div className="md:flex justify-center my-4 gap-4">
          <Button className="hidden bg-transparent text-black hover:bg-gray-200">
            Recuperar contraseña
          </Button>
          <Link
            href={"/registro"}
            className="bg-transparent text-blue-600 border hover:bg-gray-200 text-sm font-semibold py-2 px-4 rounded"
          >
            Registrarme
          </Link>
        </div>
        <hr className="w-full position-absolute" />
        <div className="mt-10">
          <h2 className="font-bold text-2xl my-4 pb-4">Ingresar</h2>
          <LogInForm />
        </div>
      </LayoutDefault> */}
    </main>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const encuestas: any = await getCachedEncuesta();

  return {
    title: SITE_NAME,
    description: SITE_DESCRPTION,
    openGraph: {
      title:  SITE_NAME,
      description: SITE_DESCRPTION,
      // images: isFilled(page.data?.meta_image)
      //   ? [asImageSrc(page.data?.meta_image)]
      //   : undefined,
    },
  };
}
