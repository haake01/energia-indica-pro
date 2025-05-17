
import React from "react";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LeadFilter } from "@/types/lead";
import { interesses, statusOptions } from "@/data/mockLeads";

interface LeadFilterBarProps {
  filters: LeadFilter;
  onFilterChange: (filters: LeadFilter) => void;
  onResetFilters: () => void;
}

const LeadFilterBar: React.FC<LeadFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, termo: e.target.value });
  };

  const handleSelectChange = (field: keyof LeadFilter, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  const handleDateChange = (field: keyof LeadFilter, value: string) => {
    onFilterChange({ ...filters, [field]: value });
  };

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-gray-500" />
          <h3 className="font-medium">Filtros</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 flex items-center gap-1 hover:text-brand-orange"
          onClick={onResetFilters}
        >
          <X size={16} />
          <span>Limpar filtros</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Buscar por nome, email..."
            className="pl-10"
            value={filters.termo || ""}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <Select
            value={filters.tipoPessoa || "todos"}
            onValueChange={(value) => handleSelectChange("tipoPessoa", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Tipo de pessoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="pf">Pessoa Física</SelectItem>
              <SelectItem value="pj">Pessoa Jurídica</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Select
            value={filters.interesse || "todos"}
            onValueChange={(value) => handleSelectChange("interesse", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Área de interesse" />
            </SelectTrigger>
            <SelectContent>
              {interesses.map((opcao) => (
                <SelectItem key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Select
            value={filters.status || "todos"}
            onValueChange={(value) => handleSelectChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((opcao) => (
                <SelectItem key={opcao.value} value={opcao.value}>
                  {opcao.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dataInicio" className="mb-1 text-sm block">
            Data inicial
          </Label>
          <Input
            id="dataInicio"
            type="date"
            value={filters.dataInicio || ""}
            onChange={(e) => handleDateChange("dataInicio", e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="dataFim" className="mb-1 text-sm block">
            Data final
          </Label>
          <Input
            id="dataFim"
            type="date"
            value={filters.dataFim || ""}
            onChange={(e) => handleDateChange("dataFim", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LeadFilterBar;
