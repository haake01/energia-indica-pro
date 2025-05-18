
import React, { useState } from "react";
import { Lead } from "@/types/lead";
import { User, Building, Calendar, Phone, Mail, FileText, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLeadList } from "@/hooks/useLeadList";

interface LeadListItemProps {
  lead: Lead;
}

const LeadListItem: React.FC<LeadListItemProps> = ({ lead }) => {
  const [showFatura, setShowFatura] = useState(false);
  const { updateLeadStatus, userRole } = useLeadList();
  
  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "novo":
        return "bg-blue-500";
      case "contatado":
        return "bg-yellow-500";
      case "convertido":
        return "bg-green-500";
      case "perdido":
        return "bg-red-500";
      default:
        return "bg-gray-500";
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
  
  // Função para atualizar status
  const handleStatusUpdate = async (newStatus: string) => {
    if (lead.id) {
      await updateLeadStatus(lead.id, newStatus);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          {lead.tipoPessoa === "pf" ? (
            <div className="bg-blue-100 p-2 rounded-full">
              <User className="h-5 w-5 text-brand-blue" />
            </div>
          ) : (
            <div className="bg-blue-100 p-2 rounded-full">
              <Building className="h-5 w-5 text-brand-blue" />
            </div>
          )}
          <div>
            <h3 className="font-medium text-lg">
              {lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}
            </h3>
            {lead.tipoPessoa === "pj" && lead.nomeFantasia && (
              <p className="text-sm text-gray-500">{lead.nomeFantasia}</p>
            )}
          </div>
        </div>
        <Badge className={`${getStatusColor(lead.status)} text-white`}>
          {getStatusLabel(lead.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{lead.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{lead.telefone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Cadastrado em: {formatDate(lead.dataCadastro)}</span>
        </div>
        <div className="text-sm">
          <span className="bg-gray-100 px-2 py-1 rounded-full">
            {getInterestLabel(lead.interesse)}
          </span>
        </div>
      </div>

      {lead.observacoes && (
        <p className="text-sm text-gray-600 mb-4 border-t pt-2">
          {lead.observacoes}
        </p>
      )}

      <div className="flex justify-end gap-2">
        {lead.faturaUrl && (
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => setShowFatura(true)}
            className="flex items-center gap-1"
          >
            <FileText className="h-4 w-4" />
            Ver Fatura
          </Button>
        )}
        
        {userRole === 'gestor' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <MoreHorizontal className="h-4 w-4" />
                Atualizar Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusUpdate("novo")}>
                Novo
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate("contatado")}>
                Contatado
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate("convertido")}>
                Convertido
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate("perdido")}>
                Perdido
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <Button 
          size="sm" 
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          Contatar
        </Button>
      </div>
      
      {/* Fatura Viewer Dialog */}
      {lead.faturaUrl && (
        <Dialog open={showFatura} onOpenChange={setShowFatura}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Fatura de {lead.tipoPessoa === "pf" ? lead.nome : lead.razaoSocial}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              {lead.faturaUrl.endsWith('.pdf') ? (
                <iframe 
                  src={lead.faturaUrl} 
                  className="w-full h-[70vh]"
                  title="Visualização da fatura"
                />
              ) : (
                <img 
                  src={lead.faturaUrl} 
                  alt="Fatura" 
                  className="max-w-full max-h-[70vh] mx-auto"
                />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default LeadListItem;
