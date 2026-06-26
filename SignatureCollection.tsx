import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ИСПРАВЛЕНО: пути к изображениям.
// Файлы prod-*.jpg должны лежать в public/assets/ (не в корне репозитория).
const products = [
  {
    name: 'Лунцзин (Колодец Дракона)',
    origin: 'Провинция Чжэцзян, Китай',
    description:
      'Премиальный зелёный чай с ореховым послевкусием и нежной сладостью.',
    price: '1 200 ₽ / 50г',
    image: '/assets/prod-dragonwell.jpg',
  },
  {
    name: 'Эрл Грей Резерв',
    origin: 'Цейлон, Шри-Ланка',
    description:
      'Роскошный чёрный чай с бергамотом и лепестками василька. Насыщенный и ароматный.',
    price: '980 ₽ / 50г',
    image: '/assets/prod-earlgrey.jpg',
  },
  {
    name: 'Улун Молочный',
    origin: 'Горы Алишань, Тайвань',
    description:
      'Полуферментированный чай с кремовым молочным ароматом и сладковатым вкусом.',
    price: '1 450 ₽ / 50г',
    image: '/assets/prod-oolong.jpg',
  },
  {
    name: 'Жасминовая Жемчужина',
    origin: 'Фуцзянь, Китай',
    description:
      'Ручноскатанные зелёные чаи, ароматизированные свежими цветами жасмина. Раскрывается в чашке.',
    price: '1 380 ₽ / 50г',
    image: '/assets/prod-jasmine.jpg',
  },
];

export default function SignatureCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // ИСПРАВЛЕНО: кнопка «В КОРЗИНУ» теперь имеет состояние.
  // addedIndex хранит индекс последнего добавленного товара для визуального фидбека.
  const [addedIndex, setAddedIndex] = useState<number | null>(null);

  const handleAddToCart = (index: number) => {
    setAddedIndex(index);
    setTimeout(() => setAddedIndex(null), 1800);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Card stagger entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: card,
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
    <section
      ref={sectionRef}
      id="collection"
      className="bg-warm-cream py-20 md:py-[120px]"
    >
      <div className="section-container">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16">
          <span
            className="font-mono-label block mb-4"
            style={{ color: '#6B7B6E' }}
          >
            — КОЛЛЕКЦИЯ
          </span>
          <h2
            className="font-display text-[36px] md:text-[72px] font-normal leading-[1.05em] tracking-[-0.03em] mb-4"
            style={{ color: '#1C110A' }}
          >
            Наши фирменные чаи
          </h2>
          <p
            className="text-xl md:text-2xl font-normal leading-[1.4em] tracking-[-0.01em] max-w-[480px] mx-auto"
            style={{ color: 'rgba(28,17,10,0.7)' }}
          >
            Каждый сорт — это история, рассказанная через аромат и вкус.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, i) => (
            <div
              key={product.name}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              <div className="overflow-hidden rounded-sm mb-5 transition-shadow duration-500 group-hover:shadow-card-hover">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>

              <h3
                className="text-lg md:text-[22px] font-medium leading-[1.3em] tracking-[-0.03em] mb-1"
                style={{ color: '#1C110A' }}
              >
                {product.name}
              </h3>

              <span
                className="font-mono text-[13px] block mb-3"
                style={{ color: '#6B7B6E' }}
              >
                {product.origin}
              </span>

              <p
                className="text-sm md:text-base font-normal leading-[1.5em] mb-4"
                style={{ color: 'rgba(28,17,10,0.7)' }}
              >
                {product.description}
              </p>

              <div className="flex items-center justify-between">
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: '#C4723F' }}
                >
                  {product.price}
                </span>

                {/* ИСПРАВЛЕНО: кнопка теперь функциональная — даёт визуальный фидбек */}
                <button
                  onClick={() => handleAddToCart(i)}
                  className="text-[13px] font-medium tracking-wide transition-colors duration-300"
                  style={{
                    color: addedIndex === i ? '#6B7B6E' : '#1C110A',
                  }}
                  aria-label={`Добавить ${product.name} в корзину`}
                >
                  {addedIndex === i ? '✓ ДОБАВЛЕНО' : 'В КОРЗИНУ'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <button className="btn-cream">
            СМОТРЕТЬ ВСЮ КОЛЛЕКЦИЮ
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
    </section>
  );
}
