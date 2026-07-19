import { Navbar } from "./components/layout/Navbar.jsx";
import { Footer } from "./components/layout/Footer.jsx";
import { Hero } from "./components/sections/Hero.jsx";
import { Projects } from "./components/sections/Projects.jsx";
import { About } from "./components/sections/About.jsx";
import { Skills } from "./components/sections/Skills.jsx";
import { Journey } from "./components/sections/Journey.jsx";
import { Languages } from "./components/sections/Languages.jsx";
import { Contact } from "./components/sections/Contact.jsx";

export default function App() {
  return (
    <div id="top">
      <Navbar />
      <main id="main">
        <Hero />
        <Projects />
        <About />
        <Skills />
        <Journey />
        <Languages />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
