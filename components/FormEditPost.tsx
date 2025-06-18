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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Link from "next/link";
import { Button } from "./ui/button";
import ImageUploadButton from "./CldUploadButton";
import { CldImage } from "next-cloudinary";
import { updatePost } from "@/lib/actions";
import { toast } from "./ui/use-toast";
// import { createResponse, updateCheckboxResponse } from "@/lib/actions";

const formSchema = z.object({
  titulo: z.string().optional(),
  bajada: z.string().optional(),
  cuerpo: z.string().optional(),
  imagen: z.string().optional(),
  slug: z.string().optional(),
  categorias: z.string().optional(),
});

type PostData = {
  id?: string;
  titulo: string;
  bajada: string;
  cuerpo: string;
  imagen: string;
  slug: string;
  categorias?: string;
};

export default function FormEditPost({
  data,
  values,
  enunciadoData,
  checkboxResponse,
  user,
}: {
  data: PostData;
  values?: IQUESTION;
  enunciadoData?: IENUNCIADOPROPS;
  checkboxResponse?: any;
  user?: User;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      titulo: data?.titulo,
      bajada: data?.bajada,
      cuerpo: data?.cuerpo,
      imagen: data?.imagen,
      slug: data?.slug,
      categorias: data?.categorias,
    },
  });

  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  // const [debouncedValue, setDebouncedValue] = useState<string>(form.getValues("textField"));
  const timerRef = useRef<number | undefined>();

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // form.setValue("textField", e.target.value);
    // Se inicia el temporizador para activar el debouncer
    
  };

  const onSubmit = async (value: any) => {
    const postData: any = {
      titulo: value.titulo,
      bajada: value.bajada,
      cuerpo: value.cuerpo,
      imagen: value.imagen,
      slug: value.slug,
      categoriaId: value.categorias,
    };
    
    // Aquí puedes manejar el envío de los datos del formulario
    const response = await updatePost(data.id!, postData);
    if (response) {
      console.log("Post actualizado exitosamente:", response);
      toast({
        title: "Post actualizado",
        description: "El post se ha actualizado correctamente.",
      });
    }
  };

  const handleImageUpload = (url: string) => {    
    form.setValue("imagen", url);
    setUploadedImage(url);
  };

  return (
    <div className="flex flex-col gap-4 md:gap-10 py-8 md:flex-row">
      <div className="w-full lg:w-1/3">
        <div className="border rounded-lg aspect-square">
          <CldImage
            src={uploadedImage || data?.imagen || "https://res.cloudinary.com/dxvxzikri/image/upload/c_thumb,w_200,g_face/v1695419795/typy1gob56motmzkatzc.webp"}
            alt={data?.titulo}
            className="object-cover"
            width={500}
            height={500}
          />
        </div>
        <Button variant={"link"} asChild>
          <ImageUploadButton onUpload={handleImageUpload} />
        </Button>
      </div>
      <div className="w-full lg:w-2/3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex gap-5 py-5 flex-col">
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Slug</FormLabel>
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
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="m@example.com">
                            m@example.com
                          </SelectItem>
                          <SelectItem value="m@google.com">
                            m@google.com
                          </SelectItem>
                          <SelectItem value="m@support.com">
                            m@support.com
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        You can manage email addresses in your{" "}
                        <Link href="/examples/forms">email settings</Link>.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-auto w-full">
                <FormField
                  control={form.control}
                  name="titulo"
                  render={({ field }) => (
                    <FormItem className="mx-auto">
                      <FormLabel>Título</FormLabel>
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
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Escribe aquí el contenido del post..."
                          className="mt-2"
                          value={field.value}
                          onChange={handleTextChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-[var(--magenta)]">
                Guardar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
