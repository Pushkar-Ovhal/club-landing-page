"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { HERO_VARIANTS, HERO_IMAGES } from "@/lib/constants/banner";

function useTypewriter(text = "", speed = 30) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    if (!text) return;

    let i = 0;

    const interval = setInterval(() => {
      setDisplayed(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayed;
}
export default function HeroSection() {
  const [background, setBackground] = useState(HERO_IMAGES[0]);

  const thumbnails = HERO_IMAGES.filter((img) => img !== background);
  const { label, href, text, heading } = HERO_VARIANTS[background];
  const typedText = useTypewriter(text, 13);
  const typedHeading = useTypewriter(heading, 15);
  return (
    <section className="w-full">
      <div
        className="
          relative overflow-hidden rounded-4xl bg-black text-white
          min-h-150
          grid grid-cols-1 md:grid-cols-2
          px-3 md:px-16
        "
      >
        <Image
          src={background}
          alt=""
          fill
          className="pointer-events-none transition-all duration-500 object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/40 pointer-events-none" />

        <div className="relative z-10 md:order-1 order-2 flex flex-col justify-center gap-y-6 py-10">
          <h1 className="text-4xl md:text-5xl font-extrabold font-merriweather leading-tight">
            {typedHeading}
          </h1>

          <p className="max-w-lg text-slate-100 font-semibold">{typedText}</p>

          <Link
            href={href}
            className={buttonVariants({
              variant: "outline",
              className: cn(
                "group self-start border-2 border-black bg-white text-black",
                "transition-transform duration-300 ease-out hover:scale-105",
                "px-4 py-2"
              ),
            })}
          >
            <span className="flex items-center gap-x-3">
              <span>{label}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 translate-x-1 transition-transform duration-300 group-hover:translate-x-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>

        <div className="relative z-10 md:grid order-1 md:order-2 grid-cols-[2fr_1.5fr] gap-x-6 items-stretch py-12">
          <div className="flex items-center justify-center h-full">
            <Image
              width={1000}
              height={1000}
              quality={100}
              src="/logo/uic.webp"
              alt="UIC Logo"
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="md:flex flex-col gap-y-6 hidden justify-center">
            {thumbnails.map((img) => (
              <button
                key={img}
                onClick={() => setBackground(img)}
                className="relative rounded-xl transition-transform duration-300 hover:scale-105"
              >
                <Image
                  src={img}
                  width={240}
                  height={160}
                  quality={50}
                  alt={HERO_VARIANTS[img].alt}
                  className="w-72 object-cover rounded-xl"
                />

                <span className="absolute bottom-3 left-3 text-sm font-semibold tracking-wide text-white">
                  {HERO_VARIANTS[img].tag}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
