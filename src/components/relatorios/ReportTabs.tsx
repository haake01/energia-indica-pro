
import React from "react";
import { FileText } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import ReportCard from "./ReportCard";

interface ReportTabsProps {
  onDownload: (reportName: string) => void;
}

const ReportTabs = ({ onDownload }: ReportTabsProps) => {
  return (
    <Tabs defaultValue="indicacoes" className="w-full">
      <TabsList className="mb-6">
        <TabsTrigger value="indicacoes">Indicações</TabsTrigger>
        <TabsTrigger value="comissoes">Comissões</TabsTrigger>
        <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
      </TabsList>
      
      <TabsContent value="indicacoes" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Relatório de Indicações Mensais */}
          <ReportCard 
            title="Indicações Mensais" 
            description="Relatório detalhado de todas as suas indicações do mês"
            icon={<FileText className="h-8 w-8 text-blue-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Indicações Mensais")}
          />
          
          {/* Relatório de Status das Indicações */}
          <ReportCard 
            title="Status das Indicações" 
            description="Acompanhamento de status de todas as indicações"
            icon={<FileText className="h-8 w-8 text-green-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Status das Indicações")}
          />
          
          {/* Relatório de Indicações por Região */}
          <ReportCard 
            title="Indicações por Região" 
            description="Distribuição geográfica das suas indicações"
            icon={<FileText className="h-8 w-8 text-purple-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Indicações por Região")}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="comissoes" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Relatório de Comissões */}
          <ReportCard 
            title="Extrato de Comissões" 
            description="Detalhamento de todas as comissões recebidas"
            icon={<FileText className="h-8 w-8 text-green-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Extrato de Comissões")}
          />
          
          {/* Relatório de Previsão de Comissões */}
          <ReportCard 
            title="Previsão de Comissões" 
            description="Estimativa de comissões futuras baseadas em indicações em andamento"
            icon={<FileText className="h-8 w-8 text-amber-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Previsão de Comissões")}
          />
          
          {/* Relatório Fiscal Anual */}
          <ReportCard 
            title="Relatório Fiscal Anual" 
            description="Resumo anual para fins de declaração de imposto de renda"
            icon={<FileText className="h-8 w-8 text-red-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Relatório Fiscal Anual")}
          />
        </div>
      </TabsContent>
      
      <TabsContent value="desempenho" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Relatório de Desempenho */}
          <ReportCard 
            title="Desempenho Geral" 
            description="Visão geral do seu desempenho como indicador"
            icon={<FileText className="h-8 w-8 text-indigo-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Desempenho Geral")}
          />
          
          {/* Relatório de Conversão */}
          <ReportCard 
            title="Taxa de Conversão" 
            description="Análise da sua taxa de conversão de indicações em contratos"
            icon={<FileText className="h-8 w-8 text-cyan-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Taxa de Conversão")}
          />
          
          {/* Relatório de Comparativo */}
          <ReportCard 
            title="Comparativo Trimestral" 
            description="Comparação do seu desempenho atual com trimestres anteriores"
            icon={<FileText className="h-8 w-8 text-orange-500" />}
            badges={["PDF"]}
            onDownload={() => onDownload("Comparativo Trimestral")}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
