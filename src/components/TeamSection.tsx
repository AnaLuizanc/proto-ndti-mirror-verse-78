
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Linkedin, Github, Mail } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getHighlightedTeamMembers } from '@/data/teamMembers';

const TeamSection: React.FC = () => {
  const { ref, inView } = useInView({ 
    threshold: 0.2,
    triggerOnce: true
  });

  // Utilizando os dados compartilhados dos membros em destaque (primeiros 4)
  const teamMembers = getHighlightedTeamMembers(4);

  return (
    <section id="equipe" className="py-16 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2 className="section-heading mb-8">Nossa Equipe</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-center mb-12">
          Conheça os profissionais que compõem o NDTI, uma equipe multidisciplinar comprometida com 
          a inovação tecnológica e o desenvolvimento de soluções para o IFNMG Campus Montes Claros.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white rounded-lg shadow-md overflow-hidden card-hover transform transition-all duration-500",
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden relative group">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-ndti-800 hover:text-gradient-green-yellow">{member.name}</h3>
                <p className="text-ndti-600 mb-3 hover:text-gradient-green-yellow">{member.role}</p>
                
                <Sheet>
                  <SheetTrigger className="text-sm text-ifnmg-green hover:text-ifnmg-blue transition-colors">
                    Ver detalhes
                  </SheetTrigger>
                  <SheetContent className="sm:max-w-md">
                    <SheetHeader>
                      <SheetTitle>{member.name}</SheetTitle>
                      <SheetDescription>{member.role}</SheetDescription>
                    </SheetHeader>
                    <div className="mt-6">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
                      />
                      <p className="text-gray-600 mb-6">{member.bio}</p>
                      <div className="flex justify-center space-x-4">
                        <a href={member.social.linkedin} aria-label="LinkedIn" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href={member.social.github} aria-label="GitHub" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href={`mailto:${member.social.email}`} aria-label="Email" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                          <Mail className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <div className="flex space-x-3 mt-3">
                  <a href={member.social.linkedin} aria-label="LinkedIn" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href={member.social.github} aria-label="GitHub" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href={`mailto:${member.social.email}`} aria-label="Email" className="text-gray-400 hover:text-ifnmg-green transition-colors">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link 
            to="/equipe"
            className="inline-flex items-center px-8 py-3 bg-ifnmg-green text-white rounded-md hover:bg-ndti-700 transition-colors"
          >
            Ver Equipe Completa
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
