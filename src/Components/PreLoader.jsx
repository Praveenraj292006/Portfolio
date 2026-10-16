import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// ✏️ Put Fav_icon_portfolio.svg in your /public folder
const LOGO = "/Fav_icon_portfolio.svg";
const NAME = "Praveenraj";
const ROLE = "Fullstack Developer";

const Preloader = ({ onComplete }) => {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const MIN = reduce ? 600 : 2200; // shortest time the loader stays up (ms)
    const MAX = 8000; // give up waiting for the page after this long
    let loaded = document.readyState === "complete";
    const onLoad = () => (loaded = true);
    window.addEventListener("load", onLoad);

    const start = performance.now();
    let p = 0;
    let raf;
    let timer;

    const tick = (now) => {
      const t = now - start;
      const ready = (loaded && t >= MIN) || t >= MAX;
      // Eases toward 90% while loading, then finishes once the page is ready
      const target = ready ? 100 : Math.min(90, (t / MIN) * 90);
      p += (target - p) * 0.1;
      if (ready && p > 99.4) p = 100;
      setProgress(Math.round(p));

      if (p >= 100) {
        timer = setTimeout(() => setDone(true), 450);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("load", onLoad);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        onComplete?.();
      }}
    >
      {!done && (
        <motion.div
          key="preloader"
          role="status"
          aria-live="polite"
          aria-label={`Loading ${progress} percent`}
          className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-background px-5 py-6 text-text-primary sm:px-8 sm:py-8 lg:px-12"
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.4 } }
              : { y: "-100%", transition: { duration: 1.1, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          {/* Top bar */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-between text-sm opacity-70"
          >
            <span>{NAME}</span>
            <span>{ROLE}</span>
          </motion.div>

          {/* Logo that fills up with progress */}
          <div className="grid flex-1 place-items-center">
            <motion.div
              initial={reduce ? false : { scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: -3 }}
              transition={{ type: "spring", stiffness: 160, damping: 16, delay: 0.1 }}
              className="relative size-32 sm:size-44"
            >
              {/* Dim base */}
              <img
                src={LOGO}
                alt=""
                className="absolute inset-0 size-full opacity-15 grayscale"
                draggable={false}
              />
              {/* Full-color logo revealed from the bottom up */}
              <img
                src={LOGO}
                alt=""
                className="absolute inset-0 size-full shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
                draggable={false}
              />
            </motion.div>
          </div>

          {/* Bottom: line, label, counter */}
          <div>
            <div className="h-px w-full bg-neutral-500/40">
              <div
                className="h-full origin-left bg-amber-300"
                style={{ transform: `scaleX(${progress / 100})` }}
              />
            </div>

            <div className="flex items-end justify-between pt-4">
              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.6 }}
                className="pb-2 text-sm"
              >
                Portfolio {new Date().getFullYear()}
              </motion.p>

              <p
                aria-hidden="true"
                className="font-[Bebas_Neue] text-[clamp(6rem,20vw,16rem)] font-bold leading-[0.8] tabular-nums text-amber-200"
              >
                {String(progress).padStart(3, "0")}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;