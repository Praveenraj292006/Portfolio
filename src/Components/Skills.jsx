import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  SiPython,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiNextdotjs,
  SiTensorflow,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiKeras,
  SiGit,
  SiGithub,
} from "react-icons/si";
import {
  FaHtml5,
  FaCss3Alt,
  FaDatabase,
  FaPenNib,
  FaGamepad,
} from "react-icons/fa";

const CATEGORIES = [
  {
    id: "lang",
    title: "Programming Languages",
    skills: [
      { name: "Python", Icon: SiPython, color: "#3776AB" },
      { name: "SQL", Icon: FaDatabase, color: "#E48E00" },
      { name: "JavaScript", Icon: SiJavascript, color: "#D4B106" },
      { name: "ReactJS", Icon: SiReact, color: "#61DAFB" },
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    skills: [
      { name: "HTML5", Icon: FaHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: FaCss3Alt, color: "#1572B6" },
      { name: "JavaScript", Icon: SiJavascript, color: "#D4B106" },
      { name: "React.js", Icon: SiReact, color: "#61DAFB" },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Next.js", Icon: SiNextdotjs, color: "#000000" },
    ],
  },
  {
    id: "ml",
    title: "Machine Learning & Analytics",
    skills: [
      { name: "TensorFlow", Icon: SiTensorflow, color: "#FF6F00" },
      { name: "Scikit-learn", Icon: SiScikitlearn, color: "#F7931E" },
      { name: "Pandas", Icon: SiPandas, color: "#150458" },
      { name: "NumPy", Icon: SiNumpy, color: "#4DABCF" },
      { name: "Keras", Icon: SiKeras, color: "#D00000" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#111111" },
    ],
  },
  {
    id: "hobbies",
    title: "Hobbies",
    skills: [
      { name: "Graphic Designing", Icon: FaPenNib, color: "#C026D3" },
      { name: "Game Development", Icon: FaGamepad, color: "#16A34A" },
    ],
  },
];

const ALL_NAMES = [
  ...new Set(CATEGORIES.flatMap((c) => c.skills.map((s) => s.name))),
];

const TILTS = [-6, 5, -4, 7, -5, 4];

/* Sticker: outer = entrance + drag (snaps back), inner = mouse-follow 3D tilt */
const SkillSticker = ({ skill, i, reduce, boxRef }) => {
  const { Icon } = skill;
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 200, damping: 15 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), { stiffness: 200, damping: 15 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.li
      variants={{
        hidden: { scale: 0, opacity: 0, rotate: TILTS[i % 6] - 40, y: -30 },
        show: {
          scale: 1,
          opacity: 1,
          rotate: TILTS[i % 6],
          y: 0,
          transition: { type: "spring", stiffness: 260, damping: 14 },
        },
        exit: { scale: 0, opacity: 0, transition: { duration: 0.15 } },
      }}
      drag
      dragConstraints={boxRef}
      dragSnapToOrigin
      dragElastic={0.2}
      whileDrag={{ scale: 1.15, zIndex: 30 }}
      className="relative cursor-grab active:cursor-grabbing"
      style={{ perspective: 600 }}
    >
      <motion.div
        onPointerMove={reduce ? undefined : onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: rotX, rotateY: rotY }}
        className="relative flex aspect-square flex-col items-center justify-center gap-3 rounded-[2rem] border-[5px] border-white bg-[#fbfaf7] p-3 shadow-[0_4px_0_rgba(0,0,0,0.10),0_12px_22px_rgba(0,0,0,0.22)]"
      >
        <Icon className="text-[clamp(2rem,5vw,3.5rem)]" color={skill.color} aria-hidden="true" />
        <span className="text-center text-sm font-medium leading-tight text-black/70">
          {skill.name}
        </span>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[1.6rem] bg-gradient-to-br from-white/70 via-transparent to-black/[0.06]"
        />
      </motion.div>
    </motion.li>
  );
};

const Skills = () => {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const headRef = useRef(null);
  const boxRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.6 });
  const current = CATEGORIES[active];

  return (
    <section className="relative min-w-screen overflow-hidden bg-background px-5 py-12 text-text-primary sm:px-8 sm:py-20 lg:px-12">
      {/* Heading */}
      <h2
        ref={headRef}
        aria-label="Skills"
        className="overflow-hidden pb-8 font-[Bebas_Neue] text-[clamp(5rem,20vw,16rem)] font-bold uppercase leading-[0.85]"
      >
        {"Skills".split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={headInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          >
            {c}
          </motion.span>
        ))}
      </h2>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-12">
        {/* Category list */}
        <ul role="tablist" aria-label="Skill categories" className="flex flex-col">
          {CATEGORIES.map((c, i) => {
            const isActive = i === active;
            return (
              <li key={c.id} className="border-t border-neutral-500/40 last:border-b">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative flex w-full cursor-pointer items-baseline justify-between gap-4 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  {isActive && (
                    <motion.span
                      layoutId="skill-marker"
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-1.5 rounded-full bg-amber-300"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span
                    className={`pl-5 font-[Bebas_Neue] text-[clamp(2rem,5vw,4.2rem)] uppercase leading-none transition-all duration-500 ${
                      isActive
                        ? "translate-x-2 text-amber-200"
                        : "opacity-40 group-hover:opacity-70"
                    }`}
                  >
                    {c.title}
                  </span>
                  <span className="shrink-0 text-sm opacity-60">{c.skills.length}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Cream sticker board */}
        <div
          ref={boxRef}
          className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] bg-cream p-5 sm:rounded-[4rem] sm:p-8 lg:min-h-[480px]"
        >
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

          <AnimatePresence mode="wait">
            <motion.ul
              key={current.id}
              role="tabpanel"
              initial="hidden"
              animate="show"
              exit="exit"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduce ? 0 : 0.07 } },
                exit: {},
              }}
              className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
            >
              {current.skills.map((s, i) => (
                <SkillSticker key={s.name} skill={s} i={i} reduce={reduce} boxRef={boxRef} />
              ))}
            </motion.ul>
          </AnimatePresence>

          <p className="pointer-events-none absolute bottom-4 right-6 z-10 hidden text-sm text-black/50 sm:block">
            Hover to tilt, drag to toss
          </p>
        </div>
      </div>

      {/* Marquee of everything */}
      <div className="mt-14 overflow-hidden border-y border-neutral-500/40 py-4" aria-hidden="true">
        <motion.div
          className="flex w-max gap-10 whitespace-nowrap font-[Bebas_Neue] text-5xl uppercase sm:text-7xl"
          animate={reduce ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {[...ALL_NAMES, ...ALL_NAMES].map((n, i) => (
            <span
              key={i}
              className={i % 2 ? "text-amber-300" : "text-transparent"}
              style={i % 2 ? undefined : { WebkitTextStroke: "1.5px currentColor", color: "transparent" }}
            >
              {n}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;