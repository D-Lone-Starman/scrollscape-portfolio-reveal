
import { ExternalLink, Github } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';

const ProjectsSection = () => {
  const { isVisible, setElement } = useScrollAnimation();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setElement(sectionRef.current);
    }
  }, [setElement]);

  const projects = [
    {
      title: "Interactive Dashboard",
      description: "A modern dashboard with real-time data visualization using React and Chart.js",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Chart.js"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "E-commerce Landing",
      description: "Responsive e-commerce landing page with smooth animations and modern design",
      technologies: ["HTML5", "CSS3", "JavaScript", "GSAP"],
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      title: "3D Portfolio Site",
      description: "Interactive portfolio website with Three.js 3D elements and scroll animations",
      technologies: ["React", "Three.js", "Tailwind CSS", "Framer Motion"],
      gradient: "from-green-500 to-teal-500"
    }
  ];

  return (
    <section ref={sectionRef} id="projects" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div 
                key={project.title}
                className={`transition-all duration-1000 ${
                  isVisible 
                    ? 'animate-scale-in' 
                    : 'opacity-0 scale-90'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="group bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 border-2 border-white/30 rounded-lg flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/20 rounded backdrop-blur-sm"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                    <p className="text-gray-300 mb-4 text-sm leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="px-2 py-1 bg-white/10 rounded text-xs text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors">
                        <Github size={16} />
                        <span className="text-sm">Code</span>
                      </button>
                      <button className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors">
                        <ExternalLink size={16} />
                        <span className="text-sm">Live Demo</span>
                      </button>
                    </div>
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

export default ProjectsSection;
