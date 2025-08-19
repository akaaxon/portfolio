'use client';

import Image from "next/image";
import Pic1 from '../../public/me-removebg-preview.png'; // (Unused? consider removing)
import AboutPic from '../../public/laptopp.jpg';
import { useEffect, useRef } from "react";
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { Brush, Laptop, Zap, ToolCase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function HeroAndNext() {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    // Lenis smooth scroll setup
    const lenis = new Lenis({
      lerp: 0.08,
    });
    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    // Animate heading chars with SplitType
    const heading = container.current?.querySelector("h1");
    const paragraph = container.current?.querySelector("p.animated-paragraph");

    if (heading) {
      const split = new SplitType(heading, { types: 'chars', tagName: 'span' });
      gsap.set(split.chars, { opacity: 0, y: 20 });
      gsap.to(split.chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.099,
      });
    }

    if (paragraph) {
      gsap.fromTo(
        paragraph,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" }
      );
    }

    // Section1 scale & rotation scroll animation
    const section1 = container.current?.querySelector(".section1");
    if (section1) {
      gsap.to(section1, {
        scrollTrigger: {
          trigger: section1,
          start: "top top",
          end: "bottom 25%",
          scrub: true,
        },
        scale: 0.65,
        rotation: -20,
        transformOrigin: "center center",
        ease: "none",
      });
    }

    // Section2 animations: scale/rotation + image & content entrance
    const section2 = container.current?.querySelector(".section2");
    const image = section2?.querySelector(".image");
    const content = section2?.querySelector(".content");

    if (section2 && image && content) {
  // Timeline for section2 scale & rotation only
  gsap.timeline({
    scrollTrigger: {
      trigger: section2,
      start: "top 70%",
      end: "center 55%",
      scrub: true,
      markers: false,
    },
  }).fromTo(
    section2,
    { scale: 0.65, rotation: -20 },
    { scale: 1, rotation: 0, ease: "none" }
  );

  // Separate timeline for image & content fade + slide in
  gsap.timeline({
    scrollTrigger: {
      trigger: section2,
      start: "center 70%",
      end: "center 55%",
      scrub: true,
      markers: false,
    },
  })
  .fromTo(
    image,
    { x: -100, opacity: 0, scale: 0.85 },
    { x: 0, opacity: 1, scale: 1, duration: 1 }
  )
  .fromTo(
    content,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
    "-=0.7"
  );
}


    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main
      ref={container}
      className="relative min-h-[200vh]"
      style={{ willChange: 'transform' }}
    >
      <Section1 />
      <Section2 />
    </main>
  );
}

const Section1 = () => {
  return (
    <section className="section1 sticky top-0 min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 sm:px-[8vw] gap-10 sm:gap-16 overflow-hidden mb-10">
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm scale-105"
        style={{ backgroundImage: "url('/noisee.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between w-full gap-8 sm:gap-16">
        <div className="flex-1 text-white text-center md:text-left">
          <h1 className="text-[clamp(1.75rem,5vw,3.5rem)] font-bold mb-3 leading-tight">
            Hi, I'm <span className="text-purple-800">Khodor Wahab,</span>
          </h1>
          <h2 className="text-lg sm:text-xl font-medium mb-4">Web and Mobile Developer</h2>
          <p className="mb-6 sm:mb-8 italic leading-relaxed text-sm sm:text-base animated-paragraph">
            Expert in secure web development with a focus on robust, maintainable code.
            Dedicated to delivering precise user interfaces and leveraging data insights to drive informed solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

const Section2 = () => {
  return (
    <section className="section2 overflow-hidden relative min-h-screen flex flex-col-reverse md:flex-row items-center justify-center px-4 sm:px-6 md:px-24 py-12 md:py-16 bg-gradient-to-r from-black via-black to-purple-800 font-extrabold text-white gap-10 sm:gap-12">
      {/* Content */}
      <div className="content w-full md:w-1/2 max-w-xl md:pl-12 text-center md:text-left">
        <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6 tracking-tight leading-tight">
          About Me
        </h2>
        <p className="mb-3 sm:mb-4 text-sm sm:text-lg leading-relaxed text-gray-300">
          I am a full-stack developer dedicated to delivering visually refined and highly performant web applications. I emphasize precision
          and meticulous attention to detail across both frontend and backend development to create robust and scalable solutions.
        </p>
        <p className="mb-6 sm:mb-8 text-sm sm:text-lg leading-relaxed text-gray-300">
          I specialize in NextJS, GSAP animations, and modern UI/UX principles to craft delightful user experiences.
        </p>

        <ul className="grid grid-cols-2 gap-x-4 gap-y-3 sm:gap-x-6 sm:gap-y-4 text-sm justify-center md:justify-start">
          {[
            { icon: <Brush className="text-purple-600" size={20} />, label: "Creative UI Design" },
            { icon: <Laptop className="text-purple-600" size={20} />, label: "Secure User Experience" },
            { icon: <Zap className="text-purple-600" size={20} />, label: "Fast & Responsive Websites" },
            { icon: <ToolCase className="text-purple-600" size={20} />, label: "NextJS Developer" },
          ].map(({ icon, label }, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 font-medium text-gray-100 hover:text-purple-100 transition-colors"
              tabIndex={0}
              aria-label={label}
            >
              {icon}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Image */}
      <div className="image w-full relative max-w-[90vw] sm:max-w-md md:w-1/2 rounded-lg overflow-hidden shadow-2xl">
        <Image
          src={AboutPic}
          alt="Laptop Coding"
          className="object-cover relative w-full h-full rounded-lg"
          priority
          sizes="(max-width: 768px) 100vw, 90vw"
        />
      </div>
    </section>
  );
};
