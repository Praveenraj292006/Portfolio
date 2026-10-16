import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "About", href: "#about", },
    { name: "Works", href: "#projects",  },
    { name: "Skills", href: "#skills",  },
  ];

  return (
    <nav className="relative z-50 w-full bg-background px-5 py-5 text-text sm:px-8 lg:px-12">

      <div className="flex items-center justify-between  pb-5">

        {/* Logo / Name */}
        <a
          href="#home"
          className="group flex items-center gap-3"
          aria-label="Praveenraj home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-y-primary text-xl font-black text-text transition-all duration-300 group-hover:rotate-12 group-hover:text-[2vw]">
            P
          </span>

          <div className="flex flex-col font-[Montserrat] uppercase leading-none">
            <span className="text-base font-black tracking-tight sm:text-lg">
              Praveenraj
            </span>
            <span className="mt-1 text-[9px] font-medium tracking-[0.25em] opacity-60">
              Creative Developer
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden  items-center gap-8 md:flex lg:gap-12">
          {links.map((link) => (
            <a
              key={link.number}
              href={link.href}
              className="group flex items-center gap-2 font-[Montserrat] text-xs font-bold uppercase tracking-widest"
            >
              
              <span className="relative py-2 group-hover:text-[2vw]  group-hover:-translate-y-1 transition-all duration-300">
                {link.name}
                <span className="absolute bottom-0 left-0 h-[3px] w-0 bg-y-primary transition-all duration-300 group-hover:w-full " />
              </span>
            </a>
          ))}
        </div>

        {/* Contact CTA */}
        <button
          href="#contact"
          className="hidden items-center gap-3 rounded-full border-3 border-text/30 px-5 py-3 font-[Montserrat] text-[11px] font-bold uppercase tracking-wider transition-all duration-300 hover:border-y-primary hover:bg-y-primary hover:bg-black md:flex"
        >
          Let's Talk
          
        </button>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-y-primary text-2xl font-bold text-black transition-transform hover:rotate-6 md:hidden"
        >
          {menuOpen ? "×" : "+"}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`grid transition-all duration-300 md:hidden ${
          menuOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col py-4">
            {links.map((link) => (
              <a
                key={link.number}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between border-b border-text/15 py-4 font-[Montserrat] text-xl font-bold uppercase"
              >
                <span>{link.name}</span>
                <span className="text-sm text-y-primary">
                  {link.number} ↗
                </span>
              </a>
            ))}

            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-4 flex items-center justify-between rounded-xl bg-y-primary p-4 font-[Montserrat] text-sm font-bold uppercase text-black"
            >
              Let's Talk
              <span className="text-xl">↗</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
