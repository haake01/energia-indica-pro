
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReportFilterDialog from "./ReportFilterDialog";

interface ReportPageHeaderProps {
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const ReportPageHeader = ({ onApplyFilters, onClearFilters }: ReportPageHeaderProps) => {
  return (
    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Relatórios Disponíveis</h1>
        <p className="text-gray-600">Acesse todos os seus dados e estatísticas em formato PDF</p>
      </div>
      
      <div className="flex items-center gap-4">
        <Select defaultValue="mes">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="mes">Último mês</SelectItem>
            <SelectItem value="trimestre">Último trimestre</SelectItem>
            <SelectItem value="semestre">Último semestre</SelectItem>
            <SelectItem value="ano">Último ano</SelectItem>
          </SelectContent>
        </Select>
        
        <ReportFilterDialog 
          onApplyFilters={onApplyFilters}
          onClearFilters={onClearFilters}
        />
      </div>
    </div>
  );
};

export default ReportPageHeader;
