"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Playwrite_AU_QLD } from "next/font/google";
import { Instagram, LucideInstagram, X } from "lucide-react";

const playwrite = Playwrite_AU_QLD({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const menuLinks = [
  { path: "/", label: "Home" },
  { path: "/contact-us", label: "Contact Us" },
  { path: "/clients", label: "Our Clients" },
];

// New MenuLink component with letter-by-letter hover animation
const MenuLink = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick: () => void;
}) => {
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  lettersRef.current = [];

  const addLetterRef = (el: HTMLSpanElement | null) => {
    if (el && !lettersRef.current.includes(el)) lettersRef.current.push(el);
  };

  const onMouseEnter = () => {
    gsap.to(lettersRef.current, {
      color: "#8e189e", // Tailwind blue-500
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out",
    });
  };

  const onMouseLeave = () => {
    gsap.to(lettersRef.current, {
      color: "#ffffff", // original white color
      duration: 0.3,
      stagger: 0.05,
      ease: "power1.out",
    });
  };

  return (
    <div
      className="menu-link-item-holder cursor-pointer inline-block"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link href={href} className="no-underline">
        {label.split("").map((char, i) => (
          <span
            key={i}
            ref={addLetterRef}
            style={{ display: "inline-block", color: "white" }}
          >
            {char}
          </span>
        ))}
      </Link>
    </div>
  );
};

const Menu = () => {
  const container = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    if (!container.current) return;

    tl.current = gsap.timeline({ paused: true });

    tl.current
      .fromTo(
        container.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1,
          ease: "expo.inOut",
        }
      )
      .from(
        ".menu-link-item-holder",
        {
          y: 100,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "expo.out",
        },
        "-=0.6"
      )
      .from(
        ".menu-footer",
        {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.5"
      )
      .eventCallback("onReverseComplete", () => {
        setIsMenuOpen(false);
      });
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const openMenu = () => {
    setIsMenuOpen(true);
    setTimeout(() => tl.current?.play(), 0);
  };

  const closeMenu = () => {
    tl.current?.reverse();
  };

  return (
    <>
      {!isMenuOpen && (
        <div
          className={`fixed top-8 left-0 w-full px-8 flex justify-between items-center z-50 transition-colors duration-300`}
        >
         <button
  className="text-xl font-semibold text-white hover:cursor-pointer"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
>
  Khodor Devs
</button>

          <div className="cursor-pointer" onClick={openMenu}>
            <p className="text-md text-white">Menu</p>
          </div>
        </div>
      )}

      <div
        ref={container}
        className={`fixed inset-0 w-screen h-screen hide-scrollbar bg-white p-8 flex flex-col justify-between z-40 transition-opacity duration-300 ${
          !isMenuOpen ? "invisible pointer-events-none" : "visible"
        }`}
        style={{
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          backgroundImage: "url('/menubg.jpg')",
          backgroundSize: "cover",
         
        }}
      >
       <div className="flex justify-end items-center text-white">
  <div className="cursor-pointer" onClick={closeMenu}>
    <p className="text-lg">Close</p>
  </div>
</div>


        <div
          className={`flex flex-col md:flex-row text-5xl justify-center flex-grow mt-25 ${playwrite.className}  hover:font-sans text-white`}
        >
          <div className="flex flex-col gap-10 font-semibold">
            {menuLinks.map((link, index) => (
              <MenuLink
                key={index}
                label={link.label}
                href={link.path}
                onClick={closeMenu}
              />
            ))}
          </div>
        </div>

       

...

<div className="mt-12 text-right text-lg text-white menu-footer flex flex-col items-end gap-4">
  <a
    href="mailto:your.email@example.com"
    className="hover:underline hover:text-purple-700"
  >
    khodor@bytaris.com
  </a>

  <div className="flex gap-6">
    <a
      href="https://twitter.com/yourhandle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Twitter"
      className="hover:text-purple-700 transition"
    >
      <X size={24} />
    </a>

    <a
      href="https://linkedin.com/in/yourhandle"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
      className="hover:text-purple-700 transition"
    >
      <Instagram size={24} />
    </a>
  </div>
</div>

      </div>
    </>
  );
};

export default Menu;
