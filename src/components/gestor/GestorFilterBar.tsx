
import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GestorFilter } from "@/types/gestor";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { departamentos, statusOptions } from "@/data/mockGestores";
import { ptBR } from "date-fns/locale";

interface GestorFilterBarProps {
  filters: GestorFilter;
  onFilterChange: (filters: GestorFilter) => void;
  onResetFilters: () => void;
}

const GestorFilterBar: React.FC<GestorFilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState(filters.termo || "");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onFilterChange({ ...filters, termo: searchTerm });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleStatusChange = (value: string) => {
    onFilterChange({
      ...filters,
      status: value as "ativo" | "inativo" | "todos",
    });
  };

  const handleDepartamentoChange = (value: string) => {
    onFilterChange({ ...filters, departamento: value });
  };

  const handleDataInicioChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dataInicio: date ? format(date, "yyyy-MM-dd") : undefined,
    });
  };

  const handleDataFimChange = (date: Date | undefined) => {
    onFilterChange({
      ...filters,
      dataFim: date ? format(date, "yyyy-MM-dd") : undefined,
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar gestor por nome, email..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          >
            <Filter className="h-4 w-4" />
            <span>Filtros</span>
          </Button>

          <Button onClick={handleSearch}>Buscar</Button>
        </div>
      </div>

      {isFilterExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Filtro por Status */}
            <div>
              <label className="text-sm font-medium mb-1 block">Status</label>
              <Select
                value={filters.status || "todos"}
                onValueChange={handleStatusChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Departamento */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Departamento
              </label>
              <Select
                value={filters.departamento || "todos"}
                onValueChange={handleDepartamentoChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o departamento" />
                </SelectTrigger>
                <SelectContent>
                  {departamentos.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filtro por Data Início */}
            <div>
              <label className="text-sm font-medium mb-1 block">
                Data Inicial
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {filters.dataInicio ? (
                      format(new Date(filters.dataInicio), "dd/MM/yyyy")
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dataInicio ? new Date(filters.dataInicio) : undefined}
                    onSelect={handleDataInicioChange}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Filtro por Data Fim */}
            <div>
              <label className="text-sm font-medium mb-1 block">Data Final</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    {filters.dataFim ? (
                      format(new Date(filters.dataFim), "dd/MM/yyyy")
                    ) : (
                      <span>Escolha uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={filters.dataFim ? new Date(filters.dataFim) : undefined}
                    onSelect={handleDataFimChange}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={onResetFilters}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              <span>Limpar Filtros</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GestorFilterBar;
