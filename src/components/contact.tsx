'use client';

import { useEffect, useLayoutEffect, useRef, useState, FormEvent } from 'react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';

function LoadingScreen({ onLoaded }: { onLoaded: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to('.loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: onLoaded,
      });
    }, 1500);
    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div
      className="loader fixed inset-0 z-50 flex items-center justify-center bg-black text-purple-600 font-extrabold text-4xl select-none"
      style={{ willChange: 'opacity' }}
    >
      Loading...
    </div>
  );
}

export default function ContactPageSplitTheme() {
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLFormElement | null>(null);
  const leftTitleRef = useRef<HTMLHeadingElement | null>(null);
  const leftParaRef = useRef<HTMLParagraphElement | null>(null);

  // Hide elements initially to prevent flash
  useLayoutEffect(() => {
    if (leftRef.current && rightRef.current && leftTitleRef.current && leftParaRef.current) {
      gsap.set(leftRef.current, { opacity: 0, x: -50 });
      gsap.set([leftTitleRef.current, leftParaRef.current], { opacity: 0, y: 30 });
      gsap.set(rightRef.current, { opacity: 0, x: 50 });
    }
  }, [loading]);

  // Animate in after loading
  useEffect(() => {
    if (!loading && leftRef.current && rightRef.current && leftTitleRef.current && leftParaRef.current) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
      tl.to(leftRef.current, { opacity: 1, x: 0 })
        .to([leftTitleRef.current, leftParaRef.current], { opacity: 1, y: 0, stagger: 0.2 }, '-=0.7')
        .to(rightRef.current, { opacity: 1, x: 0 }, '-=1');
    }
  }, [loading]);

  const handleLoaded = () => setLoading(false);

  // EmailJS send handler
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;

    setSending(true);
    const form = e.currentTarget;

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

    emailjs
      .sendForm(serviceId, templateId, form, publicKey)
      .then(() => {
        alert('Message sent successfully! I will get back to you shortly.');
        form.reset();
      })
      .catch((err) => {
        console.error('EmailJS error:', err);
        const errMsg = err && (err.text || err.message || JSON.stringify(err)) || 'Unknown error';
        alert(`Oops! Something went wrong: ${errMsg}`);
      })
      .finally(() => setSending(false));
  };

  if (loading) return <LoadingScreen onLoaded={handleLoaded} />;

  return (
    <main className="min-h-screen w-screen flex flex-col sm:flex-row items-center justify-center">
      {/* Left Section */}
      <section
        ref={leftRef}
        className="w-full sm:w-1/2 h-screen p-16 bg-black text-purple-500 flex flex-col justify-center text-center sm:text-left"
      >
        <h2 ref={leftTitleRef} className="text-5xl font-extrabold mb-6 leading-tight">
          Let&apos;s Build Something <br /> Amazing Together
        </h2>
        <p ref={leftParaRef} className="text-purple-300 text-xl max-w-lg mx-auto sm:mx-0 leading-relaxed">
          Got a project or idea in mind? Reach out and let&apos;s make it happen. Whether it&apos;s a website, app, or a
          creative journey, I&apos;m here to help you bring it to life.
        </p>
      </section>

      {/* Right Section */}
      <section
        className="
          w-full sm:w-1/2 h-screen p-12
          bg-purple-800 bg-opacity-70
          backdrop-blur-md
          rounded-xl
          shadow-[0_0_30px_rgba(128,90,213,0.5)]
          border-4 border-transparent
          relative
          flex flex-col justify-center
          overflow-hidden
        "
      >
        <div
          className="
            pointer-events-none absolute inset-0 rounded-xl
            bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400
            opacity-50 animate-gradient-x
            blur-2xl
            -z-10
          "
          aria-hidden="true"
        />

        <h3 className="text-4xl font-extrabold mb-10 text-center text-black drop-shadow-md">Contact Me</h3>

        <form
          ref={rightRef}
          className="space-y-8 max-w-md mx-auto w-full"
          onSubmit={handleSubmit}
          noValidate
        >
          {/* Name and Email Fields */}
          {['name', 'email'].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-2 text-black text-sm font-semibold select-none"
              >
                Your {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                id={field}
                name={field}
                type={field === 'email' ? 'email' : 'text'}
                required
                className="
                  w-full
                  bg-purple-600 bg-opacity-80
                  border border-purple-700
                  rounded-lg
                  px-6 py-4
                  text-black
                  focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                  transition
                  shadow-md
                "
                disabled={sending}
              />
            </div>
          ))}

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-black text-sm font-semibold select-none"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="
                w-full
                bg-purple-600 bg-opacity-80
                border border-purple-700
                rounded-lg
                px-6 py-4
                text-black
                focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                resize-none
                shadow-md
                transition
              "
              disabled={sending}
            />
          </div>

          <button
            type="submit"
            disabled={sending}
            className="
              w-full
              bg-black
              text-purple-400
              font-bold
              py-4
              rounded-lg
              shadow-lg
              hover:text-purple-600 hover:shadow-[0_0_15px_rgba(128,90,213,0.7)]
              transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            {sending ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </section>
    </main>
  );
}
