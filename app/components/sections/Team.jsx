"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const teams = [
  { id: "technical", title: "Technical Team", lead: "Aarav Mehta" },
  { id: "design", title: "Design Team", lead: "Riya Shah" },
  { id: "marketing", title: "Marketing Team", lead: "Kunal Verma" },
  { id: "content", title: "Content Team", lead: "Sneha Patil" },
  { id: "operations", title: "Operations Team", lead: "Rahul Nair" },
  { id: "finance", title: "Finance Team", lead: "Neha Joshi" },
];

export default function TeamsSection() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const [activeTeam, setActiveTeam] = useState(null);

  useEffect(() => {
  const container = containerRef.current;
  const section = sectionRef.current;

  let ctx = gsap.context(() => {
    const getScrollDistance = () => {
      return container.scrollWidth - window.innerWidth;
    };

    gsap.to(container, {
      x: () => -getScrollDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: () => `+=${getScrollDistance()}`,
        scrub: 1,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
  }, section);

  // VERY IMPORTANT – force refresh after layout is stable
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });

  return () => ctx.revert();
}, []);


  return (
    <section
      ref={sectionRef}
      className="relative w-screen h-[600px] overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex h-full items-start pt-12 gap-32 px-32 will-change-transform"
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isActive={activeTeam === team.id}
            onOpen={() => setActiveTeam(team.id)}
            onClose={() => setActiveTeam(null)}
          />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ team, isActive, onOpen, onClose }) {
  const cardRef = useRef(null);
  const leadRef = useRef(null);
  const membersRef = useRef(null);

  // Initial card appearance animation
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  // Active state scaling
  useEffect(() => {
    gsap.to(cardRef.current, {
      scale: isActive ? 1 : 0.9,
      opacity: isActive ? 1 : 0.5,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [isActive]);

  // View transition logic
  useEffect(() => {
    const leadEl = leadRef.current;
    const membersEl = membersRef.current;

    gsap.killTweensOf([leadEl, membersEl]);

    if (isActive) {
      gsap.set(membersEl, { pointerEvents: "auto" });
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(leadEl, { pointerEvents: "none" });
        }
      });

      tl.to(leadEl, {
        opacity: 0,
        y: -30,
        duration: 0.25,
        ease: "power2.inOut",
      }).fromTo(
        membersEl,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "<"
      );
    } else {
      gsap.set(leadEl, { pointerEvents: "auto" });
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(membersEl, { pointerEvents: "none", opacity: 0 });
        }
      });

      tl.to(membersEl, {
        opacity: 0,
        y: 30,
        duration: 0.25,
        ease: "power2.inOut",
      }).fromTo(
        leadEl,
        { opacity: 0, y: -30 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
        "<"
      );
    }
  }, [isActive]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      className="relative w-[1000px] h-[500px] rounded-3xl p-10 overflow-hidden flex-shrink-0 bg-black border border-white/10"
    >
      <div ref={leadRef} className="absolute inset-0">
        <LeadView team={team} />
      </div>
      <div 
        ref={membersRef} 
        className="absolute inset-0 opacity-0 pointer-events-none"
      >
        <MembersView team={team} />
      </div>
    </div>
  );
}

function LeadView({ team }) {
  return (
    <div className="flex h-full w-full items-center justify-between gap-12">
      <div className="flex flex-col gap-4 w-[280px] shrink-0">
        <div className="w-52 h-52 rounded-2xl bg-gradient-to-br from-gray-300 to-gray-500" />
        <div className="grid grid-cols-3 gap-3">
          <div className="w-14 h-14 rounded-xl bg-white/20" />
          <div className="w-14 h-14 rounded-xl bg-white/20" />
          <div className="w-14 h-14 rounded-xl bg-white/20" />
        </div>
      </div>
      <div className="flex flex-col justify-center flex-1 pr-12">
        <h2 className="text-4xl font-bold">{team.title}</h2>
        <p className="text-xl opacity-80 mt-3">Lead: {team.lead}</p>
        <p className="text-sm opacity-60 mt-5 max-w-xl">
          Hover to explore all members of the {team.title.toLowerCase()}
        </p>
      </div>
    </div>
  );
}

function MembersView({ team }) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">{team.title} Members</h2>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Close handled by parent onMouseLeave
          }}
          className="text-sm opacity-70 hover:opacity-100 transition"
        >
          Close
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 flex-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white/10 rounded-2xl p-4 flex items-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-500" />
            <div>
              <p className="text-lg font-medium">Member {i}</p>
              <p className="text-sm opacity-60">Role</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}