import { db } from "../prisma";
import {
  Post as PostDbType,
} from '@prisma/client';

export async function createPost(data: PostDbType) {
  return await db.post.create({
    data: {
      titulo: data.titulo,
      bajada: data.bajada,
      cuerpo: data.cuerpo,
      imagen: data.imagen,
      slug: data.slug,
      categoriaId: data.categoriaId,
      createdById: data.createdById,
      endDate: data.endDate,
      isActive: data.isActive,
      hasEnded: data.hasEnded
    },
  });
}

export async function getPostsByUserId(userId: string) {
  return await db.post.findMany({
    // include: {
    //   tecnologias: {
    //     include: {
    //       enunciados: {
    //         include: {
    //           response: {
    //             where: {
    //               respondentId: userId,
    //             },
    //           },
    //         },
    //       },
    //     },
    //     orderBy: {
    //       id: "asc", // or 'desc' for descending order
    //     },
    //   },
    //   createdBy: {
    //     select: {
    //       id: true,
    //       name: true,
    //       lastName: true,
    //       email: true,
    //     },
    //   },
    // },
  });
}

export async function getPostBySlug(slug: string) {
  return await db.post.findFirst({
    where: {
      slug,
    },
    include: {
      categoria: {
        select: {
          title: true,
          description: true,
          slug: true,
        }
      }
    },
  });
}

export async function getPosts() {
  return await db.post.findMany({
    orderBy: {
      id: "asc",
    }
  });
}

export async function getEncuestaInfo() {
  return await db.post.findMany({
    // include: {
    //   tecnologias: {
    //     include: {
    //       enunciados: {
    //         select: {
    //           slug: true,
    //         },
    //       },
    //     },
    //     orderBy: {
    //       id: "asc", // or 'desc' for descending order
    //     },
    //   },
    //   createdBy: {
    //     select: {
    //       id: true,
    //       name: true,
    //       lastName: true,
    //       email: true,
    //     },
    //   },
    // },
  });
}
export async function updatePost(postId: string, data: any) {
  return await db.post.update({
    where: {
      id: postId,
    },
    data,
  });
}
