
import React from "react";
import { Gestor } from "@/types/gestor";
import { User, Calendar, Phone, Mail, Briefcase, Building } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface GestorListItemProps {
  gestor: Gestor;
}

const GestorListItem: React.FC<GestorListItemProps> = ({ gestor }) => {
  // Função para formatar data
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  // Função para obter a cor do status
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo":
        return "bg-green-500";
      case "inativo":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  // Função para obter o label do status
  const getStatusLabel = (status: string) => {
    switch (status) {
      case "ativo":
        return "Ativo";
      case "inativo":
        return "Inativo";
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <div className="bg-blue-100 p-2 rounded-full">
            <User className="h-5 w-5 text-brand-blue" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{gestor.nome}</h3>
            <p className="text-sm text-gray-500">{gestor.cargo}</p>
          </div>
        </div>
        <Badge className={`${getStatusColor(gestor.status)} text-white`}>
          {getStatusLabel(gestor.status)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="h-4 w-4" />
          <span>{gestor.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="h-4 w-4" />
          <span>{gestor.telefone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Building className="h-4 w-4" />
          <span>Departamento: {gestor.departamento}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="h-4 w-4" />
          <span>Cadastrado em: {formatDate(gestor.dataCadastro)}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {gestor.permissoes.map((permissao) => (
          <span key={permissao} className="bg-gray-100 px-2 py-1 text-xs rounded-full">
            {permissao.replace(/_/g, ' ')}
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Button size="sm" variant="outline">
          Detalhes
        </Button>
        <Button size="sm" className="bg-brand-orange hover:bg-brand-orange/90">
          Editar
        </Button>
      </div>
    </div>
  );
};

export default GestorListItem;
