import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoOnki from 'figma:asset/44f5b0703da37d888db5e66cbd7f54e1bae35f7f.png';

interface HeaderProps {
  activeSection: string;
  currentPage: 'home' | 'cases';
  onNavigate: (page: 'home' | 'cases') => void;
}

const menuItems = [
  { id: 'inicio', label: 'Início', page: 'home' as const },
  { id: 'quem-somos', label: 'Quem Somos', page: 'home' as const },
  { id: 'servicos', label: 'O Que Fazemos', page: 'home' as const },
  { id: 'cases', label: 'Cases de Sucesso', page: 'cases' as const },
  { id: 'contato', label: 'Contato', page: 'home' as const },
];

export function Header({ activeSection, currentPage, onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (item: typeof menuItems[0]) => {
    if (item.page === 'cases') {
      onNavigate('cases');
    } else {
      if (currentPage !== 'home') {
        onNavigate('home');
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        const element = document.getElementById(item.id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
    setMobileMenuOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Botão de Menu Fixo - Desktop: só quando não rolou, Mobile: nunca */}
      {!scrolled && (
        <motion.button
          onClick={() => setMenuOpen(!menuOpen)}
          className="hidden md:block fixed top-6 right-6 z-50 p-3 bg-white hover:bg-white/90 transition-all duration-300 rounded-full"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
        </motion.button>
      )}

      {/* Header Desktop - Aparece ao rolar ou ao clicar no botão */}
      <AnimatePresence>
        {(scrolled || menuOpen) && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md"
          >
            <nav className="container mx-auto px-6 py-6">
              <div className="flex items-center justify-between">
                {/* Logo */}
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMenuOpen(false);
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={logoOnki} 
                    alt="ONKI" 
                    className="h-8 md:h-10 w-auto"
                  />
                </button>

                {/* Desktop Menu */}
                <ul className="flex items-center gap-8 lg:gap-12">
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => handleNavigation(item)}
                        className={`relative text-sm tracking-wide transition-opacity hover:opacity-80 ${
                          activeSection === item.id ? 'opacity-100' : 'opacity-75'
                        }`}
                      >
                        {item.label}
                        {activeSection === item.id && (
                          <motion.span
                            layoutId="activeSection"
                            className="absolute -bottom-1 left-0 right-0 h-px bg-white"
                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Mobile Menu Button - Fixo no topo */}
      <motion.button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed top-6 right-6 z-50 p-3 bg-white hover:bg-white/90 transition-all duration-300 rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black" />}
      </motion.button>

      {/* Mobile Menu Overlay - Tela cheia */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 bg-black"
          >
            <nav className="h-full flex flex-col items-center justify-center px-6">
              {/* Logo no topo do overlay */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="absolute top-8"
              >
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={logoOnki} 
                    alt="ONKI" 
                    className="h-10 w-auto"
                  />
                </button>
              </motion.div>

              {/* Menu items */}
              <ul className="space-y-8 text-center">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`block text-2xl tracking-wide transition-opacity hover:opacity-80 ${
                        activeSection === item.id ? 'opacity-100' : 'opacity-75'
                      }`}
                    >
                      {item.label}
                    </button>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}