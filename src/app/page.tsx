import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Career } from "@/components/sections/career";
import { ComingSoon } from "@/components/sections/coming-soon";
import { Connect } from "@/components/sections/connect";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Partnerships } from "@/components/sections/partnerships";
import { Platforms } from "@/components/sections/platforms";
import { Projects } from "@/components/sections/projects";
import { Snapshot } from "@/components/sections/snapshot";
import { SocialWork } from "@/components/sections/social-work";
import { Ventures } from "@/components/sections/ventures";

export default function Page() {
  return (
    <>
      <Hero />
      <Snapshot />
      <About />
      <SocialWork />
      <Career />
      <Ventures />
      <Projects />
      <Achievements />
      <Partnerships />
      <Gallery />
      <Platforms />
      <ComingSoon />
      <Connect />
    </>
  );
}
