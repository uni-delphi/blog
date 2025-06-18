// app/editar/[...slug]/page.tsx

import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";
import { getAllPostBySlug } from "@/lib/actions";
import { redirect } from "next/navigation";
import { cache } from "react";
import EditPostClient from "@/components/EditPostClient";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const getCachedEncuesta = cache(async (techSlug: string) => {
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
  const data = await getCachedEncuesta(techSlug);

  return (
    <main className="container mb-10 mx-auto">
      <div className="flex items-center justify-between my-4">
        <h2 className="text-xl md:text-2xl">Acá podés editar tu post</h2>
        <Button variant="outline" className="" asChild>
          <Link target="_blank" href={`/${techSlug}`} className="flex items-center gap-2">
            Ver post
          </Link>
        </Button>
      </div>
      <EditPostClient user={user} data={data} />
    </main>
  );
}
