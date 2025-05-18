
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

const Header = () => {
  const handleContactClick = () => {
    // Abre o cliente de email com assunto predefinido
    // Idealmente, deveria incluir o nome do indicador logado, mas como não temos acesso
    // a essa informação no momento, apenas deixamos o assunto
    window.location.href = "mailto:contato@lexmaisenergia.com.br?subject=INDIQUE%20E%20GANHE";
  };

  return (
    <header className="w-full border-b bg-white/70 backdrop-blur-sm py-4 px-4 md:px-6 sticky top-0 z-50 shadow-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center flex-col">
          <div className="flex items-baseline">
            <h1 className="text-2xl font-bold text-brand-blue">
              Lex<span className="text-brand-orange">+ENERGIA</span>
            </h1>
          </div>
          <span className="text-xs text-gray-600">by Alexandria Energia</span>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#como-funciona" className="font-medium bg-lime-400 hover:bg-lime-500 text-gray-800 px-4 py-2 rounded-full transition-colors">
            Como Funciona
          </a>
          <a href="#beneficios" className="font-medium bg-lime-400 hover:bg-lime-500 text-gray-800 px-4 py-2 rounded-full transition-colors">
            Benefícios
          </a>
          <a href="#faq" className="font-medium bg-lime-400 hover:bg-lime-500 text-gray-800 px-4 py-2 rounded-full transition-colors">
            FAQ
          </a>
          <button 
            onClick={handleContactClick}
            className="font-medium bg-lime-400 hover:bg-lime-500 text-gray-800 px-4 py-2 rounded-full transition-colors"
          >
            Contato
          </button>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="hidden md:inline-flex bg-brand-blue text-white hover:bg-brand-blue/90 border-brand-blue rounded-full">
              Login
            </Button>
          </Link>
          <Link to="/cadastro">
            <Button className="bg-brand-orange text-white hover:bg-brand-orange-light rounded-full">
              Cadastre-se
            </Button>
          </Link>
          <Link to="/gestor/painel" className="hidden md:inline-flex">
            <Button variant="outline" className="bg-gray-800 text-white hover:bg-gray-700 border-gray-800 rounded-full flex items-center gap-2">
              <ShieldCheck size={18} />
              <span>Área Restrita</span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
