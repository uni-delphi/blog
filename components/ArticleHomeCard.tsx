// import { PrismicNextImage } from "@prismicio/next";
import Link from "next/link";
import ImageCredit from "./ImageCredit";
import ArticleDate from "./ArticleDate";

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

export default function ArticleHomeCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: string;
}) {
  return <div className={`${style}`}>{children}</div>;
}
