'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import hookbg from '../../public/hookback.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function MaskedRevealSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tinyImagesRef = useRef<HTMLDivElement>(null);
  const overlapTextRef = useRef<HTMLDivElement>(null);
  const fullscreenRef = useRef<HTMLDivElement>(null);
  const maskCircleRef = useRef<SVGCircleElement>(null);
  const maskRectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
  if (
    !sectionRef.current ||
    !tinyImagesRef.current ||
    !fullscreenRef.current ||
    !maskCircleRef.current ||
    !maskRectRef.current ||
    !overlapTextRef.current
  ) return;

  // Initial states: fullscreen hidden, mask radius zero
  gsap.set(maskCircleRef.current, { attr: { r: 0 } });
  gsap.set(maskRectRef.current, { opacity: 0 });
  gsap.set(fullscreenRef.current, { opacity: 0 });  // <-- Set to 0 initially!

  gsap.set(tinyImagesRef.current, { opacity: 1, filter: "blur(0.05px)", position: "relative" });
  gsap.set(maskCircleRef.current, { attr: { r: 0 }, force3D: true }); 
  gsap.set(overlapTextRef.current, {
    opacity: 1,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 50,
    pointerEvents: "none",
    textAlign: "center",
    width: "100%",
    filter: "none",
    userSelect: "none",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "bottom 90%",
      end: "+=300vh",
      scrub: true,
      pin: true,
      anticipatePin: 1,
      markers: false,
    },
  });

  // Fade in mask overlay
  tl.to(maskRectRef.current, { opacity: 0.85, ease: "power1.out", duration: 3 }, 0);

  // Expand mask radius AND fade in fullscreen content simultaneously
  tl.to(maskCircleRef.current, { attr: { r: 1600 }, ease: "power2.inOut", duration: 3 }, 0);
  tl.to(fullscreenRef.current, { opacity: 1, ease: "power1.out", duration: 3 }, 0);

  // Fade out tiny images and overlap text fast
  tl.to([tinyImagesRef.current, overlapTextRef.current], { opacity: 0, ease: "power1.out", duration: 0.2 }, 0);

  return () => {
    ScrollTrigger.getAll().forEach(st => st.kill());
  };
}, []);

  // Bigger images (80x80), container fills about 70% width and height
  const tinyImageUrls = [
    "https://picsum.photos/id/1015/80/80",
    "https://picsum.photos/id/1016/80/80",
    "https://picsum.photos/id/1018/80/80",
    "https://picsum.photos/id/1020/80/80",
    "https://picsum.photos/id/1024/80/80",
    "https://picsum.photos/id/1027/80/80",
    "https://picsum.photos/id/1035/80/80",
    "https://picsum.photos/id/1037/80/80",
    "https://picsum.photos/id/1042/80/80",
  ];

  // Adjust positions so images are nicely spread in a bigger container
  const positions = [
    { top: "12%", left: "18%" },
    { top: "25%", left: "82%" },
    { top: "38%", left: "7%" },
    { top: "45%", left: "88%" },
    { top: "62%", left: "23%" },
    { top: "68%", left: "78%" },
    { top: "83%", left: "12%" },
    { top: "87%", left: "82%" },
    { top: "53%", left: "50%" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Bigger Tiny Images container */}
      <div
        ref={tinyImagesRef}
        className="absolute top-1/2 left-1/2 w-[70vw] h-[50vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none
                   sm:w-[85vw] sm:h-[45vh]
                   xs:w-[90vw] xs:h-[40vh]"
      >
        {tinyImageUrls.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Tiny image ${i + 1}`}
            className="absolute rounded-lg shadow-md"
            style={{
              width: "80px",
              height: "80px",
              objectFit: "cover",
              top: positions[i].top,
              left: positions[i].left,
              filter: "blur(0.05px)",
              opacity: 0.85,
              userSelect: "none",
            }}
            loading="lazy"
          />
        ))}
      </div>

      {/* Larger overlapping Text */}
      <div
        ref={overlapTextRef}
        className="pointer-events-none fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
                   max-w-[600px] w-[90%] px-2 text-center text-white"
        style={{ filter: "none", userSelect: "none", lineHeight: 1.1 }}
      >
        <h2 className="text-6xl sm:text-7xl xs:text-4xl font-extrabold drop-shadow-xl leading-tight">
          While Everyone is Normal...
        </h2>

      </div>

      {/* SVG Mask Overlay */}
     <svg
  className="pointer-events-none absolute inset-0 w-full h-full"
  xmlns="http://www.w3.org/2000/svg"
>
  <defs>
    <mask id="circle-mask">
      <rect width="100%" height="100%" fill="black" />
      <circle
  ref={maskCircleRef}
  cx="50%"
  cy="50%"
  r="0"
  fill="white"
  stroke="white"
  strokeWidth="1"
  style={{
    willChange: "r, transform",
    transform: "translate3d(0,0,0)",
    transformOrigin: "center center",
  }}
/>
  
    </mask>
  </defs>
  <rect
    ref={maskRectRef}
    width="100%"
    height="100%"
    fill="black"
    mask="url(#circle-mask)"
    opacity={0}
  />
</svg>


      {/* Fullscreen Reveal Content WITH mask applied */}
      <div
        ref={fullscreenRef}
        className="absolute inset-0 flex flex-col items-center justify-center  text-white text-center px-6 pointer-events-none"
        style={{
          willChange: "mask",
          mask: "url(#circle-mask)",
          WebkitMask: "url(#circle-mask)",
          opacity: 1,
        }}
      >
        <Image
          src={hookbg}
          alt="Fullscreen background"
          className="absolute inset-0 w-full h-screen object-cover -z-50"
          loading="lazy"
        />
        <h1 className="text-6xl sm:text-7xl xs:text-4xl font-extrabold mb-6 drop-shadow-xl">
          Why Wouldn't You Want To Stand Out?
        </h1>
        <p className="max-w-2xl text-xl sm:text-lg xs:text-base drop-shadow-lg font-extrabold bg-black padding-4 rounded">
          We can build something truly unique together that makes jaws DROP.
        </p>
      </div>
    </section>
  );
}
