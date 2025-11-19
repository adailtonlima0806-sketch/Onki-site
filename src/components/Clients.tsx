import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import ncaLogo from 'figma:asset/660913811bbd4fe97d506d37507cad1fb2ff1231.png';
import bomJesusLogo from 'figma:asset/dcc282d3aad3736466f831cbdfa91909bdda0943.png';
import netairLogo from 'figma:asset/e5ede19da56877c644419f4e4a48d266bcece003.png';
import ncaTransformadoraLogo from 'figma:asset/9889fbc498961c51c44e2953484582a0a33647e7.png';
import boldLogo from 'figma:asset/f4e44b4d1cc30de43e14625de579b7f55d86ab23.png';
import cliente6Logo from 'figma:asset/3ea5c0c80ed21d6a392b38c89b5639566b16774c.png';
import ihjLogo from 'figma:asset/7728f3c4f0663e70c0bf7defbb0e4540836e008e.png';
import crystalLogo from 'figma:asset/345766c6d8ad49f2d883608651b4aa705a6fca07.png';

export function Clients() {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  // Logos dos clientes
  const clients = [
    { name: 'NCA Ar Condicionado Automotivo', logo: ncaLogo },
    { name: 'Grupo Educacional Bom Jesus', logo: bomJesusLogo },
    { name: 'Netair', logo: netairLogo },
    { name: 'NCA Transformadora', logo: ncaTransformadoraLogo },
    { name: 'BOLD', logo: boldLogo },
    { name: 'Cliente 6', logo: cliente6Logo },
    { name: 'Instituto Haroldo Jacobovicz', logo: ihjLogo },
    { name: 'Crystal Shopping', logo: crystalLogo },
  ];

  // Duplicar os clientes múltiplas vezes para criar o efeito de loop infinito suave
  const duplicatedClients = [...clients, ...clients];

  return (
    <section ref={ref} className="py-32 md:py-40 bg-black border-t border-white/10 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl mb-8 tracking-tight">
            Nossos Clientes
          </h2>
          <p className="text-lg md:text-xl opacity-80">
            Marcas que confiam no nosso trabalho
          </p>
        </motion.div>

        {/* Carrossel infinito */}
        <div className="relative">
          {/* Gradientes nas bordas para efeito fade */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
          
          <div 
            className="overflow-hidden"
          >
            <motion.div
              className="flex gap-8 md:gap-12"
              animate={{
                x: [0, -1 * (clients.length * (180 + 48))],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 45,
                  ease: "linear",
                },
              }}
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex-shrink-0 w-36 h-20 md:w-48 md:h-24 flex items-center justify-center"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className={`max-w-full max-h-full object-contain opacity-70 hover:opacity-100 transition-opacity duration-300 ${
                      client.name === 'Crystal Shopping' ? 'brightness-0 invert' : ''
                    }`}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}