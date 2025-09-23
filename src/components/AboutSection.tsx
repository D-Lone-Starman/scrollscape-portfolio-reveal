
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef } from 'react';

const AboutSection = () => {
  const { isVisible, setElement } = useScrollAnimation();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t('about.title')}
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'animate-fade-in-left' : 'opacity-0 -translate-x-10'
            }`}>
              <div className="relative max-w-sm mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-2xl opacity-20 blur-xl"></div>
                <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-4 backdrop-blur-sm border border-white/10">
                  <img 
                    src="/lovable-uploads/dd2250c7-1259-4a2d-9f03-2f52a4a9364d.png" 
                    alt="João Estrella"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-10'
            }`}>
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <h3 className="text-2xl font-semibold text-white mb-6">{t('about.greeting')}</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('about.description1')}
                </p>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {t('about.description2')}
                </p>
                <div className="flex flex-wrap gap-3">
                  {[t('about.trait1'), t('about.trait2'), t('about.trait3'), t('about.trait4')].map((trait, index) => (
                    <span 
                      key={trait}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full text-sm text-purple-300 border border-purple-500/30"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
