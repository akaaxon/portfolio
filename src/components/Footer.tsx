'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "center 90%",
            end: "bottom 45%",
            toggleActions: "play none none none",
            scrub: 1,
          },
        }
      );
    }
  }, []);

  return (
    <section className="w-full h-screen bg-purple-700 relative overflow-hidden flex items-center justify-center px-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-7xl gap-10">
        {/* Button */}
        <button
          className="
            relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-black bg-black
            text-white font-bold text-xl md:text-2xl
            overflow-hidden
            transition-colors duration-300 ease-in-out
            before:absolute before:inset-0 before:bg-purple-700 before:rounded-full
            before:scale-0 before:origin-center
            before:transition-transform before:duration-[1200ms] before:ease-in-out
            before:z-0
            hover:before:scale-100
          "
        >
          <span className="relative z-10 italic">➢ Contact me</span>
        </button>

        {/* Text */}
        <div
          ref={textRef}
          className="text-black text-4xl md:text-6xl lg:text-8xl font-extrabold text-center md:text-right leading-tight max-w-xl"
        >
          Let’s build something truly unique together.
        </div>
      </div>
    </section>
  );
}
