import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './hooks/useInView';
import { X, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoAcaIndustria from 'figma:asset/93bb08303e3fdc2826a1404c659d88a3c4989184.png';
import logoAcaTransformadora from 'figma:asset/d77d32044eda7371a91adadc15a6cd9b03d6bca2.png';
import conexaoVisualLogo from 'figma:asset/c53ac514721b451af57638b1c3fa17476d53570a.png';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  videoUrl: string;
}

export function CasesPage() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  // Função para fechar o vídeo com tecla ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedVideo]);

  // Bloquear scroll quando vídeo estiver aberto
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedVideo]);

  const cases: CaseStudy[] = [
    {
      id: 'aca-transformadora',
      title: 'ACA Transformadora',
      description: 'A ACA é referência em transformação de vans e veículos especiais. Nosso trabalho foi construir uma comunicação que iguala o nível da entrega real da empresa: sofisticada, estratégica e desejável. Desenvolvemos vídeos, narrativas e artes que apresentam cada diferenciação técnica com profundidade e impacto — sempre valorizando o olhar humano e a personalização do processo.',
      logo: logoAcaTransformadora,
      logoAlt: 'Logo ACA Transformadora',
      videoUrl: 'https://www.dropbox.com/scl/fi/p6csvxf1mjdextiastcjm/V-deo-37-Transformadora.mp4?rlkey=0xuvxv51c6900tpn9tfm1na9i&st=jdjyqrji&raw=1',
    },
    {
      id: 'aca-industria',
      title: 'ACA Indústria',
      description: 'A frente industrial da ACA precisava de clareza e autoridade. Criamos materiais modernos, organizados e pensados para fortalecer a credibilidade junto ao mercado B2B. Destacamos processos, estrutura e especialização, permitindo que a marca ganhasse mais força na captação de novos parceiros corporativos.',
      logo: logoAcaIndustria,
      logoAlt: 'Logo ACA Indústria',
      videoUrl: 'https://www.dropbox.com/scl/fi/0ava0cta9p32wblyu2k2m/V-deo-23-ACA-Ind-stria.mp4?rlkey=98eeodl16le5988ip0prh7bz4&st=xs34xme3&raw=1', // Placeholder - substituir pela URL real
    },
    {
      id: 'conexao-visual',
      title: 'Conexão Visual',
      description: 'Para a Conexão Visual, redesenhamos o posicionamento e a estética, trazendo uma abordagem clean, objetiva e comercial. Estruturamos uma linha visual que traduz confiança e profissionalismo, além de materiais estratégicos que facilitam o processo de venda e reforçam a identidade da empresa no mercado.',
      logo: conexaoVisualLogo,
      logoAlt: 'Logo Conexão Visual',
      videoUrl: 'https://www.dropbox.com/scl/fi/ujrsvh8xz2hgzfjsyi001/Fachada-Colch-o.mp4?rlkey=2w3uuwem3rzotck69zf2wf3uo&st=bek8dv7z&raw=1', // Placeholder - substituir pela URL real
    },
  ];

  return (
    <section id="cases" ref={ref} className="min-h-screen bg-black pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-24 md:mb-32"
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            Cases de Sucesso
          </h1>
          <p className="text-xl md:text-2xl opacity-60 max-w-2xl mx-auto leading-relaxed">
            Projetos que transformaram marcas em&nbsp;referências
          </p>
        </motion.div>

        {/* Cases */}
        <div className="space-y-16 md:space-y-20">
          {cases.map((caseStudy, index) => (
            <CaseBlock
              key={caseStudy.id}
              caseStudy={caseStudy}
              index={index}
              onVideoClick={() => setSelectedVideo(caseStudy.videoUrl)}
            />
          ))}
        </div>

        {/* CTA Final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 md:mt-24 text-center"
        >
          <div className="border border-white/10 rounded-2xl p-8 md:p-10 bg-black/40 backdrop-blur-sm">
            <h2 className="text-2xl md:text-4xl mb-4 tracking-tight">
              Vamos criar algo incrível juntos?
            </h2>
            <p className="text-base md:text-lg opacity-75 mb-6 max-w-xl mx-auto leading-relaxed">
              Entre em contato e descubra como podemos transformar sua marca em uma&nbsp;referência
            </p>
            <a
              href="/#contato"
              className="inline-block px-8 py-3 bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 tracking-wide"
            >
              Fale Conosco
            </a>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Backdrop with blur and dark overlay */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Close button */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm"
              aria-label="Fechar vídeo"
            >
              <X size={24} />
            </button>

            {/* Video container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 w-full max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  src={selectedVideo}
                  controls
                  controlsList="nodownload"
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

interface CaseBlockProps {
  caseStudy: CaseStudy;
  index: number;
  onVideoClick: () => void;
}

function CaseBlock({ caseStudy, index, onVideoClick }: CaseBlockProps) {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative"
    >
      {/* Desktop Layout */}
      <div className="hidden md:block border border-white/10 rounded-3xl p-12 bg-black/40 backdrop-blur-sm">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Video - alternates left/right */}
          <div className={`${index % 2 === 1 ? 'md:order-2' : ''} relative group`}>
            <div
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <motion.div
                className="relative aspect-[9/16] max-w-[320px] mx-auto cursor-pointer"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                onClick={onVideoClick}
              >
                {/* Video preview */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5">
                  <video
                    src={caseStudy.videoUrl}
                    playsInline
                    muted
                    loop
                    className="w-full h-full object-cover"
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />

                  {/* Play overlay */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[2px]"
                  >
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={32} className="ml-1" fill="white" />
                    </div>
                  </motion.div>
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-[#FFB88C]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </motion.div>
            </div>
          </div>

          {/* Content */}
          <div className={`${index % 2 === 1 ? 'md:order-1' : ''} space-y-8 flex flex-col justify-center`}>
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-16 flex items-center"
            >
              <ImageWithFallback
                src={caseStudy.logo}
                alt={caseStudy.logoAlt}
                className="h-full w-auto object-contain opacity-90"
              />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-4xl tracking-tight"
            >
              {caseStudy.title}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg opacity-75 leading-relaxed"
            >
              {caseStudy.description}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Mobile Layout - Redesigned */}
      <div className="md:hidden">
        {/* Logo no topo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="h-16 flex items-center justify-center mb-6"
        >
          <ImageWithFallback
            src={caseStudy.logo}
            alt={caseStudy.logoAlt}
            className="h-full w-auto object-contain opacity-90"
          />
        </motion.div>

        {/* Card com conteúdo */}
        <div className="border border-white/10 rounded-2xl p-6 bg-black/40 backdrop-blur-sm space-y-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl tracking-tight text-center"
          >
            {caseStudy.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-sm opacity-75 leading-relaxed text-center"
          >
            {caseStudy.description}
          </motion.p>

          {/* Video Preview Thumbnail */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative"
          >
            <div 
              className="relative aspect-[9/16] max-w-[200px] mx-auto cursor-pointer group"
              onClick={onVideoClick}
            >
              {/* Video thumbnail */}
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 shadow-xl border border-white/5">
                <video
                  src={caseStudy.videoUrl}
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                  poster=""
                />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-active:scale-95 transition-transform duration-200">
                    <Play size={24} className="ml-1" fill="white" />
                  </div>
                </div>
              </div>
              
              {/* Subtle glow */}
              <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-[#FFB88C]/10 to-transparent blur-2xl" />
            </div>

            {/* Watch text */}
            <p className="text-center mt-4 text-sm opacity-60 tracking-wide">
              Toque para assistir
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}