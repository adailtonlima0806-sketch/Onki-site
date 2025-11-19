import { motion } from 'motion/react';
import { useInView } from './hooks/useInView';
import { MessageCircle, Mail, Linkedin, Instagram, Copy, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleWhatsApp = () => {
    const message = encodeURIComponent('Olá, vim pelo site da ONKI e quero saber mais sobre os serviços.');
    const phoneNumber = '5541995797749';
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleCopyEmail = () => {
    const email = 'contato@onki.com.br';
    
    // Cria um elemento textarea temporário
    const textArea = document.createElement('textarea');
    textArea.value = email;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      textArea.remove();
      
      if (successful) {
        setEmailCopied(true);
        toast.success('E-mail copiado para a área de transferência!');
        setTimeout(() => setEmailCopied(false), 2000);
      } else {
        toast.error('Não foi possível copiar. E-mail: contato@onki.com.br', {
          duration: 5000,
        });
      }
    } catch (err) {
      textArea.remove();
      console.error('Erro ao copiar:', err);
      toast.error('Não foi possível copiar. E-mail: contato@onki.com.br', {
        duration: 5000,
      });
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/onki', // Substitua pela URL real
    },
    {
      name: 'Instagram',
      icon: Instagram,
      url: 'https://www.instagram.com/onki.ia', // Substitua pela URL real
    },
    {
      name: 'TikTok',
      icon: () => (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: 'https://www.tiktok.com/@onki', // Substitua pela URL real
    },
  ];

  return (
    <section id="contato" ref={ref} className="py-32 md:py-40 bg-black border-t border-white/10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl mb-8 tracking-tight">
            Vamos Conversar
          </h2>
          <p className="text-lg md:text-xl opacity-80">
            Pronto para transformar sua marca? Entre em contato
          </p>
        </motion.div>

        {/* WhatsApp e Email lado a lado */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {/* WhatsApp */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-10 border border-white/10 hover:border-white/30 transition-all duration-300 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-6 rounded-lg">
                <MessageCircle size={28} className="opacity-80" />
              </div>
              <h3 className="text-2xl mb-4 tracking-wide">WhatsApp</h3>
              <p className="opacity-75 mb-8 leading-relaxed">
                Fale diretamente com a gente agora
              </p>
              <Button
                onClick={handleWhatsApp}
                className="bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 w-full"
              >
                <MessageCircle size={18} className="mr-2" />
                Abrir WhatsApp
              </Button>
            </div>
          </motion.div>

          {/* E-mail */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-10 border border-white/10 hover:border-white/30 transition-all duration-300 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border border-white/20 flex items-center justify-center mb-6 rounded-lg">
                <Mail size={28} className="opacity-80" />
              </div>
              <h3 className="text-2xl mb-4 tracking-wide">E-mail</h3>
              <p className="opacity-75 mb-8 leading-relaxed">
                Copie nosso e-mail
              </p>
              <Button
                onClick={handleCopyEmail}
                variant="outline"
                className="border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300 w-full"
              >
                {emailCopied ? (
                  <>
                    <Check size={18} className="mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy size={18} className="mr-2" />
                    contato@onki.com.br
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Redes Sociais Centralizadas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-xl mb-4 tracking-wide opacity-80">Siga-nos nas redes sociais</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 border border-white/20 hover:border-white/40 hover:bg-white/5 flex items-center justify-center transition-all duration-300 hover:scale-110 rounded-lg"
                  aria-label={social.name}
                >
                  <social.icon size={24} className="opacity-80" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Mensagem de Aviso */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 border border-white/5 rounded-lg bg-white/[0.01] text-center">
            <p className="opacity-60 text-sm leading-relaxed">
              Responderemos sua mensagem em até 24 horas úteis. 
              Para assuntos urgentes, recomendamos o contato via WhatsApp.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="max-w-6xl mx-auto mt-24 pt-12 border-t border-white/10 text-center"
      >
        <p className="opacity-60 text-sm tracking-wide">
         Todos os direitos reservados © {new Date().getFullYear()} ONKI — Olhar que gera valor
        </p>
      </motion.div>
    </section>
  );
}