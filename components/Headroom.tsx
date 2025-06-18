"use client";

import { Slot } from "@radix-ui/react-slot";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function Headroom({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      const showNav = gsap
        .from(ref.current, {
          yPercent: -100,
          duration: 0.4,
          ease: "power2.inOut",
          paused: true,
        })
        .progress(1);

      ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          self.direction === -1 ? showNav.play() : showNav.reverse();
        },
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return <Slot ref={ref}>{children}</Slot>;
}
