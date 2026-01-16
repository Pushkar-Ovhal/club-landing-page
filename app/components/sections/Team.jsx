"use client";

import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Shuffle from "../reusables/Shuffle";

gsap.registerPlugin(ScrollTrigger);

const teams = [
  { id: "President", title: "President", image: "/null" },
  { id: "Vice President", title: "Vice President", image: "/null" },
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
      { name: "Member 1", role: "role 1" },
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
      { name: "Member 2", role: "role 2" },
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
    const mm = gsap.matchMedia();

    // ==========================
    // DESKTOP – horizontal pinned scroll
    // ==========================
mm.add("(min-width: 768px)", () => {
  const getScrollDistance = () => {
    const containerWidth = container.scrollWidth;
    const viewportWidth = section.offsetWidth;
    const lastCard = container.lastElementChild;

    if (!lastCard) return containerWidth - viewportWidth;

    const lastCardWidth = lastCard.offsetWidth;
    const centerOffset = (viewportWidth / 2) - (lastCardWidth / 2);

    return containerWidth - viewportWidth + centerOffset;
  };

  const tween = gsap.to(container, {
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

  ScrollTrigger.refresh();

  return () => {
    tween.scrollTrigger && tween.scrollTrigger.kill();
    tween.kill();
  };
});

    // ==========================
    // MOBILE – auto swipe marquee
    // ==========================
    mm.add("(max-width: 767px)", () => {
      let marquee;

      const setup = () => {
        const totalWidth = container.scrollWidth;
        gsap.set(container, { x: 0 });

        marquee?.kill();

        marquee = gsap.to(container, {
          x: -(totalWidth - window.innerWidth),
          duration: 22,
          ease: "linear",
          repeat: -1,
          modifiers: {
            x: (x) => {
              const max = totalWidth - window.innerWidth;
              const num = parseFloat(x);
              return num <= -max ? "0px" : x;
            },
          },
        });
      };

      setup();
      window.addEventListener("resize", setup);

      return () => {
        marquee?.kill();
        window.removeEventListener("resize", setup);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[900px] md:min-h-[700px] pb-32 overflow-x-hidden overflow-y-visible md:overflow-hidden"
    >
      <div
        ref={containerRef}
        className="flex flex-row h-full items-start pt-12 gap-12 md:gap-32 px-4 md:px-32 will-change-transform"
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            team={team}
            isActive={activeTeam === team.id}
            onOpen={() => setActiveTeam(team.id)}
            onClose={() => setActiveTeam(null)}
            isExecutive={
              team.title === "President" || team.title === "Vice President"
            }
          />
        ))}
      </div>
    </section>
  );
}

function TeamCard({ team, isActive, onOpen, onClose, isExecutive }) {
  const cardRef = useRef(null);
  const leadRef = useRef(null);
  const membersRef = useRef(null);

  // tap outside to close
  useEffect(() => {
    const handler = (e) => {
      if (!cardRef.current) return;
      if (!cardRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("touchstart", handler);
    return () => document.removeEventListener("touchstart", handler);
  }, [onClose]);

  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    gsap.to(cardRef.current, {
      scale: isActive ? 1 : 0.95,
      duration: 0.5,
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
      className="relative w-[260px] sm:w-[300px] md:w-[1000px] min-h-[460px] md:h-[500px] rounded-3xl p-6 md:p-10 overflow-hidden flex-shrink-0 bg-purple-500 border-3"
      style={{ backgroundImage: `url(images/teambg.jpeg)` }}
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

function LeadView({ team, onOpen, onClose, disableHover }) {
  const openTimer = useRef(null);
  const closeTimer = useRef(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 767);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleMouseEnter = () => {
    if (disableHover || isMobile) return;
    clearTimeout(closeTimer.current);
    openTimer.current = setTimeout(() => {
      onOpen();
    }, 120);
  };

  const handleMouseLeave = () => {
    if (disableHover || isMobile) return;
    clearTimeout(openTimer.current);
    closeTimer.current = setTimeout(() => {
      onClose();
    }, 100);
  };

  const handleClick = () => {
    if (!isMobile || disableHover) return;
    onOpen();
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* DESKTOP */}
      <div className="hidden md:flex flex-col md:flex-row items-center gap-6 md:gap-16 w-full max-w-full px-2">
        <div className="flex flex-col gap-4 px-8 w-full md:w-[280px] shrink-0 items-center md:items-start">
          <div className="w-52 h-72 rounded-2xl border-4 border-yellow-500 bg-black/60 overflow-hidden">
            <img
              src={team.image}
              alt={team.title}
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>

          <div className="flex gap-10 mt-4 relative z-20">
            <a
              href={team.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-purple-800/50 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200 border-2 border-yellow-500"
            >
              <FaInstagram size={22} className="text-yellow-300" />
            </a>

            <a
              href={team.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-purple-800/50 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200 border-2 border-yellow-500"
            >
              <FaLinkedin size={22} className="text-yellow-300" />
            </a>

            <a
              href={team.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-purple-800/50 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200 border-2 border-yellow-500"
            >
              <FaGithub size={22} className="text-yellow-300" />
            </a>
          </div>
        </div>

        <div className="flex flex-col justify-center flex-1 md:pr-12 text-center md:text-left">
          <h2
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="text-2xl md:text-4xl text-yellow-400 [-webkit-text-stroke:2px_black] font-bold cursor-pointer hover:underline w-fit"
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

          {!disableHover && !isMobile && (
            <p className="text-xl font-bold opacity-80 mt-8">
              Lead: {team.lead}
            </p>
          )}

          <p className="text-base font-bold opacity-90 mt-2 max-w-xl">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed,
            facere corporis? Voluptatem optio suscipit accusamus magni aliquid.
          </p>
        </div>
      </div>

      {/* MOBILE – SIMPLE */}
      <div className="flex md:hidden flex-col items-center justify-start w-full h-full px-4 pt-6 gap-4 text-center">
        <div className="w-40 h-52 rounded-2xl border-4 border-yellow-500 overflow-hidden">
          <img
            src={team.image}
            alt={team.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>

        <h2
          onClick={handleClick}
          className="text-2xl font-bold text-yellow-400"
        >
          {team.title}
        </h2>

        <p className="text-sm font-bold opacity-90 px-2">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed, facere
          corporis?
        </p>

        <div className="flex gap-4 mt-4 relative z-20">
          <a
            href={team.instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200"
          >
            <FaInstagram size={22} className="text-yellow-300" />
          </a>

          <a
            href={team.linkedin || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200"
          >
            <FaLinkedin size={22} className="text-yellow-300" />
          </a>

          <a
            href={team.github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center 
               hover:bg-yellow-400/30 hover:scale-110 transition-all duration-200"
          >
            <FaGithub size={22} className="text-yellow-300" />
          </a>
        </div>

        <p className="text-xs opacity-50 mt-4">(Tap title to view members)</p>
      </div>
    </div>
  );
}

function MembersView({ team }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* DESKTOP */}
      <div className="hidden md:flex flex-col w-full max-w-full px-3 md:px-4">
        <div className="mb-6">
          <h2 className="text-3xl font-bold">{team.title} Members</h2>
          <p className="text-xl opacity-60 mt-1">
            Meet the people behind {team.title.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.members?.map((member, i) => (
            <div
              key={i}
              className="bg-white/30 rounded-2xl p-6 flex items-center gap-4 border-2"
            >
              <div className="w-14 h-14 rounded-full overflow-hidden bg-black/35 border-2 shrink-0" />
              <div>
                <p className="text-base font-medium">{member.name}</p>
                <p className="text-sm opacity-60">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex md:hidden flex-col w-full h-full px-4 pt-6 gap-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-center">{team.title} Members</h2>

        <p className="text-sm opacity-60 text-center mb-2">
          Meet the people behind {team.title.toLowerCase()}
        </p>

        <div className="flex flex-col gap-3">
          {team.members?.map((member, i) => (
            <div
              key={i}
              className="bg-white/20 rounded-xl p-3 flex items-center gap-3 border"
            >
              <div className="w-10 h-10 rounded-full bg-black/30 shrink-0" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">{member.name}</span>
                <span className="text-xs opacity-60">{member.role}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs opacity-50 mt-4">
          (Tap outside card to close)
        </p>
      </div>
    </div>
  );
}
