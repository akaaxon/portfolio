'use client';

import Image from "next/image";
import hook1 from '../../public/blockk.jpeg';
import hook2 from '../../public/hookback.jpg';
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";


export default function Hook() {
  gsap.registerPlugin(ScrollTrigger); 

  const containerRef = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end:  "+=1300vh",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    // First image reveal
    tl.fromTo("#img-container", {
      clipPath: "polygon(40% 20%, 60% 20%, 60% 80%, 40% 80%)",
      scale: 1.4,
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      ease: "power2.out",
      duration: 3,
    });

    // First text reveal
    tl.fromTo(".text1-letter", {
      y: "100%",
      opacity: 0,
    }, {
      y: "0%",
      opacity: 1,
      stagger: 0.2,
      ease: "sine.out",
      duration: 1.5,
    }, "<+=0.2");

    // Second image reveal
    tl.fromTo("#second-img-container", {
      clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      scale: 1.4,
    }, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      ease: "power2.out",
      duration: 10,
    }, ">+=1");


    // Animate text2 as a block after while revealing the 2nd image
    tl.fromTo(text2Ref.current, {
      opacity: 0,
      y: 50,
    }, {
      opacity: 1,
      y: 0,
      duration: 6,
      ease: "power3.out",
    }, "<+=0.6");

  }, []);

  const text1 = "Instead of settling for what everyone else is doing...";
  const text2 = "I create something that is uniquely yours.";

  return (
    <div
      ref={containerRef}
      className="bg-black h-screen overflow-hidden relative flex flex-col items-center justify-center"
    >
      {/* First Image Container */}
      <div id="img-container" className="w-full h-full absolute inset-0 flex justify-center z-0">
        <Image
          src={hook1}
          alt="Background"
          className="object-cover object-center w-full h-full"
        />
        {/* Dim Overlay */}
  <div className="absolute inset-0 bg-black/40 z-30" />
      </div>
      
{/* First Text */}
<div className="absolute inset-0 z-10 flex justify-center items-center px-4">
  <h1 className="overflow-hidden text-center text-white font-bold flex flex-wrap justify-center gap-1">
    {text1.split(" ").map((word, wordIndex) => (
      <span key={wordIndex} className="whitespace-nowrap flex">
        {word.split("").map((char, charIndex) => (
          <span
            key={charIndex}
            className="text1-letter text-[clamp(3rem,5vw,2.5rem)] opacity-0 translate-y-full"
          >
            {char}
          </span>
        ))}
        {/* Add space between words manually */}
        <span className="w-2" />
      </span>
    ))}
  </h1>
</div>


      {/* Second Image Container */}
     <div
  id="second-img-container"
  className="w-full h-full absolute inset-0 flex justify-center items-center z-20"
>
  {/* Background Image */}
  <Image
    src={hook2}
    alt="Background 2"
    className="object-cover object-center w-full h-full"
  />

  {/* Dim Overlay */}
  <div className="absolute inset-0 bg-black/40 z-30" />

  {/* Centered Text */}
  <div className="absolute inset-0 z-40 flex flex-col justify-center items-center">
    <h1
      ref={text2Ref}
      className={`text-center font-bold text-[3rem] italic text-white opacity-0 translate-y-10 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]`}
    >
      {text2}
    </h1>
  </div>
</div>

    </div>
  );
}
