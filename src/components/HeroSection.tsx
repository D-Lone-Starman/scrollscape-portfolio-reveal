
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';

const HeroSection = () => {
  const { isVisible, setElement } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#about');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section 
      ref={sectionRef}
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className={`text-center z-10 px-4 transition-all duration-1000 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0'
      }`}>
        <div className="animate-float">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Frontend
            </span>
            <br />
            <span className="text-white">Designer</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Creating beautiful, interactive web experiences with modern technologies
        </p>
        
        <div className="flex justify-center space-x-6 mb-12">
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
          >
            <Github size={32} />
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
          >
            <Linkedin size={32} />
          </a>
          <a 
            href="#" 
            className="text-gray-300 hover:text-white transition-colors duration-200 transform hover:scale-110"
          >
            <Mail size={32} />
          </a>
        </div>
        
        <button
          onClick={scrollToNext}
          className="animate-bounce bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 animate-glow"
        >
          Explore My Work
        </button>
      </div>
      
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
