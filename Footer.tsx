import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FooterProps {
  lenisRef: React.MutableRefObject<any>;
}

const navLinks = [
  { label: 'О НАС', target: '#about' },
  { label: 'ЧАЙНЫЙ ОПЫТ', target: '#experiences' },
  { label: 'КОЛЛЕКЦИЯ', target: '#collection' },
  { label: 'КОНТАКТЫ', target: '#footer' },
];

export default function Footer({ lenisRef }: FooterProps) {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!contentRef.current) return;

      const children = contentRef.current.children;
      gsap.fromTo(
        children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    }
  };

  return (
    <footer
      ref={footerRef}
      id="footer"
      style={{ backgroundColor: '#3D2314' }}
    >
      <div ref={contentRef} className="section-container pt-16 md:pt-20 pb-12">
        {/* Top Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 pb-12 md:pb-16">
          {/* Left Column */}
          <div>
            <h3
              className="text-xl font-semibold tracking-[0.08em] mb-6"
              style={{ color: '#F9F5EF' }}
            >
              SAM TEA
            </h3>
            <p
              className="text-base font-normal leading-[1.5em] mb-8 max-w-[300px]"
              style={{ color: 'rgba(249,245,239,0.6)' }}
            >
              Традиции встречаются с инновациями.
            </p>

            {/* Contact Details */}
            <div className="flex flex-col gap-2 mb-10">
              <span
                className="font-mono text-sm"
                style={{ color: 'rgba(249,245,239,0.8)' }}
              >
                +7 (495) 123-45-67
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: 'rgba(249,245,239,0.8)' }}
              >
                hello@samtea.ru
              </span>
              <span
                className="font-mono text-sm"
                style={{ color: 'rgba(249,245,239,0.8)' }}
              >
                Москва, ул. Мясницкая, 24
              </span>
            </div>

            {/* Opening Hours */}
            <div>
              <span
                className="font-mono-label block mb-3"
                style={{ color: 'rgba(249,245,239,0.5)' }}
              >
                ЧАСЫ РАБОТЫ
              </span>
              <div className="flex flex-col gap-1">
                <span
                  className="font-mono text-sm"
                  style={{ color: 'rgba(249,245,239,0.8)' }}
                >
                  Пн–Пт: 10:00 – 22:00
                </span>
                <span
                  className="font-mono text-sm"
                  style={{ color: 'rgba(249,245,239,0.8)' }}
                >
                  Сб–Вс: 11:00 – 23:00
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:items-end">
            {/* Navigation Links */}
            <div className="flex flex-col gap-3 mb-10">
              {navLinks.map((link) => (
                <button
                  key={link.target}
                  onClick={() => scrollTo(link.target)}
                  className="text-sm font-medium text-left md:text-right transition-colors duration-300 hover:text-warm-cream"
                  style={{ color: 'rgba(249,245,239,0.7)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Newsletter */}
            <div className="w-full md:max-w-[320px]">
              <span
                className="font-mono-label block mb-4"
                style={{ color: 'rgba(249,245,239,0.5)' }}
              >
                ПОДПИШИТЕСЬ НА НОВОСТИ
              </span>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Ваш email"
                  className="w-full bg-transparent pb-2 text-sm font-sans outline-none transition-colors duration-300"
                  style={{
                    color: '#F9F5EF',
                    borderBottom: '1px solid rgba(249,245,239,0.3)',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderBottomColor = 'rgba(249,245,239,0.8)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderBottomColor = 'rgba(249,245,239,0.3)';
                  }}
                />
                <button
                  className="absolute right-0 bottom-2 transition-colors duration-300 hover:text-terracotta"
                  style={{ color: '#F9F5EF' }}
                  aria-label="Subscribe"
                >
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
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
          style={{ borderTop: '1px solid rgba(232,226,217,0.2)' }}
        >
          <span
            className="font-mono text-xs"
            style={{ color: 'rgba(249,245,239,0.4)' }}
          >
            © 2025 SAM TEA. Все права защищены.
          </span>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="font-mono text-xs transition-colors duration-300 hover:text-warm-cream"
              style={{ color: 'rgba(249,245,239,0.4)' }}
            >
              INSTAGRAM
            </a>
            <a
              href="#"
              className="font-mono text-xs transition-colors duration-300 hover:text-warm-cream"
              style={{ color: 'rgba(249,245,239,0.4)' }}
            >
              TELEGRAM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
