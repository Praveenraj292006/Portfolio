
import Hero from "../Components/Hero";
import About from "../Components/About";
import Projects from "../Components/Projects";
import Skills from "../Components/Skills";
import Contact from "../Components/Contact";
import Footer from "../Components/Footer";


const Homepage = () => {
  return (
    <main className="w-full">

      <div id="home">
        <Hero />
      </div>

      <About />

      <section id="skills">
        <Skills />
      </section>

      <Projects />

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  );
};

export default Homepage;