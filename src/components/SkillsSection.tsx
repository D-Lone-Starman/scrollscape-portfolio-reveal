
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef } from 'react';

const SkillsSection = () => {
  const { isVisible, setElement } = useScrollAnimation();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const skills = [
    { name: 'HTML5', level: 90, color: 'from-orange-500 to-red-500' },
    { name: 'CSS3', level: 85, color: 'from-blue-500 to-cyan-500' },
    { name: 'JavaScript', level: 80, color: 'from-yellow-500 to-orange-500' },
    { name: 'React', level: 75, color: 'from-cyan-500 to-blue-500' },
    { name: 'Tailwind CSS', level: 85, color: 'from-teal-500 to-green-500' },
    { name: 'Three.js', level: 60, color: 'from-purple-500 to-pink-500' }
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              {t('skills.title')}
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className={`transition-all duration-1000 ${
                  isVisible 
                    ? 'animate-fade-in-up' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                    <span className="text-gray-300">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full bg-gradient-to-r ${skill.color} transition-all duration-1000 ease-out`}
                      style={{ 
                        width: isVisible ? `${skill.level}%` : '0%',
                        transitionDelay: `${index * 200 + 500}ms`
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
