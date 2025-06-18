import { cn } from "@/lib/utils";
//import moment from "moment";
import "moment/locale/es"; // Asegura la carga del idioma

export default function ArticleDate({
  date = "",
  style = "text-secondary",
}: {
  date: Date | string;
  style?: string;
}) {
  // Establecer el locale en español
  //moment.locale("es");

  // Crear objeto moment y formatearlo
  //const formattedDate = moment(date).format("D [de] MMMM [de] YYYY");

  //return <p className={cn(style)}>{formattedDate}</p>;
}
