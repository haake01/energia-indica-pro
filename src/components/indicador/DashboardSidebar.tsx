
import React from "react";
import { Link } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Plus,
  ShieldLock
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  return (
    <aside className="w-20 lg:w-64 bg-brand-blue text-white min-h-screen flex flex-col">
      <div className="p-4 flex justify-center lg:justify-start">
        <Link to="/" className="text-xl font-bold">
          <span className="hidden lg:block">LEX+ENERGIA</span>
          <span className="block lg:hidden text-2xl">LEX</span>
        </Link>
      </div>
      
      <div className="px-2 py-6 flex-1">
        <div className="space-y-2">
          <SidebarLink icon={Home} text="Dashboard" to="/indicador" active />
          <SidebarLink icon={Users} text="Indicações" to="/indicador/indicacoes" />
          <SidebarLink icon={BarChart3} text="Relatórios" to="/indicador/relatorios" />
          <SidebarLink icon={Settings} text="Configurações" to="/indicador/configuracoes" />
          <SidebarLink icon={ShieldLock} text="Área de Gestor" to="/gestor/painel" />
        </div>
        
        <div className="mt-6 lg:px-2">
          <Button className="w-full lg:justify-start bg-brand-orange hover:bg-brand-orange-light">
            <Plus className="w-5 h-5 lg:mr-2" />
            <span className="hidden lg:block">Nova Indicação</span>
          </Button>
        </div>
      </div>
      
      <div className="p-4 border-t border-brand-blue-light">
        <Button variant="ghost" className="w-full justify-center lg:justify-start hover:bg-brand-blue-light text-white">
          <LogOut className="w-5 h-5 lg:mr-2" />
          <span className="hidden lg:block">Sair</span>
        </Button>
      </div>
    </aside>
  );
};

const SidebarLink = ({ 
  icon: Icon, 
  text, 
  to, 
  active = false 
}: { 
  icon: React.ElementType; 
  text: string; 
  to: string; 
  active?: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={`flex items-center p-2 rounded-lg transition-colors ${
        active 
          ? 'bg-white/10 text-white' 
          : 'text-white/70 hover:bg-white/5 hover:text-white'
      }`}
    >
      <Icon className="w-5 h-5 lg:mr-3" />
      <span className="hidden lg:block">{text}</span>
    </Link>
  );
};

export default DashboardSidebar;
