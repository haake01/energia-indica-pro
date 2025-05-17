
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full border-b bg-white py-4 px-4 md:px-6">
      <div className="container flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-brand-blue">
            LEX+ENERGIA
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#como-funciona" className="font-medium text-gray-600 hover:text-brand-blue transition-colors">
            Como Funciona
          </a>
          <a href="#beneficios" className="font-medium text-gray-600 hover:text-brand-blue transition-colors">
            Benefícios
          </a>
          <a href="#faq" className="font-medium text-gray-600 hover:text-brand-blue transition-colors">
            FAQ
          </a>
          <a href="#contato" className="font-medium text-gray-600 hover:text-brand-blue transition-colors">
            Contato
          </a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/login">
            <Button variant="outline" className="hidden md:inline-flex border-brand-blue text-brand-blue hover:bg-brand-blue/10">
              Login
            </Button>
          </Link>
          <Link to="/cadastro">
            <Button className="bg-brand-orange text-white hover:bg-brand-orange-light">
              Cadastre-se
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
