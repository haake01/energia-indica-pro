
import React from "react";
import { Check, Clock, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

type Indicacao = {
  id: string;
  nome: string;
  valorFatura: number;
  status: "aprovada" | "pendente" | "rejeitada";
  dataIndicacao: string;
  comissao: number;
};

type IndicacaoCardProps = {
  indicacao: Indicacao;
};

const IndicacaoCard = ({ indicacao }: IndicacaoCardProps) => {
  const getStatusInfo = () => {
    switch (indicacao.status) {
      case "aprovada":
        return {
          icon: Check,
          text: "Aprovada",
          color: "text-green-600 bg-green-50",
          iconColor: "bg-green-100 text-green-600"
        };
      case "pendente":
        return {
          icon: Clock,
          text: "Pendente",
          color: "text-orange-600 bg-orange-50",
          iconColor: "bg-orange-100 text-orange-600"
        };
      case "rejeitada":
        return {
          icon: AlertCircle,
          text: "Rejeitada",
          color: "text-red-600 bg-red-50",
          iconColor: "bg-red-100 text-red-600"
        };
      default:
        return {
          icon: Clock,
          text: "Desconhecido",
          color: "text-gray-600 bg-gray-50",
          iconColor: "bg-gray-100 text-gray-600"
        };
    }
  };

  const statusInfo = getStatusInfo();
  const StatusIcon = statusInfo.icon;
  
  // Calcular tempo relativo
  const tempoRelativo = formatDistanceToNow(new Date(indicacao.dataIndicacao), { 
    addSuffix: true,
    locale: ptBR 
  });
  
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="col-span-2 md:col-span-1">
          <div className="font-medium text-gray-700">{indicacao.nome}</div>
          <div className="text-sm text-gray-500">{tempoRelativo}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Valor da Fatura</div>
          <div className="font-medium">R$ {indicacao.valorFatura.toFixed(2)}</div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Comissão</div>
          <div className={`font-medium ${
            indicacao.comissao > 0 ? 'text-green-600' : 'text-gray-400'
          }`}>
            R$ {indicacao.comissao.toFixed(2)}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-gray-500">Status</div>
          <div className="flex items-center">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {statusInfo.text}
            </span>
          </div>
        </div>
        
        <div className="md:col-span-1 flex items-center justify-end">
          <button className="text-sm text-brand-blue hover:text-brand-blue-light transition-colors">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndicacaoCard;
