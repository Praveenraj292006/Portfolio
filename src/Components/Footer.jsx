import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

// ✏️ Replace with your real details
const NAME = "Praveenraj";
const EMAIL = "praveenraj292006@gmail.com";

// Match these to the ids on your sections (e.g. <section id="projects">)
const NAV = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { name: "GitHub", Icon: FaGithub, href: "https://github.com/Praveenraj292006" },
  { name: "LinkedIn", Icon: FaLinkedinIn, href: "www.linkedin.com/in/praveenraj-m-63609932b" },
  { name: "Instagram", Icon: FaInstagram,  href: "https://www.instagram.com/praveenraj_m.06/" },
  { name: "WhatsApp", Icon: FaWhatsapp, href: "https://wa.me/918610254207" },
];

const linkClass =
  "group relative inline-block w-fit focus-visible:outline-2 focus-visible:outline-offset-4";

const Underlined = ({ children }) => (
  <>
    {children}
    <span
      aria-hidden="true"
      className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-amber-300 transition-transform duration-500 group-hover:scale-x-100 group-focus-visible:scale-x-100"
    />
  </>
);

const Footer = () => {
  const reduce = useReducedMotion();
  const nameRef = useRef(null);
  const inView = useInView(nameRef, { once: true, amount: 0.4 });

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <footer className="relative min-w-screen overflow-hidden bg-background px-5 pt-16 text-text-primary sm:px-8 lg:px-12">
      {/* Top: statement + back to top */}
      <div className="flex items-start justify-between gap-8 border-t border-neutral-500/40 pt-10">
        <p className="max-w-md font-[Bebas_Neue] text-[clamp(2rem,4.5vw,3.5rem)] uppercase leading-[0.95]">
          Thanks for scrolling this far. Let's build something good together.
        </p>

        <motion.button
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          whileHover={reduce ? undefined : { rotate: -8, y: -4 }}
          whileTap={{ scale: 0.93 }}
          className="group grid size-20 shrink-0 cursor-pointer place-items-center rounded-[1.6rem] border-[4px] border-white bg-[#fbfaf7] text-black shadow-[0_4px_0_rgba(0,0,0,0.10),0_12px_22px_rgba(0,0,0,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 sm:size-24"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-8 transition-transform duration-500 group-hover:-translate-y-1"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20V4M5 11l7-7 7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Link columns */}
      <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-3">
        <nav aria-label="Footer">
          <p className="mb-4 text-sm opacity-60">Pages</p>
          <ul className="flex flex-col gap-2 text-xl">
            {NAV.map((n) => (
              <li key={n.label}>
                <a href={n.href} className={linkClass}>
                  <Underlined>{n.label}</Underlined>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-sm opacity-60">Elsewhere</p>
          <ul className="flex flex-col gap-2 text-xl">
            {SOCIALS.map(({ name, Icon, href }) => (
              <li key={name}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${linkClass} flex items-center gap-3`}
                >
                  <Icon aria-hidden="true" className="text-lg text-amber-300" />
                  <span className="relative">
                    <Underlined>{name}</Underlined>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 sm:col-span-1">
          <p className="mb-4 text-sm opacity-60">Email</p>
          <a
            href={`mailto:${EMAIL}`}
            className={`${linkClass} break-all text-xl text-amber-200`}
          >
            <Underlined>{EMAIL}</Underlined>
          </a>
        </div>
      </div>

      {/* The memorable moment: oversized name. Each letter lifts on hover. */}
      <h2
        ref={nameRef}
        aria-label={NAME}
        className="-mx-2 select-none whitespace-nowrap text-center font-[Bebas_Neue] text-[23vw] font-bold uppercase leading-[0.78] sm:-mx-4"
      >
        {NAME.split("").map((c, i) => (
          <span key={i} aria-hidden="true" className="inline-block overflow-hidden pt-[3vw] align-bottom">
            <motion.span
              className="inline-block cursor-default"
              initial={reduce ? false : { y: "110%" }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: "-6%", color: "#fcd34d" }}
            >
              {c}
            </motion.span>
          </span>
        ))}
      </h2>

      {/* Bottom bar */}
      <div className="flex flex-col gap-2 border-t border-neutral-500/40 py-6 text-sm opacity-70 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {NAME}. All rights reserved.</p>
        <p>Designed and built by me with React, Tailwind and Framer Motion.</p>
      </div>
    </footer>
  );
};

export default Footer;