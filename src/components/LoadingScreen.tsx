import { motion } from 'motion/react';
import logoOnki from 'figma:asset/44f5b0703da37d888db5e66cbd7f54e1bae35f7f.png';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={() => {
        setTimeout(onComplete, 3000); // 3 segundos após aparecer
      }}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center"
    >
      {/* Container com mesma estrutura EXATA do Hero */}
      <div className="relative z-10 container mx-auto px-6 text-center -mt-32 md:-mt-40">
        <div className="flex flex-col items-center">
          {/* Logo com mesma posição exata do Hero */}
          <motion.img
            src={logoOnki}
            alt="ONKI"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-48 md:w-64 lg:w-72 h-auto mb-8"
          />
          
          {/* Slogan */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white text-base md:text-lg tracking-wider opacity-60"
          >
            Olhar que gera valor
          </motion.p>
        </div>
      </div>
      
      {/* Loading indicator */}
      <motion.div
        className="absolute bottom-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.4, 1, 0.4],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}