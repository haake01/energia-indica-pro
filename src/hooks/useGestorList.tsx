
import { useState, useEffect, useMemo } from "react";
import { Gestor, GestorFilter } from "@/types/gestor";
import { mockGestores } from "@/data/mockGestores";

export const useGestorList = () => {
  const [gestores, setGestores] = useState<Gestor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<GestorFilter>({
    status: "todos",
    departamento: "todos",
  });

  // Simula uma chamada API para buscar gestores
  useEffect(() => {
    const fetchGestores = () => {
      setTimeout(() => {
        setGestores(mockGestores);
        setIsLoading(false);
      }, 800);
    };

    fetchGestores();
  }, []);

  // Filtra os gestores com base nos filtros atuais
  const filteredGestores = useMemo(() => {
    return gestores.filter((gestor) => {
      // Filtro por status
      if (filters.status && filters.status !== "todos") {
        if (gestor.status !== filters.status) return false;
      }

      // Filtro por departamento
      if (filters.departamento && filters.departamento !== "todos") {
        if (gestor.departamento !== filters.departamento) return false;
      }

      // Filtro por data inicial
      if (filters.dataInicio) {
        const dataInicio = new Date(filters.dataInicio);
        const dataCadastro = new Date(gestor.dataCadastro);
        if (dataCadastro < dataInicio) return false;
      }

      // Filtro por data final
      if (filters.dataFim) {
        const dataFim = new Date(filters.dataFim);
        dataFim.setHours(23, 59, 59); // Final do dia
        const dataCadastro = new Date(gestor.dataCadastro);
        if (dataCadastro > dataFim) return false;
      }

      // Filtro por termo de busca
      if (filters.termo && filters.termo.trim() !== "") {
        const termo = filters.termo.toLowerCase().trim();
        const gestorString = `${gestor.nome} ${gestor.email} ${gestor.cargo} ${gestor.departamento}`.toLowerCase();
        
        if (!gestorString.includes(termo)) return false;
      }

      return true;
    });
  }, [gestores, filters]);

  // Função para atualizar os filtros
  const updateFilters = (newFilters: GestorFilter) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Função para resetar os filtros
  const resetFilters = () => {
    setFilters({
      status: "todos",
      departamento: "todos",
    });
  };

  return {
    gestores: filteredGestores,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
  };
};
