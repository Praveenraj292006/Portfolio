
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const projects = [
  {
    title: "NOAARC",
    subtitle: "Physiotherapy Website",
    year: "2025–26",
    role: "Client Project · Web Developer",
    number: "01",
    description:
      "A website developed for a physiotherapy and rehabilitation client, designed to present services clearly and create a professional online presence. I focused on responsive layouts, engaging visual interactions, and making information easy for visitors to navigate.",
    contribution: [
      "Responsive website development",
      "Interactive animations and scroll effects",
      "Service and content presentation",
      "Enquiry functionality",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS", "GSAP", "Vite"],
    live: "", // Add your live website URL
    code: "", // Add your repository URL if public
  },
  {
    title: "POSTER-THEORY",
    subtitle: "E-commerce Platform",
    year: "2025–26",
    role: "The Dot · Full-Stack Developer",
    number: "02",
    description:
      "An e-commerce platform developed under The Dot, involving product discovery, storefront functionality, backend APIs, and administrative workflows. My contributions include product management features, dynamic homepage collections, order-related functionality, coupon controllers, and payment gateway integration.",
    contribution: [
      "Product APIs, filters, and collection logic",
      "Dynamic homepage product sections",
      "Admin and coupon functionality",
      "Order workflows and payment integration",
    ],
    tags: [
      "React",
      "JavaScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Cashfree",
    ],
    live: "https://postertheorystore.in",
    code: "", // Keep private repositories private
  },
  {
    title: "PORTFOLIO",
    subtitle: "Personal Website",
    year: "2025–26",
    role: "Personal Client · Frontend Developer",
    number: "03",
    description:
      "A portfolio website created for a friend to showcase their identity, work, and skills through a personalised digital experience. The project focused on visual presentation, responsive design, reusable components, and interactive frontend details.",
    contribution: [
      "Custom portfolio layout",
      "Responsive interface development",
      "Typography and visual hierarchy",
      "Interactive UI elements",
    ],
    tags: ["React", "JavaScript", "Tailwind CSS"],
    live: "", // Add your friend's published website URL
    code: "", // Add a repository URL if available
  },
];

const Projects = () => {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();

  return (
    <section
      id="projects"
      className="w-full overflow-hidden bg-accent-bg/30 pb-16 text-text sm:pb-20 lg:pb-28"
    >
      {/* Responsive heading */}
      <div className="overflow-hidden px-5 pb-8 pt-10 sm:px-8 sm:pb-12 sm:pt-14 lg:px-12">
        <motion.h2
          initial={reduce ? false : { y: "100%", opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="whitespace-nowrap font-[Bebas_Neue] text-[clamp(4rem,15vw,12rem)] font-bold uppercase leading-[0.85] tracking-tight"
        >
          Projects<span className="text-cream">.</span>
        </motion.h2>

        <div className="mt-5 flex flex-col justify-between gap-2 border-t border-current/20 pt-4 sm:flex-row sm:items-center">
          <p className="text-sm opacity-70 sm:text-base text-amber-300 uppercase">
            A selection of things I've built.
          </p>
          <p className="text-xs uppercase tracking-[0.2em] opacity-60">
             Projects / Development
          </p>
        </div>
      </div>

      {/* Project accordion */}
      <ul className="px-5 sm:px-8 lg:px-12">
        {projects.map((p, i) => {
          const isOpen = open === i;

          return (
            <li
              key={p.number}
              className="border-t border-current/25 last:border-b"
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`project-panel-${i}`}
                className="group flex w-full cursor-pointer items-center gap-3 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-4 sm:gap-6 sm:py-7 lg:py-8"
              >
                
                <span
                  className={`min-w-0 flex-1 font-[Bebas_Neue] text-[clamp(2rem,7vw,6rem)] uppercase leading-[0.9] tracking-tight transition-opacity duration-300 ${
                    isOpen
                      ? "opacity-100"
                      : "opacity-45 group-hover:opacity-80"
                  }`}
                >
                  {p.title}
                  <span className="mt-2 block font-sans text-xs text-cream font-normal tracking-normal opacity-70 sm:text-sm">
                    {p.subtitle}
                  </span>
                </span>

                <span className="hidden shrink-0 text-right text-sm opacity-60 md:block">
                  {p.role}
                  <br />
                  {p.year}
                </span>

                <span
                  aria-hidden="true"
                  className={`grid size-9 shrink-0 place-items-center rounded-full border border-current/30 text-lg transition-transform duration-300 sm:size-12 ${
                    isOpen ? "rotate-45 border-cream" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`project-panel-${i}`}
                    key="panel"
                    initial={reduce ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { height: 0, opacity: 0 }
                    }
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 pb-8 pl-0 sm:pb-10 md:grid-cols-[1.5fr_1fr] md:gap-12 md:pl-12 lg:pl-16">
                      {/* Project details */}
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-cream sm:text-sm">
                          {p.role}
                        </p>

                        <p className="max-w-[65ch] text-sm leading-relaxed sm:text-base lg:text-lg">
                          {p.description}
                        </p>

                        <h3 className="mb-3 mt-6 text-xs uppercase tracking-[0.18em] opacity-60">
                          My contributions
                        </h3>

                        <ul className="space-y-2">
                          {p.contribution.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm sm:text-base"
                            >
                              <span className="text-cream">↗</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-7 flex flex-wrap gap-3">
                          {p.live && (
                            <a
                              href={p.live}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-current px-5 py-2.5 text-sm font-medium transition-colors hover:bg-cream hover:text-black"
                            >
                              View live site ↗
                            </a>
                          )}

                          {p.code && (
                            <a
                              href={p.code}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-current/30 px-5 py-2.5 text-sm transition-colors hover:border-cream"
                            >
                              View source ↗
                            </a>
                          )}
                        </div>
                      </div>

                      {/* Tech stack */}
                      <div>
                        <p className="mb-4 text-xs uppercase tracking-[0.18em] opacity-60">
                          Technologies
                        </p>

                        <ul className="flex flex-wrap gap-2">
                          {p.tags.map((tag) => (
                            <li
                              key={tag}
                              className="rounded-full border border-current/25 px-3 py-2 text-xs sm:text-sm"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Projects;
