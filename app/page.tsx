import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Problems } from "@/components/sections/Problems";
import { Process } from "@/components/sections/Process";
import { Expertise } from "@/components/sections/Expertise";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Problems />
      <Process />
      <Expertise />
      <Contact />
    </>
  );
}
