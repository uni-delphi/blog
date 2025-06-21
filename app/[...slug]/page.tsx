import { authOptions } from "@/auth.config";
import { Session, User, getServerSession } from "next-auth";
import { getAllPostBySlug } from "@/lib/actions";
import { redirect } from "next/navigation";
import PostArticle from "@/components/PostArticle";
import { cache } from "react";
import { Metadata } from "next/types";
import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";
import { Header } from "@/components/Header";
import { asImageSrc, isFilled } from "@/utils/metada-helper";

const getCachedEncuesta = cache(async (techSlug: string) => {
  console.log("cache");
  return await getAllPostBySlug(techSlug);
});

export default async function Post({ params }: { params: { slug: string[] } }) {
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) redirect("/");

  // const { user } = session;
  const [techSlug] = params.slug;

  const data = await getCachedEncuesta(techSlug);

  return (
    <>
      <Header />
      <main className="relative container mx-auto mt-20 md:mt-24">
        <PostArticle article={data} />
      </main>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const [techSlug] = params.slug;
  const data: any = await getCachedEncuesta(techSlug);

  return {
    title: data?.titulo || SITE_NAME,
    description: data?.bajada || SITE_DESCRPTION,
    openGraph: {
      title: SITE_NAME,
      description: SITE_DESCRPTION,
      images: data?.imagen
        ? [data?.imagen]
        : undefined,
    },
  };
}
