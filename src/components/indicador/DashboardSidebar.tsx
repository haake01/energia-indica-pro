
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Plus,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/supabase-auth";
import { toast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const handleLogout = async () => {
    const result = await logoutUser();
    if (result.success) {
      navigate("/login");
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Não foi possível encerrar sua sessão. Tente novamente."
      });
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-brand-blue text-white"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      <aside 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } fixed lg:static top-0 left-0 z-40 w-64 min-h-screen bg-brand-blue text-white transition-transform duration-300 ease-in-out lg:w-20 xl:w-64`}
      >
        <div className="p-4 flex justify-center lg:justify-start">
          <Link to="/" className="text-xl font-bold">
            <span className="hidden xl:block">Lex<span className="text-brand-orange">+ENERGIA</span></span>
            <span className="block xl:hidden text-2xl">Lex</span>
          </Link>
        </div>
        
        <div className="px-2 py-6 flex-1">
          <div className="space-y-2">
            <SidebarLink 
              icon={Home} 
              text="Dashboard" 
              to="/indicador/painel" 
              active={location.pathname === '/indicador/painel'} 
              onClick={() => setIsOpen(false)}
            />
            <SidebarLink 
              icon={Users} 
              text="Meus Indicados" 
              to="/indicador/leads" 
              active={location.pathname === '/indicador/leads'} 
              onClick={() => setIsOpen(false)}
            />
            <SidebarLink 
              icon={BarChart3} 
              text="Relatórios" 
              to="/indicador/relatorios" 
              active={location.pathname === '/indicador/relatorios'} 
              onClick={() => setIsOpen(false)}
            />
            <SidebarLink 
              icon={Settings} 
              text="Meu Perfil" 
              to="/indicador/perfil" 
              active={location.pathname === '/indicador/perfil'} 
              onClick={() => setIsOpen(false)}
            />
            <SidebarLink 
              icon={ShieldCheck} 
              text="Área de Gestor" 
              to="/gestor/painel" 
              active={location.pathname.startsWith('/gestor')} 
              onClick={() => setIsOpen(false)}
            />
          </div>
          
          <div className="mt-6 lg:px-2">
            <Link to="/indicador/cadastrar-lead" onClick={() => setIsOpen(false)}>
              <Button className="w-full lg:justify-start bg-brand-orange hover:bg-brand-orange/90">
                <Plus className="w-5 h-5 lg:mr-2" />
                <span className="hidden xl:block">Nova Indicação</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="p-4 border-t border-brand-blue-light">
          <Button 
            variant="ghost" 
            className="w-full justify-center lg:justify-start hover:bg-brand-blue-light text-white"
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
          >
            <LogOut className="w-5 h-5 lg:mr-2" />
            <span className="hidden xl:block">Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

const SidebarLink = ({ 
  icon: Icon, 
  text, 
  to, 
  active = false,
  onClick 
}: { 
  icon: React.ElementType; 
  text: string; 
  to: string; 
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <Link 
      to={to} 
      onClick={onClick}
      className={`flex items-center p-2 rounded-lg transition-colors ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 lg:mr-3" />
      <span className="hidden xl:block">{text}</span>
    </Link>
  );
};

export default DashboardSidebar;
