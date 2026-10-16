import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiTailwindcss,
  SiDocker,
  SiGit,
} from "react-icons/si";

import {
  FaInstagram ,
  FaWhatsapp ,
  FaGithub ,
  FaLinkedinIn ,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/*
  pos  = [left%, top%] on sm and up
  mpos = [left%, top%] on mobile (stickers without mpos are hidden on mobile)
  rot  = resting rotation in degrees
*/
const STICKERS = [
  { name: "React", Icon: SiReact, color: "#61DAFB", pos: [42, 6], mpos: [46, 8], rot: -10 },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6", pos: [57, 10], rot: 7 },
  { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4", pos: [71, 5], mpos: [20, 12], rot: -6 },
  { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", pos: [48, 36], mpos: [66, 32], rot: 9 },
  { name: "Express", Icon: SiExpress, color: "#111111", pos: [62, 33], rot: -8 },
  { name: "Next.js", Icon: SiNextdotjs, color: "#000000", pos: [76, 38], mpos: [22, 62], rot: 6 },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248", pos: [40, 62], rot: -5 },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1", pos: [54, 64], mpos: [44, 58], rot: 10 },
  { name: "Docker", Icon: SiDocker, color: "#2496ED", pos: [68, 62], rot: -9 },
  { name: "Git", Icon: SiGit, color: "#F05032", pos: [32, 40], rot: 8 },
];

/* Masked word so GSAP can slide it up from behind a clip */
const Word = ({ children, className = "" }) => (
  <span className={`overflow-hidden align-bottom ${className}`}>
    <span className="hero-word inline-block will-change-transform">
      {children}
    </span>
  </span>
);

/*
  Two layers on purpose:
  - outer (Framer Motion): entrance, hover, drag
  - inner (GSAP): idle floating
  They animate different elements so their transforms never fight.
*/
const Sticker = ({ s, i, boxRef, show, reduce, onDragStart }) => {
  const { Icon } = s;

  const variants = {
    hidden: { scale: 0, opacity: 0, rotate: s.rot - 45, y: -30 },
    show: {
      scale: 1,
      opacity: 1,
      rotate: s.rot,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 14,
        delay: 0.6 + i * 0.08,
      },
    },
  };

  const style = {
    "--l": `${s.pos[0]}%`,
    "--t": `${s.pos[1]}%`,
    ...(s.mpos && { "--ml": `${s.mpos[0]}%`, "--mt": `${s.mpos[1]}%` }),
  };

  return (
    <motion.div
      variants={variants}
      initial={reduce ? false : "hidden"}
      animate={show ? "show" : "hidden"}
      whileHover={{ scale: 1.12, rotate: s.rot + 6 }}
      whileDrag={{ scale: 1.18, zIndex: 40 }}
      drag
      dragConstraints={boxRef}
      dragElastic={0.15}
      dragMomentum={false}
      onDragStart={onDragStart}
      title={s.name}
      aria-label={s.name}
      style={style}
      className={`absolute z-20 aspect-square h-[24%] cursor-grab active:cursor-grabbing  sm:h-[18%]
        left-[var(--ml)] top-[var(--mt)] sm:left-[var(--l)] sm:top-[var(--t)]
        ${s.mpos ? "" : "hidden sm:block"}`}
    >
      <div className="sticker-float h-full w-full ">
        <div className="relative grid h-full w-full place-items-center rounded-[28%] border-[5px] border-white bg-[#fbfaf7] shadow-[0_4px_0_rgba(0,0,0,0.10),0_12px_22px_rgba(0,0,0,0.22)]">
          <Icon size="52%" color={s.color} aria-hidden="true" />
          {/* peel highlight */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[24%] bg-gradient-to-br from-white/70 via-transparent to-black/[0.06]"
          />
        </div>
      </div>
    </motion.div>
  );
};

const paraContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18, delayChildren: 0.9 } },
};
const paraItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const Hero = () => {
  const rootRef = useRef(null);
  const boxRef = useRef(null);
  const reduce = useReducedMotion();
  const boxInView = useInView(boxRef, { once: true, amount: 0.25 });
  const [dragged, setDragged] = useState(false);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(prefers-reduced-motion: no-preference)",
      () => {
        // 1. Heading words slide up out of their masks
        gsap.from(".hero-word", {
          yPercent: 115,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.12,
        });

        // 2. Cream box wipes open, image settles from a zoom
        const trigger = {
          trigger: ".cream-box",
          start: "top 90%",
          once: true,
        };
        gsap.fromTo(
          ".cream-box",
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.4,
            ease: "power3.inOut",
            clearProps: "clipPath",
            scrollTrigger: trigger,
          }
        );
        gsap.from(".hero-img", {
          scale: 1.25,
          duration: 1.8,
          ease: "power3.out",
          scrollTrigger: trigger,
        });

        // 3. Stickers float gently once they've landed
        gsap.utils.toArray(".sticker-float").forEach((el, i) => {
          gsap.to(el, {
            y: gsap.utils.random(-9, 9),
            rotation: gsap.utils.random(-4, 4),
            duration: gsap.utils.random(2, 3.5),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: 1.8 + i * 0.15,
          });
        });
      },
      rootRef
    );

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative min-w-screen min-h-screen overflow-hidden bg-background px-5 py-12 text-text-primary sm:px-8 sm:py-20 lg:px-12 mb-10"
    >
      {/* Heading */}
      <div className="pb-6 sm:pb-12">
        <h2
          aria-label="Fullstack Developer"
          className="font-[Bebas_Neue] text-[clamp(3.5rem,13.5vw,16rem)] font-bold uppercase leading-[0.82] tracking-tight lg:whitespace-nowrap"
        >
          <Word className="block sm:inline-block">Fullstack</Word>{" "}
          <Word className="block sm:inline-block">Developer</Word>
        </h2>
      </div>

      {/* About paragraphs */}
      <motion.div
        variants={paraContainer}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="mb-10 grid grid-cols-1 gap-3 sm:mb-14 sm:grid-cols-2 sm:gap-12"
      >
        <motion.div variants={paraItem} className="max-w-xl">
          <p className="text-base leading-relaxed text-text sm:text-base">
            <span className="text-2xl uppercase text-amber-200">
              I'm Praveenraj,
            </span>{" "}
            a developer passionate about building digital experiences at the
            intersection of design, technology, and problem-solving. I enjoy
            turning complex ideas into clean, intuitive, and meaningful
            products.
          </p>
        </motion.div>

        <motion.div variants={paraItem} className="max-w-xl sm:ml-auto">
          <p className="text-base leading-relaxed text-text sm:text-lg">
            From responsive web applications and full-stack platforms to
            AI-powered experiments, I build products that look distinctive,
            work intelligently, and deliver real value. I care about both the
            details people see and the systems working behind them.
          </p>
        </motion.div>
      </motion.div>

      {/* Cream feature box */}
      <div
        ref={boxRef}
        className="cream-box relative mr-auto h-[46vh] min-h-[280px] w-[88%] overflow-hidden rounded-r-[5rem] bg-cream sm:h-[45vh] sm:w-3/4 sm:rounded-r-[12rem] lg:h-[42vh] lg:w-[90vw]"
      >
        {/* Grid pattern */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0,0,0,0.10) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0,0,0,0.10) 1px, transparent 1px)
            `,
            backgroundSize: "35px 35px",
          }}
        />

        {/* Your image */}
        <img
            src="/red-bg.png"
            alt="Praveenraj"
            className="
                hero-img
                absolute inset-y-0 left-0 z-10
                h-full w-full
                object-contain object-bottom
                grayscale
                sm:w-1/2 sm:object-cover sm:object-right
            "
            />
        {/* Tech stickers */}
        {STICKERS.map((s, i) => (
          <Sticker
            key={s.name}
            s={s}
            i={i}
            boxRef={boxRef}
            show={boxInView}
            reduce={reduce}
            onDragStart={() => setDragged(true)}
          />
        ))}

        {/* Drag hint, disappears after first drag */}
        <AnimatePresence>
          {!dragged && boxInView && (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 2 } }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute bottom-4 left-[54%] z-30 hidden text-sm text-black/50 sm:block"
            >
              Drag the stickers around
            </motion.p>
          )}
        </AnimatePresence>
      </div>

     
<div className="trustbar relative flex gap-4 pt-5 text-amber-300">
  <a
    href="https://github.com/Praveenraj292006"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
    title="GitHub"
    className="transition-transform duration-300 hover:-translate-y-1 hover:text-white"
  >
    <FaGithub size={24} />
  </a>

  <a
    href="https://www.instagram.com/praveenraj_m.06/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Instagram"
    title="Instagram"
    className="transition-transform duration-300 hover:-translate-y-1 hover:text-white"
  >
    <FaInstagram size={24} />
  </a>

  <a
    href="www.linkedin.com/in/praveenraj-m-63609932b"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
    title="LinkedIn"
    className="transition-transform duration-300 hover:-translate-y-1 hover:text-white"
  >
    <FaLinkedinIn size={24} />
  </a>

  <a
    href="https://wa.me/918610254207"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="WhatsApp"
    title="WhatsApp"
    className="transition-transform duration-300 hover:-translate-y-1 hover:text-white"
  >
    <FaWhatsapp size={24} />
  </a>
</div>

    </section>
  );
};

export default Hero;