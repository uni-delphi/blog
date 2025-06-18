export const SITE_NAME = `Épica Rosario`;
export const SITE_DESCRPTION = `Información y mucho más.`;
export const SITE_LANG = "es";
export const SITE_URL =
  (process.env.NEXT_PUBLIC_SITE_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_SITE_URL
    : `https://${process.env.NEXT_PUBLIC_SITE_URL}`) ?? // Set this to your site URL in production env.
  (process.env.NEXT_PUBLIC_VERCEL_URL?.startsWith("https://")
    ? process.env.NEXT_PUBLIC_VERCEL_URL
    : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`) ?? // Automatically set by Vercel.
  "http://localhost:3000";

export const IS_DEV: boolean = process.env.NODE_ENV === "development";
export const IS_PROD: boolean = process.env.NODE_ENV === "production";

export const GOOGLE_ANALYTICS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || "";