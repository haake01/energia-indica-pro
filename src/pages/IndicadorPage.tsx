
import React from "react";
import { BarChart3, Users, Plus, Check, Clock, AlertCircle } from "lucide-react";
import DashboardHeader from "@/components/indicador/DashboardHeader";
import DashboardSidebar from "@/components/indicador/DashboardSidebar";
import IndicacaoCard from "@/components/indicador/IndicacaoCard";
import EstatisticasCard from "@/components/indicador/EstatisticasCard";
import NovaIndicacaoButton from "@/components/indicador/NovaIndicacaoButton";

const IndicadorPage = () => {
  // Dados mockados para demonstração
  const estatisticas = {
    totalIndicacoes: 12,
    totalAprovadas: 8,
    totalPendentes: 3,
    totalRejeitadas: 1,
    totalGanho: 2450.0,
  };

  const indicacoes = [
    {
      id: "1",
      nome: "João Silva",
      valorFatura: 450.0,
      status: "aprovada",
      dataIndicacao: "2023-05-10",
      comissao: 300.0,
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      valorFatura: 680.0,
      status: "pendente",
      dataIndicacao: "2023-05-15",
      comissao: 450.0,
    },
    {
      id: "3", 
      nome: "Carlos Santos",
      valorFatura: 320.0,
      status: "aprovada",
      dataIndicacao: "2023-05-05",
      comissao: 200.0,
    },
    {
      id: "4",
      nome: "Ana Pereira",
      valorFatura: 520.0,
      status: "rejeitada",
      dataIndicacao: "2023-05-01",
      comissao: 0,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar />
      <div className="flex-1">
        <DashboardHeader />
        <main className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard do Indicador</h1>
            <NovaIndicacaoButton />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <EstatisticasCard 
              titulo="Total de Indicações"
              valor={estatisticas.totalIndicacoes}
              icone={Users}
              cor="blue"
            />
            <EstatisticasCard 
              titulo="Aprovadas"
              valor={estatisticas.totalAprovadas}
              icone={Check}
              cor="green"
            />
            <EstatisticasCard 
              titulo="Pendentes"
              valor={estatisticas.totalPendentes}
              icone={Clock}
              cor="orange"
            />
            <EstatisticasCard 
              titulo="Total Ganho"
              valor={`R$ ${estatisticas.totalGanho.toFixed(2)}`}
              icone={BarChart3}
              cor="purple"
              isMonetary
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Suas Indicações</h2>
              <div className="text-sm text-gray-500">
                Mostrando {indicacoes.length} indicações
              </div>
            </div>
            
            <div className="space-y-4">
              {indicacoes.map((indicacao) => (
                <IndicacaoCard key={indicacao.id} indicacao={indicacao} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default IndicadorPage;
