"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Shuffle from "../reusables/Shuffle";

export default function UnstopJourneyWithSwap() {
  useEffect(() => {
    const cards = document.querySelectorAll("#card-swap-container .card");
    const total = cards.length;

    const cardDistance = 60;
    const verticalDistance = 70;
    const skewAmount = 6;
    const delay = 5000;

    let order = Array.from({ length: total }, (_, i) => i);
    let interval;

    const makeSlot = (i) => ({
      x: i * cardDistance,
      y: -i * verticalDistance,
      z: -i * cardDistance * 1.5,
      zIndex: total - i,
    });

    const placeNow = (el, slot) => {
      gsap.set(el, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        xPercent: -50,
        yPercent: -50,
        skewY: skewAmount,
        transformOrigin: "center center",
        zIndex: slot.zIndex,
        force3D: true,
      });
    };

    cards.forEach((el, i) => placeNow(el, makeSlot(i)));

    const swap = () => {
      if (order.length < 2) return;

      const [front, ...rest] = order;
      const elFront = cards[front];

      const tl = gsap.timeline();

      tl.to(elFront, {
        y: "+=500",
        duration: 2,
        ease: "elastic.out(0.6,0.9)",
      });

      tl.addLabel("promote", "-=1.8");

      rest.forEach((idx, i) => {
        const el = cards[idx];
        const slot = makeSlot(i);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: 2,
            ease: "elastic.out(0.6,0.9)",
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(total - 1);

      tl.addLabel("return", "promote+=0.1");
      tl.set(elFront, { zIndex: backSlot.zIndex }, "return");
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: 2,
          ease: "elastic.out(0.6,0.9)",
        },
        "return"
      );

      order = [...rest, front];
    };

    swap();
    interval = setInterval(swap, delay);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[520px] md:h-[520px] py-12 md:py-20 overflow-hidden rounded-3xl">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/videos/bgvideo.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-yellow-400/20" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-24 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
        {/* LEFT TEXT */}
        <div className="max-w-xl text-center md:text-left">
          <div className="font-bold mb-4 text-3xl md:text-5xl">
            <Shuffle
              text="Your Journey With Unstop"
              shuffleDirection="right"
              duration={0.35}
              animationMode="evenodd"
              shuffleTimes={1}
              ease="power3.out"
              stagger={0.03}
              threshold={0.1}
              triggerOnce={true}
              triggerOnHover={true}
              respectReducedMotion={true}
            />
          </div>
          <p className="text-gray-800 text-base md:text-2xl font-bold leading-relaxed">
            A pathway designed to take you from campus to corporate with
            leadership, impact and personal branding.
          </p>
        </div>

        {/* RIGHT CARD SWAP */}
        <div
          id="card-swap-container"
          className="relative w-[300px] h-[260px] md:w-[500px] md:h-[400px] perspective-[900px] my-7 scale-75 md:scale-100"
        >
          <div className="card absolute top-1/2 left-1/2 w-[280px] h-[190px] md:w-[450px] md:h-[300px] bg-white rounded-xl shadow-2xl p-4 md:p-6 border-3">
            <img
              src="null"
              alt="Event Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card absolute top-1/2 left-1/2 w-[280px] h-[190px] md:w-[450px] md:h-[300px] bg-white rounded-xl shadow-2xl p-4 md:p-6 border-3">
            <img
              src="null"
              alt="Event Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card absolute top-1/2 left-1/2 w-[280px] h-[190px] md:w-[450px] md:h-[300px] bg-white rounded-xl shadow-2xl p-4 md:p-6 border-3">
            <img
              src="null"
              alt="Event Image"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="card absolute top-1/2 left-1/2 w-[280px] h-[190px] md:w-[450px] md:h-[300px] bg-white rounded-xl shadow-2xl p-4 md:p-6 border-3">
            <img
              src="null"
              alt="Event Image"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
