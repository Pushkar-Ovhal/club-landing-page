'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import BlurText from '../BlurText.jsx'
import ShinyText from '../ShinyText.jsx'
import SplitText from '../SplitText.jsx'

export default function HeroSection() {
  return (
    <section className="w-full">
      <div
        className="
          relative overflow-hidden rounded-4xl
          min-h-152
          grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr]
          px-4 md:px-16
        "
      >
        {/* Background Video */}
        <video
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>

        <div
          className="
            absolute inset-0 pointer-events-none
            bg-linear-to-br
            from-black/25 via-black/15 to-black/25
            backdrop-saturate-110
          "
        />

        {/* TEXT COLUMN */}
        <div className="relative z-20 flex flex-col justify-center items-start py-12">
          {/* Quiet zone behind text */}
          <div className="relative">
            <div
              className="
                absolute -inset-8
                bg-black/35
                blur-3xl
                rounded-3xl
              "
            />

            {/* Glass Card */}
            <div
              className="
                relative
                bg-white/15
                backdrop-blur-md
                border border-white/20
                rounded-2xl
                shadow-[0_20px_60px_rgba(0,0,0,0.35)]
                flex flex-col gap-y-10
                p-6 md:p-8
              "
            >
              {/* Heading */}
              <BlurText
                text="Ignite. Execute. Dominate."
                delay={150}
                animateBy="words"
                direction="top"
                onAnimationComplete={() => {}}
                className="
                  md:text-4xl text-xl font-extrabold font-merriweather
                  text-white
                  drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]
                "
              />

              <SplitText
                text="A flexible, next-gen tech community built for learning, building, and scaling. From workshops to hackathons, we help you turn skills into momentum. backed by Unstop."
                className="
                  md:text-2xl text-lg font-semibold
                  font-rajdhani
                  text-white/90
                  leading-relaxed
                  max-w-[60ch]
                "
                delay={8}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="left"
                onLetterAnimationComplete={() => {}}
              />

              <Link
                href="/join"
                className={buttonVariants({
                  variant: 'outline',
                  className: cn(
                    'group self-start',
                    'border-2 border-white/80 bg-white/90 text-black',
                    'shadow-lg shadow-black/30 backdrop-blur-sm',
                    'transition-all duration-300 ease-out',
                    'hover:scale-105 hover:bg-white hover:shadow-xl',
                    'px-5 py-2.5'
                  ),
                })}
              >
                <span className="flex items-center gap-x-3">
                  <ShinyText
                    text="Join Our Community"
                    speed={2}
                    delay={0}
                    color="#000000"
                    shineColor="#62748e"
                    spread={120}
                    direction="left"
                    yoyo={false}
                    pauseOnHover={false}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="
                      size-6
                      translate-x-1
                      transition-transform duration-300
                      group-hover:translate-x-2
                    "
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
          </div>
        </div>

        <div
          className="
            relative z-20
            flex items-center justify-center
            opacity-90
            drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]
            pb-5 md:pb-0
          "
        >
          <Image
            src="/logo/uic.webp"
            alt="UIC Logo"
            width={1000}
            height={1000}
            quality={100}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </div>
    </section>
  )
}
