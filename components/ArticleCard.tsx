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

export default function ArticleCard({ article }: any) {

  return (
    <article className="col-span-1 block px-4 md:px-0">
      <Link
        href={`/${article.slug}`}
        className="flex flex-row md:flex-col gap-4"
      >
        <div className="w-1/5 md:w-full font-serif w-full">
          <div className="aspect-square overflow-hidden relative rounded-lg">
            <CldImage
              src={article.imagen || "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"}
              alt="Imagen principal del artículo"
              className="w-full h-full object-cover object-center"
              width={500}
              height={500}
              loading="lazy"
            /> 
            {/* <ImageCredit
              credit={article.data.slices?.[0].primary.imagen_fuente || ""}
            /> */}
          </div>
        </div>
        <div className="w-4/5 md:w-5/5 md:py-4 flex flex-col gap-4 font-serif w-full">
          <h2 className="text-sm md:text-lg lg:text-2xl font-semibold text-gray-200 leading-tight text-pretty">
            {article.titulo}
          </h2>
          <p className="hidden text-sm text-white font-light leading-snug text-balance">
            {article.bajada}
          </p>
          <ArticleDate
            style="text-sm text-white font-light text-xs text-right"
            date={article.createdAt}
          />
        </div>
      </Link>
    </article>
  );
}
