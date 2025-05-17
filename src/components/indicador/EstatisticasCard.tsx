
import React from "react";

type EstatisticasCardProps = {
  titulo: string;
  valor: number | string;
  icone: React.ElementType;
  cor: "blue" | "green" | "orange" | "purple" | "red";
  isMonetary?: boolean;
};

const EstatisticasCard = ({ 
  titulo, 
  valor, 
  icone: Icon, 
  cor, 
  isMonetary = false 
}: EstatisticasCardProps) => {
  const getCor = () => {
    switch (cor) {
      case "blue": return "bg-blue-100 text-blue-600";
      case "green": return "bg-green-100 text-green-600";
      case "orange": return "bg-orange-100 text-orange-600";
      case "purple": return "bg-purple-100 text-purple-600";
      case "red": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6 transition-all hover:-translate-y-1 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{titulo}</p>
          <p className="text-2xl font-bold text-gray-800">
            {valor}
          </p>
        </div>
        <div className={`p-3 rounded-full ${getCor()}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default EstatisticasCard;
