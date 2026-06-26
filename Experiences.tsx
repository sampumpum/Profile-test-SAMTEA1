import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    number: '01',
    title: 'Мастер-класс по купажированию',
    description:
      'Создайте свой собственный чайный купаж под руководством нашего чайного мастера. Выберите базу, добавьте травы, цветы и специи — и увезите домой свой уникальный чай.',
    cta: 'ЗАПИСАТЬСЯ',
    image: '/assets/exp-blending.jpg',
  },
  {
    number: '02',
    title: 'Дегустация с сомелье',
    description:
      'Погрузитесь в мир вкусов с нашим чайным сомелье. Откройте для себя редкие сорта, научитесь различать нотки и терпкость, как профессионал.',
    cta: 'УЗНАТЬ БОЛЬШЕ',
    image: '/assets/exp-tasting.jpg',
  },
  {
    number: '03',
    title: 'Чайная лаунж-зона',
    description:
      'Расслабьтесь в нашем уютном лаунже с чашкой премиального чая и лёгкими закусками. Идеальное место для встречи с друзьями или тихого размышления.',
    cta: 'ПОСМОТРЕТЬ МЕНЮ',
    image: '/assets/exp-lounge.jpg',
  },
];

export default function Experiences() {
  const sectionRef = useRef<HTMLElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      // Sticky sidebar on desktop
      if (sidebarRef.current && sectionRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 15%',
          end: 'bottom 85%',
          pin: sidebarRef.current,
          pinSpacing: false,
        });
      }
    });

    // Card entrance animations
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          delay: i * 0.2,
        }
      );
    });

    // Image clip-path reveal
    imagesRef.current.forEach((img) => {
      if (!img) return;
      gsap.fromTo(
        img,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 1.2,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: img,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experiences"
      className="bg-warm-cream py-20 md:py-[120px]"
    >
      <div className="section-container">
        <div className="flex flex-col md:flex-row gap-12 md:gap-8">
          {/* Sticky Sidebar */}
          <div
            ref={sidebarRef}
            className="md:w-[30%] md:shrink-0"
          >
            <span
              className="font-mono-label block mb-4"
              style={{ color: '#6B7B6E' }}
            >
              — ЧАЙНЫЙ ОПЫТ
            </span>
            <h2
              className="font-display text-[36px] md:text-[56px] font-normal leading-[1.1em] tracking-[-0.03em] mb-6"
              style={{ color: '#1C110A' }}
            >
              Три способа
              <br />
              прикоснуться
              <br />
              к чаю
            </h2>
            <p
              className="text-xl md:text-2xl font-normal leading-[1.4em] tracking-[-0.01em]"
              style={{ color: 'rgba(28,17,10,0.7)' }}
            >
              Будь вы ценителем или новичком — у нас найдётся опыт, созданный
              специально для вас.
            </p>
          </div>

          {/* Cards */}
          <div className="flex-1 flex flex-col gap-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.number}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group"
              >
                <div className="overflow-hidden rounded-sm mb-6 md:hidden">
                  <div ref={(el) => { imagesRef.current[i] = el; }}>
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-[200px] object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="overflow-hidden rounded-sm mb-6 hidden md:block">
                  <div ref={(el) => { imagesRef.current[i] = el; }}>
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>
                </div>

                <span
                  className="font-mono text-[36px] md:text-[48px] font-light block mb-3"
                  style={{ color: '#E8E2D9' }}
                >
                  {exp.number}
                </span>

                <h3
                  className="text-[28px] md:text-[48px] font-normal leading-[1.2em] tracking-[-0.03em] mb-4"
                  style={{ color: '#1C110A' }}
                >
                  {exp.title}
                </h3>

                <p
                  className="text-base md:text-lg font-normal leading-[1.6em] tracking-[-0.01em] mb-6 max-w-[600px]"
                  style={{ color: 'rgba(28,17,10,0.7)' }}
                >
                  {exp.description}
                </p>

                <span className="link-arrow">
                  {exp.cta}
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
