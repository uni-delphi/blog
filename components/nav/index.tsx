"use client";

import { Menu } from "./menu";
import { useGlobal } from "@/lib/store";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";

import Image from "next/image";
import { cn } from "@/lib/utils";

export function Nav({ items = [], data = {} }: { items: any[]; data: any }) {
  const open = useGlobal((s) => s.isMenuOpen);
  const setOpen = useGlobal((s) => s.setIsMenuOpen);

  const stage = useGlobal((s) => s.stage);
  const scroller = useGlobal((s) => s.scroller);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const pathname = usePathname();

  const navContainer = useRef<HTMLDivElement>(null);
  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  // Disable scroll when menu is open
  useEffect(() => {
    if (open) {
      scroller?.stop();
    } else {
      scroller?.start();
    }
  }, [open, scroller]);

  // Close menu when stage changes (i.e. when navigating to a new page)
  useEffect(() => {
    setOpen(false);
  }, [stage, pathname, setOpen]);

  // Close menu when resizing to a larger screen
  useEffect(() => {
    if (!isSmallScreen) setOpen(false);
  }, [isSmallScreen, setOpen]);

  useEffect(() => {
    if (!navContainer.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".nav-bar-button", {
        willChange: "transform, opacity, clip-path",
        y: 100,
      });

      const tl2 = gsap.timeline({ paused: true }).to([".nav-bar-button"], {
        y: 0,
        duration: 1.2,
        ease: "power1.inOut",
        opacity: 1,
        stagger: 0.5,
      });

      tl2.play();
    });

    return () => {
      ctx.kill();
    };
  }, [pathname]);

  return (
    <>
      <nav
        ref={navContainer}
        className={cn(
          `grid grid-cols-5 gap-5 relative border-b-1 border-gray-300 px-[7vw] bg-white z-50`
        )}
      >
        <div className="col-start-1 col-span-2 flex justify-start items-center">
          <Link
            className="text-center"
            aria-label="Navigate to the home page"
            href="/"
          >
            <h1 className="text-green text-xl md:text-4xl font-serif font-light ">
              <Image
                className="h-12 md:h-16 w-auto"
                src="/logo.png"
                alt="Logo de la empresa"
                width={270}
                height={130}
              />
            </h1>
          </Link>
        </div>

        <div className="flex col-start-5 col-span-1 justify-end md:justify-end items-center gap-4 md:gap-8">
          {/* md:hidden */}
          
          <button
            onClick={toggle}
            className="cursor-pointer relative z-50 transition duration-500 ease-in-out"
          >
            {open ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-plus-icon lucide-plus rotate-45"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu-icon lucide-menu text-black rotate-180"
              >
                <path d="M4 12h12" />
                <path d="M4 18h14" />
                <path d="M4 6h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      <Menu open={open} items={items} data={data} />
    </>
  );
}
