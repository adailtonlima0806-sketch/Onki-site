import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './hooks/useInView';
import { X, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import conexaoVisualLogo from 'figma:asset/c53ac514721b451af57638b1c3fa17476d53570a.png';

interface CaseStudy {
  id: string;
  title: string;
  description: string;
  logo: string;
  logoAlt: string;
  videoUrl: string;
}

export function Cases() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const cases: CaseStudy[] = [
    {
      id: 'aca-transformadora',
      title: 'ACA Transformadora',
      description: 'A ACA é referência em transformação de vans e veículos especiais. Nosso trabalho foi construir uma comunicação que iguala o nível da entrega real da empresa: sofisticada, estratégica e desejável. Desenvolvemos vídeos, narrativas e artes que apresentam cada diferenciação técnica com profundidade e impacto — sempre valorizando o olhar humano e a personalização do processo.',
      logo: '/placeholder-logo-aca-transformadora.png',
      logoAlt: 'Logo ACA Transformadora',
      videoUrl: 'https://www.dropbox.com/scl/fi/p6csvxf1mjdextiastcjm/V-deo-37-Transformadora.mp4?rlkey=0xuvxv51c6900tpn9tfm1na9i&st=jdjyqrji&raw=1', // Placeholder - substituir pela URL real
    },
    {
      id: 'aca-industria',
      title: 'ACA Indústria',
      description: 'A frente industrial da ACA precisava de clareza e autoridade. Criamos materiais modernos, organizados e pensados para fortalecer a credibilidade junto ao mercado B2B. Destacamos processos, estrutura e especialização, permitindo que a marca ganhasse mais força na captação de novos parceiros corporativos.',
      logo: '/placeholder-logo-aca-industria.png',
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
    <section id="cases" ref={ref} className="min-h-screen bg-black py-32 md:py-40">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-32"
        >
          <h1 className="text-5xl md:text-7xl mb-6 tracking-tight">
            Cases de Sucesso
          </h1>
          <p className="text-xl md:text-2xl opacity-60 max-w-3xl mx-auto leading-relaxed">
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
              className="relative z-10 w-full max-w-md md:max-w-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl">
                <video
                  src={selectedVideo}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
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
      className="space-y-6"
    >
      {/* Logo no topo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="h-10 md:h-12 flex items-start"
      >
        <ImageWithFallback
          src={caseStudy.logo}
          alt={caseStudy.logoAlt}
          className="h-full w-auto object-contain opacity-90"
        />
      </motion.div>

      {/* Grid com vídeo e conteúdo */}
      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
        {/* Video - alternates left/right */}
        <div
          className={`${index % 2 === 1 ? 'md:order-2' : ''} relative group`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className="relative aspect-[9/16] max-w-xs mx-auto cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onClick={onVideoClick}
          >
            {/* Video preview */}
            <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-900 shadow-2xl">
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
            <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-[#FFB88C]/20 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`${index % 2 === 1 ? 'md:order-1' : ''} space-y-4`}>
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-4xl tracking-tight"
          >
            {caseStudy.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base md:text-lg opacity-75 leading-relaxed"
          >
            {caseStudy.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}