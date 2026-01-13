"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Shuffle from "../reusables/Shuffle";

gsap.registerPlugin(ScrollTrigger);

const teams = [
  {
    id: "President",
    title: "President",
    image: "/null",
  },
  {
    id: "Vice President",
    title: "Vice President",
    image: "/null",
  },
  {
    id: "technical",
    title: "Technical Team",
    lead: "l3",
    image: "/null",
    members: [
      { name: "Tech Member 1", role: "role 1" },
      { name: "Tech Member 2", role: "role 2" },
      { name: "Tech Member 3", role: "role 3" },
    ],
  },
  {
    id: "content",
    title: "Design & Marketing Team",
    lead: "l4",
    image: "/null",
    members: [
      { name: " Member 1", role: "role 1" },
      { name: "Member 2", role: "role 2" },
    ],
  },
  {
    id: "operations",
    title: "Event & Management Team",
    lead: "l5",
    image: "/null",
    members: [
      { name: "Member 1", role: "role 1" },
      { name: "Member 1", role: "role 2" },
    ],
  },
  {
    id: "pr",
    title: "Public Relations Team",
    lead: "l6",
    image: "/null",
    members: [
      { name: "PR Member 1", role: "PR Specialist" },
      { name: "PR Member 2", role: "Communications Officer" },
    ],
  },
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
            isExecutive={team.title === "President" || team.title === "Vice President"}
          />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ team, isActive, onOpen, onClose , isExecutive }) {
  const cardRef = useRef(null);
  const leadRef = useRef(null);
  const membersRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.to(cardRef.current, {
      scale: isActive ? 1 : 0.9,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [isActive]);

  useEffect(() => {
    const leadEl = leadRef.current;
    const membersEl = membersRef.current;

    gsap.killTweensOf([leadEl, membersEl]);

    if (isActive) {
      const tl = gsap.timeline();

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
      const tl = gsap.timeline();

      tl.to(membersEl, {
        opacity: 0,
        y: 30,
        duration: 0.25,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(membersEl, { opacity: 0 });
        },
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
      className="relative w-[1000px] h-[500px] rounded-3xl p-10 overflow-hidden flex-shrink-0 bg-purple-500 border border-2"
    >
      <div ref={leadRef} className="absolute inset-0">
        <LeadView 
        team={team} 
        onOpen={onOpen} 
        onClose={onClose} 
        disableHover={isExecutive}
        />
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

function LeadView({ team, onOpen, onClose , disableHover }) {
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const handleMouseEnter = () => {
    if (disableHover) return;
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => {
      onOpen();
    }, 100); // 100ms delay
  };

  const handleMouseLeave = () => {
    if (disableHover) return;
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      onClose();
    }, 80); // 80ms delay
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-16 max-w-[800px] w-full">
        <div className="flex flex-col gap-4 w-[280px] shrink-0">
          <div className="w-63 h-72 rounded-2xl bg-gradient-to-br border-3">
            <img
              src={team.image}
              alt={team.title}
              className="w-full h-full object-cover rounded-2xl"
              draggable={false}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="w-14 h-14 rounded-xl bg-white/20" />
            <div className="w-14 h-14 rounded-xl bg-white/20" />
            <div className="w-14 h-14 rounded-xl bg-white/20" />
          </div>
        </div>
        <div className="flex flex-col justify-center flex-1 pr-12">
          <h2
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="text-4xl font-bold cursor-pointer hover:underline w-fit"
          >
            <Shuffle
              text={`${team.title}`}
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
          </h2>
          {!disableHover && (<p className="text-2xl font-bold opacity-80 mt-10">Lead: {team.lead}</p>)}
          <p className="text-xl opacity-60 mt-2 max-w-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
            facere corporis? Voluptatem optio suscipit accusamus magni aliquid
            debitis natus vel odit quis at laudantium, praesentium eveniet,
            itaque iusto ducimus veniam!
          </p>
        </div>
      </div>
    </div>
  );
}

function MembersView({ team }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col max-w-[900px] w-full px-4">
        {/* HEADER */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold">{team.title} Members</h2>
          <p className="text-xl opacity-60 mt-1">
            Meet the people behind {team.title.toLowerCase()}
          </p>
        </div>

        {/* RESPONSIVE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.members?.map((member, i) => (
            <div
              key={i}
              className="bg-white/10 rounded-2xl p-4 flex items-center gap-4 border-2"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-700 shrink-0">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>
              <div className="">
                <p className="text-base font-medium">{member.name}</p>
                <p className="text-sm opacity-60">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


