"use client";
// CldUploadButton.tsx
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "./ui/use-toast";

export default function ImageUploadButton({
  onUpload,
}: {
  onUpload: (url: string) => void;
}) {
  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-image"
      options={{
        sources: ["local", "camera", "facebook", "instagram"],
        multiple: false,
        maxFileSize: 2 * 1024 * 1024, // ✅ máximo 2MB
        clientAllowedFormats: ["jpg", "png", "jpeg", "webp"], // ✅ tipos permitidos
        cropping: false, // o true si querés permitir recorte
      }}
      onSuccess={(result: any, widget: any) => {
        const url = result?.info?.secure_url;

        if (result.event === "success") {
          const info = result.info;
          const width = info.width;
          const height = info.height;

          // ✅ Validar dimensiones (ej: entre 400x400 y 2000x2000)
          if (width < 400 || height < 400 || width > 2000 || height > 2000) {
            // Opcional: borrar imagen del widget si no cumple
            toast({
              title: "Error",
              description: "La imagen debe tener dimensiones entre 400x400 y 2000x2000 píxeles.",
              variant: "destructive",
            });
            widget.close();
            return;
          }

          if (url) {
            onUpload(url);
          }
        }
      }}
    >
      {({ open }) => (
        <button
          className="text-[var(--magenta)] bg-white my-4 py-2 px-4 rounded w-full border border-[var(--magenta)]"
          type="button"
          onClick={() => open()}
        >
          Cargar imagen
        </button>
      )}
    </CldUploadWidget>
  );
}
