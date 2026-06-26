import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroProps {
  lenisRef: React.MutableRefObject<any>;
}

// Текст заголовка разбиваем заранее в JSX — React управляет DOM,
// GSAP только анимирует уже существующие элементы.
// Это устраняет баг дублирования букв в React StrictMode.
const HEADING = 'Сам Чай';

export default function Hero({ lenisRef }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    // Video fade in
    tl.fromTo(videoRef.current, { opacity: 0 }, { opacity: 1, duration: 0.8 });

    // Label
    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.3
    );

    // Анимация символов заголовка через querySelectorAll — React уже вставил их в DOM,
    // мы только анимируем, не трогая innerHTML
    if (headingRef.current) {
      const chars = headingRef.current.querySelectorAll<HTMLSpanElement>('.char');
      tl.fromTo(
        chars,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.04, stagger: 0.03 },
        0.5
      );
    }

    // Subtitle
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      0.9
    );

    // CTA
    tl.fromTo(
      ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6 },
      1.1
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      1.3
    );

    return () => {
      tl.kill();
    };
  }, []);

  const scrollToAbout = () => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo('#about', { duration: 1.2 });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Video
          Путь исправлен: файлы должны лежать в public/assets/
          (hero-video.mp4, process-brewing.jpg) */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/assets/process-brewing.jpg"
      >
        <source src="/assets/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(28,17,10,0.6) 0%, rgba(28,17,10,0.2) 50%, rgba(28,17,10,0.1) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-[120px] px-6 md:px-12">
        <div className="max-w-[680px]">
          <span
            ref={labelRef}
            className="font-mono-label block mb-4"
            style={{ color: '#E8E2D9' }}
          >
            — ШОУ-РУМ ЧАЯ
          </span>

          {/* Заголовок с символами, подготовленными в JSX.
              opacity: 0 задаётся инлайном — GSAP анимирует их в useEffect */}
          <h1
            ref={headingRef}
            className="font-display text-[52px] md:text-[100px] font-normal leading-[1.1em] tracking-[-0.03em] mb-6"
            style={{ color: '#F9F5EF' }}
            aria-label={HEADING}
          >
            {HEADING.split('').map((char, i) => (
              <span
                key={i}
                className="char"
                style={{ display: 'inline-block', opacity: 0 }}
                aria-hidden="true"
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-normal leading-[1.4em] tracking-[-0.01em] max-w-[520px] mb-8"
            style={{ color: 'rgba(249,245,239,0.8)' }}
          >
            Традиции встречаются с инновациями. Откройте для себя мир чая, где
            каждая чашка — это путешествие.
          </p>

          <button ref={ctaRef} onClick={scrollToAbout} className="btn-cream">
            ИССЛЕДОВАТЬ
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block animate-scroll-pulse"
        aria-hidden="true"
      >
        <div className="w-px h-10" style={{ backgroundColor: '#F9F5EF' }} />
      </div>
    </section>
  );
}
