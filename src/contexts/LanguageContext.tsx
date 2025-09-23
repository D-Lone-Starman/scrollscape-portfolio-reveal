import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'pt';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.portfolio': 'Portfolio',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.skills': 'Skills',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    
    // Hero Section
    'hero.name': 'João Estrella',
    'hero.title': 'Front-end Programmer',
    'hero.description': 'Creating beautiful, interactive web experiences with modern technologies',
    'hero.cta': 'Explore My Work',
    
    // About Section
    'about.title': 'About Me',
    'about.greeting': 'Hello, I\'m João Estrella',
    'about.description1': 'I\'m passionate about creating beautiful, user-friendly interfaces that provide exceptional user experiences. With a focus on modern web technologies like React, Tailwind CSS, and Three.js, I bring ideas to life through code.',
    'about.description2': 'My journey in frontend development started with curiosity about how beautiful websites are made, and has evolved into a passion for creating immersive digital experiences.',
    'about.trait1': 'Creative',
    'about.trait2': 'Detail-oriented',
    'about.trait3': 'Problem solver',
    'about.trait4': 'Team player',
    
    // Skills Section
    'skills.title': 'Skills & Technologies',
    
    // Projects Section
    'projects.title': 'Featured Projects',
    'projects.viewProject': 'View Project',
    'projects.viewCode': 'View Code',
    'projects.bookverse.title': 'BookVerse E-commerce',
    'projects.bookverse.description': 'A modern e-commerce platform for book lovers with advanced search, user reviews, and seamless checkout experience.',
    'projects.dashboard.title': 'Loja 3D - Interactive Dashboard',
    'projects.dashboard.description': 'A 3D e-commerce model for 3D objects with interactive data visualization and real-time analytics.',
    'projects.viewer.title': '3D Model Viewer',
    'projects.viewer.description': 'An interactive 3D model viewer built with Three.js, featuring dynamic lighting and smooth animations.',
    
    // Contact Section
    'contact.title': 'Let\'s Connect',
    'contact.subtitle': 'Get in Touch',
    'contact.description': 'I\'m always excited to work on new projects and collaborate with amazing people. Let\'s discuss how we can bring your ideas to life!',
    'contact.email': 'Email',
    'contact.phone': 'Phone',
    'contact.github': 'GitHub',
    'contact.location': 'Location',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.message': 'Message',
    'contact.form.namePlaceholder': 'Your name',
    'contact.form.emailPlaceholder': 'your@email.com',
    'contact.form.messagePlaceholder': 'Tell me about your project...',
    'contact.form.send': 'Send Message',
  },
  pt: {
    // Navigation
    'nav.portfolio': 'Portfólio',
    'nav.home': 'Início',
    'nav.about': 'Sobre',
    'nav.skills': 'Habilidades',
    'nav.projects': 'Projetos',
    'nav.contact': 'Contato',
    
    // Hero Section
    'hero.name': 'João Estrella',
    'hero.title': 'Programador Front-end',
    'hero.description': 'Criando experiências web bonitas e interativas com tecnologias modernas',
    'hero.cta': 'Explore Meu Trabalho',
    
    // About Section
    'about.title': 'Sobre Mim',
    'about.greeting': 'Olá, eu sou João Estrella',
    'about.description1': 'Sou apaixonado por criar interfaces bonitas e fáceis de usar que proporcionam experiências excepcionais ao usuário. Com foco em tecnologias web modernas como React, Tailwind CSS e Three.js, dou vida às ideias através do código.',
    'about.description2': 'Minha jornada no desenvolvimento frontend começou com curiosidade sobre como sites bonitos são feitos, e evoluiu para uma paixão por criar experiências digitais imersivas.',
    'about.trait1': 'Criativo',
    'about.trait2': 'Atento aos detalhes',
    'about.trait3': 'Solucionador de problemas',
    'about.trait4': 'Trabalha bem em equipe',
    
    // Skills Section
    'skills.title': 'Habilidades & Tecnologias',
    
    // Projects Section
    'projects.title': 'Projetos em Destaque',
    'projects.viewProject': 'Ver Projeto',
    'projects.viewCode': 'Ver Código',
    'projects.bookverse.title': 'BookVerse E-commerce',
    'projects.bookverse.description': 'Uma plataforma de e-commerce moderna para amantes de livros com busca avançada, avaliações de usuários e experiência de checkout perfeita.',
    'projects.dashboard.title': 'Loja 3D - Dashboard Interativo',
    'projects.dashboard.description': 'Um modelo de e-commerce 3D para objetos 3D com visualização interativa de dados e análises em tempo real.',
    'projects.viewer.title': 'Visualizador de Modelos 3D',
    'projects.viewer.description': 'Um visualizador interativo de modelos 3D construído com Three.js, com iluminação dinâmica e animações suaves.',
    
    // Contact Section
    'contact.title': 'Vamos Nos Conectar',
    'contact.subtitle': 'Entre em Contato',
    'contact.description': 'Estou sempre animado para trabalhar em novos projetos e colaborar com pessoas incríveis. Vamos discutir como podemos dar vida às suas ideias!',
    'contact.email': 'Email',
    'contact.phone': 'Telefone',
    'contact.github': 'GitHub',
    'contact.location': 'Localização',
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.message': 'Mensagem',
    'contact.form.namePlaceholder': 'Seu nome',
    'contact.form.emailPlaceholder': 'seu@email.com',
    'contact.form.messagePlaceholder': 'Conte-me sobre seu projeto...',
    'contact.form.send': 'Enviar Mensagem',
  }
};

// Create context with default value to prevent undefined context
const defaultContextValue: LanguageContextType = {
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    console.error('useLanguage must be used within a LanguageProvider');
    return defaultContextValue;
  }
  return context;
};