// components/EditPostClient.tsx
"use client";

import { useState } from "react";
import { User } from "next-auth";
import DeletePostModal from "./DeletePostModal";
import FormEditPost from "./FormEditPost";
import { deletesPost } from "@/lib/actions";
import { toast } from "./ui/use-toast";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
  data: any;
};

export default function EditPostClient({ user, data }: Props) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const deletePost = async (id: string) => {
    try {
      const response = await deletesPost(id);
      if (response) {
        toast({
          title: "Post eliminado",
          description: `El post "${data.titulo}" ha sido eliminado correctamente.`,
          variant: "default",
        });
        router.push("/admin"); // Redirigir a la página de dashboard o donde sea necesario
      }
      // Redirigir o recargar según necesidad
    } catch (err) {
      console.error("Error al eliminar post:", err);
    }
  };

  return (
    <div>
      <section>
        <FormEditPost user={user} data={data} />
      </section>

      <section className="mt-6">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Eliminar{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-file-minus-icon lucide-file-minus"
          >
            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
            <path d="M9 15h6" />
          </svg>
        </button>

        <DeletePostModal
          postId={data.id}
          postTitle={data.titulo}
          user={user}
          onDelete={deletePost}
          onClose={() => setShowModal(false)}
          open={showModal}
        />
      </section>
    </div>
  );
}
