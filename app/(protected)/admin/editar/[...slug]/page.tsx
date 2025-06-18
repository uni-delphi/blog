import { authOptions } from "@/auth.config";
import { Session, User, getServerSession } from "next-auth";
import { getAllPostBySlug } from "@/lib/actions";
import { redirect } from "next/navigation";
import PostArticle from "@/components/PostArticle";
import { cache } from "react";
import { Metadata } from "next/types";
import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";
import FormEditPost from "@/components/FormEditPost";
import ImageUploadButton from "@/components/CldUploadButton";
import { Button } from "@/components/ui/button";

const getCachedEncuesta = cache(async (techSlug: string) => {
  console.log("cache");
  return await getAllPostBySlug(techSlug);
});

export default async function EditPost({
  params,
}: {
  params: { slug: string[] };
}) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");

  const { user } = session;
  const [techSlug] = params.slug;
  const data: any = await getCachedEncuesta(techSlug);

  return (
    <main className="container mx-auto">
      <h2 className="text-xl md:text-2xl">Acá podés editar tu post</h2>
      <section className="">
        <FormEditPost user={user as User} data={data} />
      </section>
    </main>
  );
}
