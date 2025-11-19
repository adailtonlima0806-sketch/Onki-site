import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import logoOnki from 'figma:asset/44f5b0703da37d888db5e66cbd7f54e1bae35f7f.png';

export function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = ['valor', 'conteúdo', 'resultados', 'presença', 'conexões', 'impacto', 'estratégia', 'histórias', 'visibilidade', 'experiências'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3000); // 3 segundos

    return () => clearInterval(interval);
  }, []);

  const scrollToAbout = () => {
    const element = document.getElementById('quem-somos');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-75"
        >
          {/* Substitua a URL abaixo pelo link do seu vídeo MP4 hospedado */}
          <source src="https://www.dropbox.com/scl/fi/f68vr2e5zm5lavtejqlqo/Showreel.mp4?rlkey=f5cgehkucndhg10p9jxwpnpkh&st=os3ytxaz&raw=1" type="video/mp4" />
          {/* Fallback para navegadores que não suportam vídeo */}
          Seu navegador não suporta vídeos HTML5.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          className="flex flex-col items-center"
        >
          {/* Logo que permanece fixo na transição */}
          <motion.img
            src={logoOnki}
            alt="ONKI"
            initial={{ opacity: 1, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-48 md:w-64 lg:w-72 h-auto mb-8"
          />
          
          {/* Frase com palavra variável - aparece gradualmente */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg md:text-xl lg:text-2xl mb-16 max-w-3xl mx-auto"
          >
            <div className="flex flex-col items-center justify-center gap-1">
              <span className="opacity-80">Nós somos especialistas em gerar</span>
              <div className="min-w-[140px] md:min-w-[180px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentWordIndex}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="inline-block font-bold"
                  >
                    {words[currentWordIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={scrollToAbout}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="group px-12 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105"
          >
            <span className="tracking-wide">O que nos move</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToAbout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-60 hover:opacity-80 transition-opacity"
        aria-label="Scroll down"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown size={32} />
        </motion.div>
      </motion.button>
    </section>
  );
}