import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const panels = [
  {
    label: '01 — ЧАЙНЫЕ САДЫ',
    title: 'Рассвет в горах',
    image: '/assets/process-garden.jpg',
  },
  {
    label: '02 — СБОР УРОЖАЯ',
    title: 'Руки, знающие ценность',
    image: '/assets/process-harvest.jpg',
  },
  {
    label: '03 — УВЯДАНИЕ',
    title: 'Терпение природы',
    image: '/assets/process-withering.jpg',
  },
  {
    label: '04 — СКАТЫВАНИЕ',
    title: 'Форма рождает вкус',
    image: '/assets/process-rolling.jpg',
  },
  {
    label: '05 — СУШКА',
    title: 'Огонь завершает начатое',
    image: '/assets/process-drying.jpg',
  },
  {
    label: '06 — ЗАВАРИВАНИЕ',
    title: 'Момент истины',
    image: '/assets/process-brewing.jpg',
  },
];

export default function ImmersiveProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Horizontal scroll on desktop
      const scrollWidth = container.scrollWidth - window.innerWidth;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      tl.to(container, {
        x: -scrollWidth,
        ease: 'none',
      });

      // Progress bar
      if (progressRef.current) {
        gsap.to(progressRef.current, {
          width: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            scrub: 1,
            start: 'top top',
            end: () => `+=${scrollWidth}`,
          },
        });
      }

      // Panel text entrance
      textRefs.current.forEach((textEl) => {
        if (!textEl) return;
        gsap.fromTo(
          textEl,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: textEl.closest('.process-panel'),
              containerAnimation: tl,
              start: 'left 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative bg-deep-chocolate overflow-hidden"
    >
      {/* Section Label */}
      <div className="absolute top-6 left-6 z-20">
        <span
          className="font-mono-label"
          style={{ color: '#6B7B6E' }}
        >
          — ОТ ЛИСТА К ЧАШКЕ
        </span>
      </div>

      {/* Desktop: Horizontal Scroll Container */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="flex flex-nowrap h-screen"
        >
          {panels.map((panel, i) => (
            <div
              key={panel.label}
              ref={(el) => { panelsRef.current[i] = el; }}
              className="process-panel flex-shrink-0 w-screen h-screen relative overflow-hidden"
            >
              <img
                src={panel.image}
                alt={panel.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(28,17,10,0.5) 0%, rgba(28,17,10,0.1) 50%, rgba(28,17,10,0.05) 100%)',
                }}
              />
              <div
                ref={(el) => { textRefs.current[i] = el; }}
                className="absolute bottom-12 left-12 z-10"
              >
                <h3
                  className="font-display text-[48px] md:text-[56px] font-normal leading-[1.1em] tracking-[-0.03em] mb-3"
                  style={{ color: '#F9F5EF' }}
                >
                  {panel.title}
                </h3>
                <span
                  className="font-mono-label"
                  style={{ color: '#F9F5EF' }}
                >
                  {panel.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile: Vertical Stack */}
      <div className="md:hidden flex flex-col">
        {panels.map((panel) => (
          <div
            key={panel.label}
            className="relative h-[80vh] overflow-hidden snap-start"
          >
            <img
              src={panel.image}
              alt={panel.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to top, rgba(28,17,10,0.5) 0%, rgba(28,17,10,0.1) 50%, rgba(28,17,10,0.05) 100%)',
              }}
            />
            <div className="absolute bottom-8 left-6 z-10">
              <h3
                className="font-display text-[32px] font-normal leading-[1.1em] tracking-[-0.03em] mb-2"
                style={{ color: '#F9F5EF' }}
              >
                {panel.title}
              </h3>
              <span
                className="font-mono-label"
                style={{ color: '#F9F5EF' }}
              >
                {panel.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Bar (Desktop only) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-[200px] h-0.5" style={{ backgroundColor: 'rgba(232,226,217,0.3)' }}>
        <div
          ref={progressRef}
          className="h-full w-0"
          style={{ backgroundColor: '#C4723F' }}
        />
      </div>
    </section>
  );
}
