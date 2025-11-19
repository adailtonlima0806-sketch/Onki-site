import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from './hooks/useInView';
import { Target, Eye, Heart, ChevronDown } from 'lucide-react';

export function About() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const features = [
    {
      icon: Target,
      title: 'Missão',
      description: 'Apresentar com excelência a essência e o propósito de cada cliente, por meio de estratégias visuais e digitais que conectem marcas e pessoas de forma autêntica e eficiente.',
    },
    {
      icon: Eye,
      title: 'Visão',
      description: 'Nos próximos dois anos, queremos impulsionar o posicionamento digital de 50 empresas, gerando resultados reais e duradouros por meio de estratégias humanizadas, éticas e livres de apelações.',
    },
    {
      icon: Heart,
      title: 'Valores',
      values: [
        { label: 'Relevância', text: 'Atuamos apenas com negócios que geram impacto positivo e resolvem problemas reais da sociedade.' },
        { label: 'Ética', text: 'Rejeitamos projetos que desprezem a vida, a saúde humana ou promovam qualquer forma de degradação.' },
        { label: 'Alegria e Inspiração', text: 'Trabalhamos com leveza, criatividade e entusiasmo, buscando sempre a excelência.' },
        { label: 'Humanidade', text: 'Valorizamos a comunicação empática e autêntica, tanto com nossos clientes quanto com o público deles.' },
        { label: 'Evolução constante', text: 'Tomamos decisões baseadas em dados e aprendizados, ajustando rotas para alcançar os melhores resultados.' },
        { label: 'Empreendedor', text: 'Criamos caminhos, não esperamos por eles. Agimos com visão, coragem e propósito.' },
      ]
    },
  ];

  return (
    <section id="quem-somos" ref={ref} className="py-32 md:py-40 bg-black">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl mb-8 tracking-tight">
            Quem Somos
          </h2>
          <p className="md:text-xl opacity-90 leading-relaxed text-[20px] text-center">
              Nós somos inconformados por natureza. Não aceitamos resultados medianos nem
              comunicação sem propósito. Ousados e humanos. Misturamos criatividade
              com estratégia, performance com leveza, tecnologia com sensibilidade.
              Nascemos para resolver problemas de comunicação com profundidade, clareza 
              e resultados — isso sem ser genérico, sem ser apelativo, sem&nbsp;ser&nbsp;arrogante.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
              className="border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between hover:bg-white/5 transition-colors duration-300"
              >
                <div className="flex items-center gap-4">
                  <feature.icon size={24} className="opacity-80" />
                  <h3 className="text-xl md:text-2xl tracking-wide">
                    {feature.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown size={24} className="opacity-80" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 py-6 border-t border-white/10">
                      {feature.description && (
                        <p className="opacity-80 leading-relaxed">
                          {feature.description}
                        </p>
                      )}
                      {feature.values && (
                        <div className="space-y-4">
                          {feature.values.map((value, idx) => (
                            <div key={idx}>
                              <p className="opacity-90 mb-1">{value.label}:</p>
                              <p className="opacity-75 text-sm leading-relaxed">{value.text}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}