const About = () => {
  return (
    <section
      id="about"
      className="relative z-10 min-h-[60vh] w-full overflow-hidden bg-[#EEEEEE] px-4 py-16 text-background sm:px-8 sm:py-16 lg:px-12 lg:py-25"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-5 md:gap-6 lg:gap-10">

        {/* About Me heading card */}
        <div className="w-full md:col-span-2">
          <div className="flex min-h-[180px] items-center justify-center border-2 border-background p-2 sm:min-h-[240px] sm:p-6 lg:min-h-[320px] lg:p-10">
            <div className="flex min-h-[150px] w-full items-center justify-center border-4 border-background sm:min-h-[200px] lg:min-h-[280px]">
              <h1 className="whitespace-nowrap font-[Bebas_Neue] text-[clamp(3.5rem,10vw,8rem)] uppercase leading-[0.85] tracking-tight">
                About <br/>  Me
              </h1>
            </div>
          </div>
        </div>

        {/* About content */}
        <div className="flex flex-col justify-center md:col-span-3 md:px-2 lg:px-8">

          <p className="font-[Bebas_Neue] text-[clamp(2rem,5vw,4.5rem)] font-semibold uppercase lg:leading-[0.95] text-amber-500">
            More than just code.
          </p>

          <div className="mt-4 mb-5 space-y-4 text-sm lg:leading-relaxed text-background sm:mt-8 sm:space-y-5 sm:text-base lg:text-lg font-semibold">
            <p>
              I'm Praveenraj, a full-stack developer who enjoys turning ideas
              into digital experiences. I work across frontend, backend, and
              databases to build products that are functional, intuitive, and
              visually distinctive.
            </p>

            <p>
              I'm fascinated by the intersection of technology, design, and
              artificial intelligence. Whether it's crafting interactive web
              experiences, building robust backend systems, or experimenting
              with AI-powered applications, I enjoy exploring how technology
              can solve real problems in creative ways.
            </p>

            <p>
              For me, development isn't just about making things work. It's
              about understanding the problem, paying attention to the details,
              and creating something people genuinely enjoy using.
            </p>

            <p className="font-semibold">
              I don't just build websites. I build experiences, experiment
              with ideas, and bring concepts to life.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
