import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

// ✏️ Replace with your real details
const EMAIL = "praveenraj292006@gmail.com";
const SOCIALS = [
  { name: "GitHub", Icon: FaGithub, href: "https://github.com/Praveenraj292006", color: "#111111" },
  { name: "LinkedIn", Icon: FaLinkedinIn, href: "www.linkedin.com/in/praveenraj-m-63609932b", color: "#0A66C2" },
  { name: "Instagram", Icon: FaInstagram, href: "https://www.instagram.com/praveenraj_m.06/", color: "#E4405F" },
  { name: "WhatsApp", Icon: FaWhatsapp, href: "https://wa.me/918610254207", color: "#25D366" },
];
const TOPICS = ["a project", "a job", "a collaboration", "just saying hi"];
const TILTS = [-10, 5, -5, 8];

const underline =
  "border-0 border-b-2 border-neutral-500/50 bg-transparent px-1 text-black outline-none transition-colors placeholder:text-black/30 focus:border-black";

const Contact = () => {
  const reduce = useReducedMotion();
  const headRef = useRef(null);
  const headInView = useInView(headRef, { once: true, amount: 0.6 });

  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0], message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Enter your name so I know who to reply to.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email, like name@example.com.";
    if (form.message.trim().length < 10) er.message = "Write at least a sentence so I have some context.";
    return er;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    /*
      This opens the visitor's email app with the message filled in, so it
      works with no backend. To send directly from the site instead, replace
      this block with an EmailJS or Formspree request.
    */
    const subject = encodeURIComponent(`Portfolio: ${form.name} wants to talk about ${form.topic}`);
    const body = encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setTimeout(() => setStatus("sent"), 600);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked: the address is still visible to copy by hand */
    }
  };

  const reset = () => {
    setForm({ name: "", email: "", topic: TOPICS[0], message: "" });
    setStatus("idle");
  };

  return (
    <section className="relative min-w-screen overflow-hidden bg-background px-5 py-12 text-text-primary sm:px-8 sm:py-20 lg:px-12">
      {/* Heading */}
      <h2
        ref={headRef}
        aria-label="Let's talk"
        className="overflow-hidden pb-8 font-[Bebas_Neue] text-[clamp(4.5rem,18vw,16rem)] font-bold uppercase leading-[0.85]"
      >
        {"Let's talk".split("").map((c, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="inline-block"
            initial={reduce ? false : { y: "110%" }}
            animate={headInView ? { y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
          >
            {c === " " ? "\u00A0" : c}
          </motion.span>
        ))}
      </h2>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        {/* Left: direct contact */}
        <div className="flex flex-col gap-8">
          <p className="max-w-md text-lg leading-relaxed">
            Have an idea, a role, or a project that needs building? Send a message
            and I'll reply by email.
          </p>

          <div>
            <p className="mb-2 text-sm opacity-60">Prefer email?</p>
            <button
              type="button"
              onClick={copyEmail}
              className="group relative cursor-pointer text-left font-[Bebas_Neue] text-[clamp(1.8rem,4vw,3rem)] leading-none text-amber-200 focus-visible:outline-2 focus-visible:outline-offset-4"
              aria-label={`Copy email address ${EMAIL}`}
            >
              {EMAIL}
              <span className="mt-2 block h-0.5 origin-left scale-x-0 bg-amber-300 transition-transform duration-500 group-hover:scale-x-100" />
            </button>
            <p className="mt-2 h-5 text-sm text-amber-300" aria-live="polite">
              {copied ? "Email copied" : "Click to copy"}
            </p>
          </div>

          {/* Social stickers */}
          <ul className="flex flex-wrap gap-4">
            {SOCIALS.map(({ name, Icon, href, color }, i) => (
              <motion.li
                key={name}
                initial={reduce ? false : { scale: 0, rotate: TILTS[i] - 40 }}
                whileInView={{ scale: 1, rotate: TILTS[i] }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 14, delay: 0.2 + i * 0.1 }}
                whileHover={{ scale: 1.15, rotate: TILTS[i] + 8, y: -4 }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  title={name}
                  className=" relative  pt-5 flex gap-4 text-amber-300 "
                >
                  <Icon className="text-[4vw] sm:text-4xl" color={color} aria-hidden="true" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: fill-in-the-blank form on the cream board */}
        <div className="relative min-h-[460px] overflow-hidden rounded-[2.5rem] bg-cream p-6 text-black sm:rounded-[4rem] sm:p-10">
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
            {status !== "sent" ? (
              <motion.form
                key="form"
                onSubmit={onSubmit}
                noValidate
                exit={{ opacity: 0, y: -20, transition: { duration: 0.25 } }}
                className="relative z-10 flex flex-col gap-6 text-xl leading-[2.4] sm:text-2xl"
              >
                <p>
                  Hi Praveenraj, I'm{" "}
                  <input
                    type="text"
                    value={form.name}
                    onChange={set("name")}
                    placeholder="your name"
                    aria-label="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "err-name" : undefined}
                    className={`${underline} w-[11ch] sm:w-[14ch]`}
                  />{" "}
                  and I'd like to talk about
                </p>

                {/* Topic chips */}
                <div role="radiogroup" aria-label="What you'd like to talk about" className="flex flex-wrap gap-2 leading-normal">
                  {TOPICS.map((t) => {
                    const on = form.topic === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        onClick={() => setForm((f) => ({ ...f, topic: t }))}
                        className="relative cursor-pointer rounded-full border-2 border-black/80 px-4 py-1 text-base focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-lg"
                      >
                        {on && (
                          <motion.span
                            layoutId="topic-pill"
                            aria-hidden="true"
                            className="absolute inset-0 rounded-full bg-amber-300"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <span className="relative">{t}</span>
                      </button>
                    );
                  })}
                </div>

                <p>
                  You can reach me at{" "}
                  <input
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@email.com"
                    aria-label="Your email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    className={`${underline} w-full max-w-[20ch] sm:max-w-[24ch]`}
                  />
                  .
                </p>

                <label className="flex flex-col gap-1 leading-normal">
                  <span>Here's a bit more:</span>
                  <textarea
                    rows={4}
                    value={form.message}
                    onChange={set("message")}
                    placeholder="Tell me what you have in mind"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    className={`${underline} resize-none rounded-none text-lg leading-relaxed`}
                  />
                </label>

                {/* Errors: say what's wrong and how to fix it */}
                <div aria-live="polite" className="text-base leading-snug text-red-700">
                  {errors.name && <p id="err-name">{errors.name}</p>}
                  {errors.email && <p id="err-email">{errors.email}</p>}
                  {errors.message && <p id="err-message">{errors.message}</p>}
                </div>

                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={reduce ? undefined : { scale: 1.04, rotate: -1.5 }}
                  whileTap={{ scale: 0.96 }}
                  className="self-start cursor-pointer rounded-full bg-black px-8 py-3 font-[Bebas_Neue] text-3xl uppercase leading-none tracking-wide text-amber-200 disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {status === "sending" ? "Opening email…" : "Send message"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                key="sent"
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
                className="relative z-10 flex min-h-[380px] flex-col items-center justify-center gap-4 text-center"
                role="status"
              >
                <motion.div
                  initial={reduce ? false : { rotate: -40, scale: 0 }}
                  animate={{ rotate: -8, scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 12, delay: 0.15 }}
                  className="grid size-24 place-items-center rounded-[1.8rem] border-[5px] border-white bg-[#fbfaf7] text-5xl shadow-[0_4px_0_rgba(0,0,0,0.10),0_12px_22px_rgba(0,0,0,0.22)]"
                  aria-hidden="true"
                >
                  ✉️
                </motion.div>
                <p className="font-[Bebas_Neue] text-6xl uppercase leading-none">Message ready</p>
                <p className="max-w-sm text-lg">
                  Your email app should have opened with the message filled in. Press send there and I'll reply soon.
                </p>
                <button
                  type="button"
                  onClick={reset}
                  className="mt-2 cursor-pointer rounded-full border-2 border-black px-6 py-2 transition-opacity hover:opacity-60"
                >
                  Write another message
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Contact;