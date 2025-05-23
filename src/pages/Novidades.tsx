
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { getAllNews } from '@/data/news';

const Novidades: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  
  // Efeito para rolar a página para o topo quando o componente é montado
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Get all news from centralized data
  const news = getAllNews();

  const filteredNews = activeFilter === "todos" 
    ? news 
    : news.filter(item => item.type === activeFilter);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="progress-indicator" style={{ width: `0%` }}></div>
      <NavBar />

      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4">
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-ndti-800 mb-4">
              Novidades e Comunicados
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Fique por dentro das últimas atualizações, editais e eventos do Núcleo de Desenvolvimento Tecnológico e Inovação do IFNMG Campus Montes Claros.
            </p>
          </header>

          <div className="mb-10">
            <div className="flex flex-wrap gap-3 mb-6">
              {["todos", "edital", "evento", "projeto"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === filter
                      ? "bg-ifnmg-blue text-white"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {filter === "todos" ? "Todos" : 
                   filter === "edital" ? "Editais" : 
                   filter === "projeto" ? "Projetos" : "Eventos"}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow card-hover">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full inline-block ${
                        item.type === 'edital' ? 'bg-ndti-500 text-white' : 
                        item.type === 'projeto' ? 'bg-ifnmg-blue text-white' :
                        'bg-gray-100 text-ndti-800'
                      }`}>
                        {item.type === 'edital' ? 'Edital' : 
                         item.type === 'projeto' ? 'Projeto' : 'Evento'}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-ndti-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{item.description}</p>
                    
                    <Link 
                      to={`/novidades/${item.id}`}
                      className="text-ifnmg-blue hover:text-ndti-700 font-medium flex items-center text-sm"
                    >
                      Ler mais
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/" className="inline-flex items-center text-ifnmg-blue hover:text-ndti-700 font-medium">
              Voltar para a página inicial
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Novidades;
