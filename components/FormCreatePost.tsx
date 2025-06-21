"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  IANSWER,
  IDATAQUESTION,
  IENUNCIADOPROPS,
  IQUESTION,
} from "@/types/encuestas";
import { User } from "next-auth";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";

import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { Button } from "./ui/button";
import { createPost } from "@/lib/actions";

import { Post as PostDbType } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import ImageUploadButton from "./CldUploadButton";
import { redirect } from "next/navigation";
import { toast } from "./ui/use-toast";
import RichTextEditor from "./RichTextEditor";
import { generateSlug } from "@/utils/metada-helper";

const formSchema = z.object({
  titulo: z.string().min(1, { message: "El título es obligatorio" }),
  bajada: z.string().min(1, { message: "La bajada es obligatoria" }),
  cuerpo: z.string().min(1, { message: "El cuerpo es obligatorio" }),
  imagen: z.string().optional(),
  slug: z.string().optional(),
  categorias: z.string().min(1, { message: "La categoría es obligatoria" }),
});

export default function FormCreatePost({
  data,
  values,
  enunciadoData,
  categorias,
  user,
}: {
  data?: PostDbType;
  values?: IQUESTION;
  enunciadoData?: IENUNCIADOPROPS;
  categorias?: any;
  user?: User;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: "",
      bajada: "",
      cuerpo: "",
      imagen: "",
      slug: "",
      categorias: "",
    },
  });
  const router = useRouter();
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // const [debouncedValue, setDebouncedValue] = useState<string>(form.getValues("textField"));
  const timerRef = useRef<number | undefined>();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // form.setValue("textField", e.target.value);
    // Se inicia el temporizador para activar el debouncer
    if (timerRef.current !== undefined) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      // setDebouncedValue(e.target.value);
      // updateDatabase({ answer: e.target.value });
    }, 1500);
  };

  const onSubmit = async (value: any) => {
    const { titulo, bajada, slug, cuerpo, imagen } = value;

    const postData: PostDbType = {
      createdById: user?.id!,
      titulo,
      bajada,
      cuerpo,
      imagen,
      endDate: new Date("2025-12-31T00:00:00.000Z"), // formato ISO
      isActive: true,
      hasEnded: false,
      slug: slug,
      categoriaId: value.categorias,
      id: "",
      createdAt: new Date(),
      updatedAt: new Date("2025-12-31T00:00:00.000Z"),
    };

    const response = await createPost(postData);
    if (response) {
      form.reset();
      setUploadedImage(null);
      toast({
        title: "Post creado exitosamente",
        description: "El post ha sido creado correctamente.",
      });
      router.push("/admin/editar/" + response.slug);
    }
  };

  const handleImageUpload = (url: string) => {
    form.setValue("imagen", url);
    setUploadedImage(url);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 py-8 md:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="border rounded-lg aspect-square overflow-hidden">
          {uploadedImage || data?.imagen ? (
            <CldImage
              src={uploadedImage! || data?.imagen!}
              alt={"Imagen del post"}
              className="object-cover w-full h-full"
              width={500}
              height={500}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No hay imagen cargada</span>
            </div>
          )}
        </div>
        {/* <Button variant={"outline"} className="mt-4" asChild>
          <ImageUploadButton onUpload={handleImageUpload} />
        </Button> */}
      </div>
      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-5 py-5 flex-col">
              <div className="flex items-center gap-4">
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem className="mx-auto">
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} readOnly />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-auto w-full md:w-1/2">
                  <FormField
                    control={form.control}
                    name="categorias"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categorías</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccioná una categoría" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categorias &&
                              categorias.length > 0 &&
                              categorias.map((categoria: any) => (
                                <SelectItem
                                  key={categoria.id}
                                  value={categoria.id}
                                >
                                  {categoria.title}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {/* <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder=""
                          {...field}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value);
                            form.setValue("slug", generateSlug(value), {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="bajada"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Bajada</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="cuerpo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Cuerpo</FormLabel>
                      <FormControl className="w-full ">
                        {/* <Textarea
                          {...field}
                          placeholder="Escribe aquí el contenido del post..."
                          className="mt-2"
                          value={field.value}
                          // onChange={handleTextChange}
                        /> */}
                        <RichTextEditor
                          content={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full bg-[var(--magenta)]">
              Guardar
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
