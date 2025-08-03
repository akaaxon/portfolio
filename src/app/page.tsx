import HeroAndNext from "@/components/HeroAndNext";
import MaskedRevealSection from "@/components/Hook";

import Menu from "@/components/Menu";
export default function Home() {
  return (
    <>
   <link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Playwrite+AU+QLD:wght@100..400&display=swap" rel="stylesheet" />
      <Menu />
      <HeroAndNext />
      <MaskedRevealSection/>
    </>
  );
}