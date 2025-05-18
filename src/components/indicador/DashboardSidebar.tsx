
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  Home,
  Plus,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/lib/supabase-auth";
import { toast } from "@/hooks/use-toast";

const DashboardSidebar = () => {
  const navigate = useNavigate();
  
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
          <SidebarLink icon={Home} text="Dashboard" to="/indicador/painel" active />
          <SidebarLink icon={Users} text="Meus Indicados" to="/indicador/leads" />
          <SidebarLink icon={BarChart3} text="Relatórios" to="/indicador/relatorios" />
          <SidebarLink icon={Settings} text="Meu Perfil" to="/indicador/perfil" />
          <SidebarLink icon={ShieldCheck} text="Área de Gestor" to="/gestor/painel" />
        </div>
        
        <div className="mt-6 lg:px-2">
          <Link to="/indicador/cadastrar-lead">
            <Button className="w-full lg:justify-start bg-brand-orange hover:bg-brand-orange/90">
              <Plus className="w-5 h-5 lg:mr-2" />
              <span className="hidden lg:block">Nova Indicação</span>
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="p-4 border-t border-brand-blue-light">
        <Button 
          variant="ghost" 
          className="w-full justify-center lg:justify-start hover:bg-brand-blue-light text-white"
          onClick={handleLogout}
        >
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
