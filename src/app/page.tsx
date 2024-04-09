import Image from "next/image";
import Hero from "./components/Home/Hero/Hero";
import About from "./components/Home/About/About";
import HowTo from "./components/Home/HowTo/HowTo";
import Start from "./components/Home/Start/Start";
import Footer from "./components/Home/Footer/Footer";
import Header from "./components/Home/Header/Header";

export default function Home() {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <HowTo />
      <Start />
      <Footer />
    </div>
  );
}
