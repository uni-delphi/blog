export const asImageSrc = (
  meta_image: any
):
  | string
  | URL
  | {
      url: string | URL;
      secureUrl?: string | URL;
      alt?: string;
      type?: string;
      width?: string | number;
      height?: string | number;
    } => {
  throw new Error("Function not implemented.");
}

export const isFilled = (meta_image: any): boolean => meta_image !== undefined && meta_image !== null;

export const generateSlug = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD") // elimina acentos
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}