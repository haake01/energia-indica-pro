
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { Lead } from "@/types/lead";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { toast } from "@/hooks/use-toast";

interface ReportPdfExportProps {
  title: string;
  leads: Lead[];
  filters?: Record<string, any>;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

const ReportPdfExport: React.FC<ReportPdfExportProps> = ({ title, leads, filters }) => {
  const exportToPdf = () => {
    try {
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text(title, 14, 22);
      
      // Add date
      doc.setFontSize(11);
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 14, 30);
      
      // Add filters if provided
      if (filters) {
        let filterText = "Filtros aplicados: ";
        let filterCount = 0;
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== "todos") {
            filterText += `${key}: ${value}; `;
            filterCount++;
          }
        });
        
        if (filterCount > 0) {
          doc.text(filterText, 14, 38);
        }
      }
      
      // Transform lead data for the table
      const tableData = leads.map(lead => [
        lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial,
        lead.tipoPessoa === "pf" ? "Pessoa Física" : "Pessoa Jurídica",
        lead.email,
        lead.telefone,
        getInterestLabel(lead.interesse),
        getStatusLabel(lead.status),
        new Date(lead.dataCadastro).toLocaleDateString('pt-BR')
      ]);
      
      // Create the table
      doc.autoTable({
        startY: filters ? 45 : 38,
        head: [['Nome/Razão Social', 'Tipo', 'Email', 'Telefone', 'Interesse', 'Status', 'Data']],
        body: tableData,
        headStyles: { 
          fillColor: [0, 48, 135], // Azul Royal aproximado
          textColor: [255, 255, 255]
        },
        alternateRowStyles: {
          fillColor: [240, 240, 240]
        },
        styles: {
          fontSize: 9
        }
      });
      
      // Add logo and footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text("Lex+ENERGIA - Sistema de Indicações", 14, doc.internal.pageSize.height - 10);
      
      // Save the PDF
      doc.save(`${title.toLowerCase().replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.pdf`);
      
      toast({
        title: "Relatório exportado com sucesso!",
        description: "O arquivo PDF foi gerado e baixado."
      });
    } catch (error) {
      console.error("Erro ao exportar relatório:", error);
      toast({
        variant: "destructive",
        title: "Erro na exportação",
        description: "Não foi possível gerar o relatório PDF."
      });
    }
  };
  
  // Função para obter o label do status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "novo":
        return "Novo";
      case "contatado":
        return "Contatado";
      case "convertido":
        return "Convertido";
      case "perdido":
        return "Perdido";
      default:
        return status;
    }
  };

  // Função para obter o label do interesse
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

  return (
    <Button
      onClick={exportToPdf}
      className="bg-brand-blue hover:bg-brand-blue-dark text-white"
      disabled={leads.length === 0}
    >
      <Download className="mr-2 h-4 w-4" />
      Exportar PDF
    </Button>
  );
};

export default ReportPdfExport;
