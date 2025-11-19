import { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Clients } from './components/Clients';
import { Contact } from './components/Contact';
import { CasesPage } from './components/CasesPage';
import { ScrollToTop } from './components/ScrollToTop';
import { LoadingScreen } from './components/LoadingScreen';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('inicio');
  const [currentPage, setCurrentPage] = useState<'home' | 'cases'>('home');

  useEffect(() => {
    if (currentPage === 'home') {
      const handleScroll = () => {
        const sections = ['inicio', 'quem-somos', 'servicos', 'contato'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);

  const navigateToPage = (page: 'home' | 'cases') => {
    setCurrentPage(page);
    if (page === 'cases') {
      setActiveSection('cases');
    } else {
      setActiveSection('inicio');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="bg-black text-white min-h-screen">
          <Header activeSection={activeSection} currentPage={currentPage} onNavigate={navigateToPage} />
          <main>
            {currentPage === 'home' ? (
              <>
                <Hero />
                <About />
                <Services />
                <Clients />
                <Contact />
              </>
            ) : (
              <CasesPage />
            )}
          </main>
          <ScrollToTop />
          <Toaster />
        </div>
      )}
    </>
  );
}