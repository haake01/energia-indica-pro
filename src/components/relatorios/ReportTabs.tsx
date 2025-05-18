
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Check, Clock, AlertCircle } from "lucide-react";
import ReportCard from "@/components/relatorios/ReportCard";
import { useLeadList } from "@/hooks/useLeadList";
import ReportPdfExport from "@/components/relatorios/ReportPdfExport";

interface ReportTabsProps {
  onDownload: (reportName: string) => void;
}

const ReportTabs: React.FC<ReportTabsProps> = ({ onDownload }) => {
  const { leads, filters, isLoading } = useLeadList();
  const [activeTab, setActiveTab] = useState("todos");
  
  // Filtrar leads com base na tab ativa
  const getFilteredLeads = () => {
    switch (activeTab) {
      case "novos":
        return leads.filter(lead => lead.status === "novo");
      case "contatados":
        return leads.filter(lead => lead.status === "contatado");
      case "convertidos":
        return leads.filter(lead => lead.status === "convertido");
      case "perdidos":
        return leads.filter(lead => lead.status === "perdido");
      default:
        return leads;
    }
  };

  const filteredLeads = getFilteredLeads();
  
  // Agrupar leads por tipo de interesse para o relatório de interesses
  const interestGroups = leads.reduce((acc, lead) => {
    const interest = lead.interesse;
    if (!acc[interest]) {
      acc[interest] = [];
    }
    acc[interest].push(lead);
    return acc;
  }, {} as Record<string, typeof leads>);
  
  return (
    <Tabs defaultValue="todos" onValueChange={setActiveTab} className="space-y-6">
      <div className="flex justify-between items-center">
        <TabsList>
          <TabsTrigger value="todos">Todos os Leads</TabsTrigger>
          <TabsTrigger value="novos">Novos</TabsTrigger>
          <TabsTrigger value="contatados">Contatados</TabsTrigger>
          <TabsTrigger value="convertidos">Convertidos</TabsTrigger>
          <TabsTrigger value="perdidos">Perdidos</TabsTrigger>
        </TabsList>
        
        <ReportPdfExport 
          title={`Relatório de Leads - ${getTabTitle(activeTab)}`}
          leads={filteredLeads}
          filters={filters}
        />
      </div>
      
      <TabsContent value="todos" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ReportCard
            title="Resumo de Leads"
            description="Relatório completo com todos os leads cadastrados e seus status."
            icon={<BarChart3 className="h-6 w-6 text-brand-blue" />}
            badges={["Completo", "Detalhado"]}
            onDownload={() => onDownload("Resumo de Leads")}
          />
          
          <ReportCard
            title="Leads por Interesse"
            description="Análise de leads agrupados por área de interesse."
            icon={<Users className="h-6 w-6 text-brand-blue" />}
            badges={["Agrupado", "Estatístico"]}
            onDownload={() => onDownload("Leads por Interesse")}
          />
          
          <ReportCard
            title="Performance de Conversão"
            description="Taxa de conversão de leads e análise de desempenho."
            icon={<Check className="h-6 w-6 text-green-600" />}
            badges={["Conversão", "Gráficos"]}
            onDownload={() => onDownload("Performance de Conversão")}
          />
        </div>
        
        {/* Estatísticas de leads */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard 
            title="Total de Leads"
            value={leads.length}
            icon={<Users className="h-6 w-6 text-white" />}
            color="bg-brand-blue"
          />
          <StatCard 
            title="Novos"
            value={leads.filter(l => l.status === "novo").length}
            icon={<Clock className="h-6 w-6 text-white" />}
            color="bg-blue-500"
          />
          <StatCard 
            title="Convertidos"
            value={leads.filter(l => l.status === "convertido").length}
            icon={<Check className="h-6 w-6 text-white" />}
            color="bg-green-600"
          />
          <StatCard 
            title="Perdidos"
            value={leads.filter(l => l.status === "perdido").length}
            icon={<AlertCircle className="h-6 w-6 text-white" />}
            color="bg-red-500"
          />
        </div>
      </TabsContent>
      
      <TabsContent value="novos">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Leads com status "Novo"</h3>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Nome/Empresa</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Telefone</th>
                    <th className="pb-2">Interesse</th>
                    <th className="pb-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3">{lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}</td>
                      <td className="py-3">{lead.email}</td>
                      <td className="py-3">{lead.telefone}</td>
                      <td className="py-3">{getInterestLabel(lead.interesse)}</td>
                      <td className="py-3">{new Date(lead.dataCadastro).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum lead com status "Novo" encontrado.</p>
          )}
        </div>
      </TabsContent>
      
      {/* Conteúdo similar para as outras tabs */}
      <TabsContent value="contatados">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Leads com status "Contatado"</h3>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Nome/Empresa</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Telefone</th>
                    <th className="pb-2">Interesse</th>
                    <th className="pb-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3">{lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}</td>
                      <td className="py-3">{lead.email}</td>
                      <td className="py-3">{lead.telefone}</td>
                      <td className="py-3">{getInterestLabel(lead.interesse)}</td>
                      <td className="py-3">{new Date(lead.dataCadastro).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum lead com status "Contatado" encontrado.</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="convertidos">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Leads com status "Convertido"</h3>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Nome/Empresa</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Telefone</th>
                    <th className="pb-2">Interesse</th>
                    <th className="pb-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3">{lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}</td>
                      <td className="py-3">{lead.email}</td>
                      <td className="py-3">{lead.telefone}</td>
                      <td className="py-3">{getInterestLabel(lead.interesse)}</td>
                      <td className="py-3">{new Date(lead.dataCadastro).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum lead com status "Convertido" encontrado.</p>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="perdidos">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium mb-4">Leads com status "Perdido"</h3>
          {filteredLeads.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-2">Nome/Empresa</th>
                    <th className="pb-2">Email</th>
                    <th className="pb-2">Telefone</th>
                    <th className="pb-2">Interesse</th>
                    <th className="pb-2">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b">
                      <td className="py-3">{lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}</td>
                      <td className="py-3">{lead.email}</td>
                      <td className="py-3">{lead.telefone}</td>
                      <td className="py-3">{getInterestLabel(lead.interesse)}</td>
                      <td className="py-3">{new Date(lead.dataCadastro).toLocaleDateString('pt-BR')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-500">Nenhum lead com status "Perdido" encontrado.</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

// Componente auxiliar para estatísticas
const StatCard = ({ title, value, icon, color }: { title: string; value: number | string; icon: React.ReactNode; color: string }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className={`${color} p-3 rounded-lg mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

const getTabTitle = (tab: string) => {
  switch (tab) {
    case "novos":
      return "Novos";
    case "contatados":
      return "Contatados";
    case "convertidos":
      return "Convertidos";
    case "perdidos":
      return "Perdidos";
    default:
      return "Todos";
  }
};

const getInterestLabel = (interesse: string) => {
  switch (interesse) {
    case "energia":
      return "Energia Solar";
    case "internet":
      return "Internet Fibra";
    case "agua":
      return "Economia de Água";
    case "consultoria":
      return "Consultoria Empresarial";
    default:
      return interesse;
  }
};

export default ReportTabs;
