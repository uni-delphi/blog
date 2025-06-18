"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import ModalCloseSurvey from "../close-survey-modal/close-survey-modal";

export default function CloseSurvey({ encuesta }: { encuesta: any}) {
  const [openModal, setOpenModal] = useState<boolean>(false);

  function handleModal(): void {
    setOpenModal(!openModal);
  }

  return (
    <>      
      <ModalCloseSurvey action={handleModal} open={openModal} encuesta={encuesta}/>
    </>
  );
}
