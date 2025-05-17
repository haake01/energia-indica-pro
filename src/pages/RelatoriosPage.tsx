
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/indicador/DashboardSidebar";
import DashboardHeader from "@/components/indicador/DashboardHeader";
import { toast } from "@/hooks/use-toast";

// Import the extracted components
import ReportPageHeader from "@/components/relatorios/ReportPageHeader";
import ReportTabs from "@/components/relatorios/ReportTabs";

const RelatoriosPage = () => {
  const navigate = useNavigate();
  
  const handleDownload = (reportName: string) => {
    toast({
      title: "Iniciando download",
      description: `O relatório ${reportName} será baixado em instantes.`,
    });
  };

  const handleApplyFilters = () => {
    toast({
      title: "Filtros aplicados",
      description: "Os relatórios foram filtrados conforme solicitado.",
    });
  };

  const handleClearFilters = () => {
    toast({
      title: "Filtros removidos",
      description: "Todos os filtros foram removidos.",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1">
        <DashboardHeader 
          title="Relatórios" 
          description="Visualize e baixe relatórios importantes" 
        />
        
        <main className="flex-1 p-6">
          <ReportPageHeader 
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          />
          
          <ReportTabs onDownload={handleDownload} />
        </main>
      </div>
    </div>
  );
};

export default RelatoriosPage;
