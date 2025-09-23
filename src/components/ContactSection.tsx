
import { Mail, Phone, MapPin, Send, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useLanguage } from '../contexts/LanguageContext';
import { useEffect, useRef, useState } from 'react';

const ContactSection = () => {
  const { isVisible, setElement } = useScrollAnimation();
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} id="contact" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {t('contact.title')}
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'animate-fade-in-left' : 'opacity-0 -translate-x-10'
            }`}>
              <h3 className="text-2xl font-semibold text-white mb-6">{t('contact.subtitle')}</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                {t('contact.description')}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Mail className="text-purple-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('contact.email')}</p>
                    <p className="text-gray-300">jp.estrellacord@yahoo.com</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-500/20 p-3 rounded-lg">
                    <Phone className="text-cyan-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('contact.phone')}</p>
                    <p className="text-gray-300">21 988726892</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-gray-500/20 p-3 rounded-lg">
                    <Github className="text-gray-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('contact.github')}</p>
                    <a 
                      href="https://github.com/D-Lone-Starman" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-white transition-colors"
                    >
                      D-Lone-Starman
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-green-500/20 p-3 rounded-lg">
                    <MapPin className="text-green-400" size={20} />
                  </div>
                  <div>
                    <p className="text-white font-medium">{t('contact.location')}</p>
                    <p className="text-gray-300">Rio de Janeiro, Brasil</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'animate-fade-in-right' : 'opacity-0 translate-x-10'
            }`}>
              <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-white font-medium mb-2">{t('contact.form.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('contact.form.namePlaceholder')}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="email" className="block text-white font-medium mb-2">{t('contact.form.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder={t('contact.form.emailPlaceholder')}
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-white font-medium mb-2">{t('contact.form.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder={t('contact.form.messagePlaceholder')}
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <Send size={18} />
                  <span>{t('contact.form.send')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
