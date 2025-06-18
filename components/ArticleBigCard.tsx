"use client";
//import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import ImageCredit from "./ImageCredit";
import ArticleDate from "./ArticleDate";
import { CldImage } from "next-cloudinary";

type ArticleCardProps = {
  article: {
    slugs: string[];
    first_publication_date: string;
    id: string;
    uid: string;
    data: {
      slices?: {
        primary: {
          imagen_principal: any;
          titulo: string;
          bajada: string;
          imagen_fuente: string;
        };
        id: string;
      }[];
    };
  };
};

export default function ArticleBigCard({ article }: any) {
  console.log("🚀 ~ ArticleBigCard ~ article:", article);

  return (
    <article className="col-span-1 md:col-span-3 block">
      <Link
        href={`/${article?.slug}`}
        className="flex flex-col md:flex-row gap-2"
      >
        <div className="w-full md:w-2/5 aspect-square overflow-hidden relative font-serif bg-white">
          <CldImage
            src={
              article.imagen ||
              "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"
            }
            alt="Imagen principal del artículo"
            className="w-full h-full object-cover object-center rounded-lg"
            width={500}
            height={500}
            loading="lazy"
          />
          {/* <ImageCredit
            credit={article.data.slices?.[0].primary.imagen_fuente || ""}
          /> */}
        </div>
        <div className="w-full md:w-3/5 px-4 flex flex-col gap-4 font-serif">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 leading-tight text-pretty">
            {article.titulo}
          </h2>
          <p className="text-sm md:text-2xl text-white font-light leading-snug text-balance">
            {article.bajada}
          </p>
          {/* <ArticleDate
            style="text-sm text-white font-light text-xs text-right"
            date={article.first_publication_date}
          /> */}
        </div>
      </Link>
    </article>
  );
}
