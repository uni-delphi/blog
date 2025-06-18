import { Header } from "@/components/Header";
import React from "react";

function SomosEpica() {
  return (
    <>
      <Header />
      <main>
        <section>
          <div className="container mx-auto flex flex-col gap-4 mt-10 min-h-screen px-5 md:px-10">
            <div className="max-w-[800px] mx-auto flex flex-col gap-4 my-10 md:my-20 text-balance">
              <h2 className="text-black text-4xl font-bold">Somos Épica</h2>
              <p>
                Somos una comunidad digital que propone una experiencia
                alternativa en medios de comunicación, enfocándonos en la
                generación de pensamiento crítico. Buscamos crear un espacio
                donde la gente pueda expresar sus ideas, conectar con otros y
                formar parte de un movimiento comunicacional diferente.
              </p>
              <p>
                Somos una propuesta nacida en Rosario con una mirada plural. Nos
                proponemos contar lo que pasa en la ciudad y su entorno desde
                una perspectiva distinta a la de los grandes medios
                tradicionales. Creemos que otra forma de informar es posible:
                más cercana, más humana, más abierta a todas las voces.
              </p>
              <p>
                En cada publicación buscamos generar conexión. No solo entre las
                personas y la información, sino entre quienes leen, opinan,
                participan y transforman. Porque informar también es construir
                comunidad. Por eso priorizamos historias que resuenen, debates
                que incomoden y miradas que no siempre tienen espacio en otros
                lados. En definitiva, un espacio para mirar Rosario desde
                adentro, desde abajo, desde lo que a veces no se ve.
              </p>
              <p></p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default SomosEpica;
