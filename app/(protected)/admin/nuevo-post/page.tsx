import { authOptions } from "@/auth.config";
import { Session, User, getServerSession } from "next-auth";
import { getAllPostBySlug } from "@/lib/actions";
import { redirect } from "next/navigation";
import PostArticle from "@/components/PostArticle";
import { cache } from "react";
import { Metadata } from "next/types";
import { SITE_DESCRPTION, SITE_NAME } from "@/lib/constants";

import FormCreatePost from "@/components/FormCreatePost";


export default async function CreatePost() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) redirect("/");

  return (
    <main className="container mx-auto">
      <h2 className="text-xl md:text-2xl">Acá podés crear un nuevo post</h2>
      <section className="">
        <FormCreatePost user={session.user as User} />
      </section>
    </main>
  );
}

