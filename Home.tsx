import { useRef } from 'react';
import Lenis from 'lenis';
import { useEffect } from 'react';
import Hero from './Hero';
import About from './About';
import ImmersiveProcess from './ImmersiveProcess';
import Experiences from './Experiences';
import SignatureCollection from './SignatureCollection';
import Footer from './Footer';

// ИСПРАВЛЕНО: файл был шаблонным boilerplate Vite (count is {count}).
// Заменён на реальную сборку страницы с инициализацией Lenis.
export default function Home() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Hero lenisRef={lenisRef} />
      <About />
      <ImmersiveProcess />
      <SignatureCollection />
      <Experiences />
      <Footer lenisRef={lenisRef} />
    </main>
  );
}
