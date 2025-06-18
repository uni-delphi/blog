import { create } from "zustand";
import Lenis from "@studio-freight/lenis/types";

interface Store {
  scroller: Lenis | null;
  setScroller: (v: Lenis) => void;

  stage: "in" | "out" | "none";
  setStage: (v: "in" | "out" | "none") => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (v: boolean) => void;

  isLanguageDefault: "en-us" | "es-ar" | null;
  setIsLanguageDefault: (v: "en-us" | "es-ar" | null) => void;

  selectedValue: "doble" | "triple" | "matrimonial" | null;
  setSelectedValue: (v: "doble" | "triple" | "matrimonial" | null) => void;

}

export const useGlobal = create<Store>((set) => ({
  scroller: null,
  setScroller: (scroller) => set({ scroller }),

  stage: "none",
  setStage: (stage: "in" | "out" | "none") => set({ stage }),

  isMenuOpen: false,
  setIsMenuOpen: (isMenuOpen) => set({ isMenuOpen }),
  
  isLanguageDefault: 'en-us',
  setIsLanguageDefault: (isLanguageDefault) => set({ isLanguageDefault }),

  selectedValue: null,
  setSelectedValue: (selectedValue) => set({ selectedValue }),
  
}));
