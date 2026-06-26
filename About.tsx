import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const introRef = useRef<HTMLParagraphElement>(null);
  // ИСПРАВЛЕНО: убрана мёртвая строка `philImageRef;` (строка 13 оригинала)
  const philImageRef = useRef<HTMLDivElement>(null);
  const philTextRef = useRef<HTMLDivElement>(null);
  const heritageTextRef = useRef<HTMLDivElement>(null);
  const heritageImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Container scale animation
      gsap.fromTo(
        containerRef.current,
        { scale: 0.95, borderRadius: '32px' },
        {
          scale: 1,
          borderRadius: '0px',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 20%',
            scrub: 1,
          },
        }
      );

      // Scroll reveals for text elements
      const revealElements = [
        labelRef.current,
        headingRef.current,
        introRef.current,
      ];

      revealElements.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: i * 0.12,
          }
        );
      });

      // Image clip-path reveal
      [philImageRef, heritageImageRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
          {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Text blocks reveal
      [philTextRef, heritageTextRef].forEach((ref) => {
        if (!ref.current) return;
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="bg-warm-cream">
      <div ref={containerRef} className="overflow-hidden">
        <div className="section-container py-20 md:py-[120px]">

          {/*
            ИСПРАВЛЕНО: grid-cols-24 не существует в стандартном Tailwind.
            Заменено на CSS-переменные через style + стандартный grid.
            Эффект идентичный: левая колонка ~42%, правая ~42%, зазор ~16%.
          */}
          <div
            className="grid gap-8 mb-16 md:mb-20"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div>
              <span
                ref={labelRef}
                className="font-mono-label block mb-4"
                style={{ color: '#6B7B6E' }}
              >
                — О НАС
              </span>
              <h2
                ref={headingRef}
                className="font-display text-[36px] md:text-[72px] font-normal leading-[1.05em] tracking-[-0.03em]"
                style={{ color: '#1C110A' }}
              >
                Мир чая,
                <br />
                переосмысленный
              </h2>
            </div>

            <div className="flex items-end">
              <p
                ref={introRef}
                className="text-xl md:text-2xl font-normal leading-[1.6em] tracking-[-0.01em]"
                style={{ color: 'rgba(28,17,10,0.8)' }}
              >
                SAM TEA — это чайный шоу-рум, где традиционное чаепитие обретает
                современное звучание. Мы создаём пространство, в котором каждый
                гость может исследовать, создавать и наслаждаться чаем
                по-своему.
              </p>
            </div>
          </div>

          {/* Philosophy Block */}
          {/*
            ИСПРАВЛЕНО: путь к изображению исправлен.
            Файл about-showroom.jpg должен лежать в public/assets/about-showroom.jpg
          */}
          <div
            className="grid gap-6 md:gap-12"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div className="overflow-hidden rounded-sm">
              <div ref={philImageRef}>
                <img
                  src="/assets/about-showroom.jpg"
                  alt="Интерьер шоу-рума SAM TEA"
                  className="w-full h-[300px] md:h-[450px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div ref={philTextRef} className="md:pt-10">
              <h3
                className="text-[22px] md:text-[36px] font-medium leading-[1.2em] tracking-[-0.03em] mb-4"
                style={{ color: '#1C110A' }}
              >
                Философия
              </h3>
              <p
                className="text-base md:text-lg font-normal leading-[1.6em] tracking-[-0.01em]"
                style={{ color: 'rgba(28,17,10,0.7)' }}
              >
                Мы верим, что чай — это не просто напиток, а способ связи с собой
                и окружающим миром. Наш шоу-рум сочетает вековые традиции
                чайной церемонии с современным дизайном и креативным подходом к
                вкусам.
              </p>
            </div>
          </div>

          {/* Heritage Block */}
          {/*
            ИСПРАВЛЕНО: путь к изображению исправлен.
            Файл about-plantation.jpg должен лежать в public/assets/about-plantation.jpg
          */}
          <div
            className="grid gap-6 md:gap-12 mt-16 md:mt-20"
            style={{ gridTemplateColumns: '1fr 1fr' }}
          >
            <div ref={heritageTextRef} className="order-2 md:order-1">
              <h3
                className="text-[22px] md:text-[36px] font-medium leading-[1.2em] tracking-[-0.03em] mb-4"
                style={{ color: '#1C110A' }}
              >
                Наше наследие
              </h3>
              <p
                className="text-base md:text-lg font-normal leading-[1.6em] tracking-[-0.01em]"
                style={{ color: 'rgba(28,17,10,0.7)' }}
              >
                Каждый листок в нашей коллекции отбирается вручную на лучших
                плантациях мира — от мистических гор Улун до древних садов
                Ассама. Мы работаем напрямую с фермерами, ценя качество и
                устойчивое развитие.
              </p>
            </div>

            <div className="overflow-hidden rounded-sm order-1 md:order-2">
              <div ref={heritageImageRef}>
                <img
                  src="/assets/about-plantation.jpg"
                  alt="Чайная плантация на рассвете"
                  className="w-full h-[300px] md:h-[450px] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
