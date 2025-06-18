"use client"
import ImageCredit from './ImageCredit'
import ArticleSocialButtons from './ArticleSocialButtons'
import ArticleDate from './ArticleDate'
import { CldImage } from 'next-cloudinary'

function PostArticle({ article }: any) {
  console.log("🚀 ~ PostArticle ~ article:", article)
  
  return (
    <section>
      <article className="md:max-w-[65rem] mx-auto flex flex-col gap-4 mt-10 font-serif">
        <div className="flex flex-col-reverse md:flex-row gap-10">
          <div className="w-full md:w-1/2 aspect-square overflow-hidden relative bg-black">
            <CldImage
              src={article?.imagen || "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"}
              alt="Imagen principal del artículo"
              className="w-full h-full object-cover object-center rounded-lg"
              width={500}
              height={500}
              loading="lazy"
            /> 
            {/* <ImageCredit credit={article.titulo || ""} /> */}
          </div>
          <div className="w-full h-auto md:w-1/2 flex flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl md:text-4xl font-bold">{article?.titulo}</h2>
              <p className="text-md md:text-xl ">{article?.bajada}</p>
            </div>
            <div className="flex justify-between items-center border-b-1 border-gray-300 pb-4">
              {/* <ArticleSocialButtons
                redes={redesSociales.data.redes_sociales}
                pageUrl={url as string}
              /> */}
              {/* <ArticleDate date={pageDate!} /> */}
            </div>
          </div>
        </div>
        <div className="max-w-[800px] mx-auto flex flex-col gap-4 my-20">
          {/* <PrismicRichText field={article.primary.cuerpo} /> */}
          <p>{article?.cuerpo}</p>
        </div>
      </article>
    </section>
  )
}

export default PostArticle