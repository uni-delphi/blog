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

import { getAllPosts } from "@/lib/actions";

import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";
import { asImageSrc, isFilled } from "@/utils/metada-helper";
import ArticleBigCard from "@/components/ArticleBigCard";
import ArticleCard from "@/components/ArticleCard";
import ArticleHomeCard from "@/components/ArticleHomeCard";
import { Header } from "@/components/Header";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import ArticleDate from "@/components/ArticleDate";

type PageMetaParams = {
  data?: {
    meta_title?: string;
    meta_description?: string;
    meta_image?: any; // Replace 'any' with the correct type if known
  };
  title: string;
  slug: string;
};

const getCachedEncuesta = cache(async () => await getAllPosts());

export default async function Home({ searchParams }: any) {
  const data = await getCachedEncuesta();
  if (searchParams.error === "AccessDenied") {
    console.log("Access Denied");
  }

  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container mx-auto px-0 md:p-10 mt-12 md:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 bg-black pb-5 md:p-10">
              {data.slice(0, 4).map((article, index) => {
                if (index === 0)
                  return <ArticleBigCard key={article.id} article={article} />;
                return <ArticleCard key={article.id} article={article} />;
              })}
            </div>
          </div>
        </section>
        <section>
          <div className="container mx-auto px-4 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 p-0 md:p-10">
              <h2 className="col-span-1 md:col-span-3 text-3xl text-[#ec1c90] font-black font-serif uppercase">
                Ultimas Noticias
              </h2>
              {data.slice(4, 15).map((article, index) => {
                return (
                  <ArticleHomeCard key={article.id} style="h-full bg-white col-span-2 overflow-hidden text-black hover:border-[var(--magenta)] hover:text-[var(--magenta)] transition-all duration-300 ease-in-out">
                    <article className="col-span-2 block">
                      <Link
                        href={`/${article.slug}`}
                        className="flex flex-col gap-4"
                      >
                        <div className="w-5/5 font-serif w-full">
                          <div className="aspect-square overflow-hidden relative rounded-lg">
                            <Image
                              src={
                                article.imagen ||
                                "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"
                              }
                              alt="Imagen principal del artículo"
                              className="w-full h-full object-cover object-center "
                              width={500}
                              height={500}
                              loading="lazy"
                            />
                            {/* <ImageCredit
                              credit={article.data.slices?.[0].primary.imagen_fuente || ""}
                            /> */}
                          </div>
                        </div>
                        <div className="w-5/5 py-4 flex flex-col gap-4 font-serif w-full mb-4 border-b border-[#ec1c90]">
                          <h2 className="text-2xl lg:text-3xl font-semibold text-black leading-tight text-pretty">
                            {article.titulo}
                          </h2>
                          <p className="text-sm text-black font-light leading-snug text-pretty">
                            {article.bajada}
                          </p>
                          <ArticleDate
                            style="text-sm text-white font-light text-xs text-right"
                            date={article.createdAt}
                          />
                        </div>
                      </Link>
                    </article>
                  </ArticleHomeCard>
                );
              })}
              {/* {data.slice(4, 15).map((article, index) => {
              return <ArticleHomeCard key={article.id} article={article} />;
            })} */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data: any = await getCachedEncuesta();
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
