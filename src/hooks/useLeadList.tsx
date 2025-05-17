
import { useState, useEffect, useMemo } from "react";
import { Lead, LeadFilter } from "@/types/lead";
import { mockLeads } from "@/data/mockLeads";

export const useLeadList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<LeadFilter>({
    tipoPessoa: "todos",
    interesse: "todos",
    status: "todos",
  });

  // Simula uma chamada API para buscar leads
  useEffect(() => {
    const fetchLeads = () => {
      setTimeout(() => {
        setLeads(mockLeads);
        setIsLoading(false);
      }, 800);
    };

    fetchLeads();
  }, []);

  // Filtra os leads com base nos filtros atuais
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      // Filtro por tipo de pessoa
      if (filters.tipoPessoa && filters.tipoPessoa !== "todos") {
        if (lead.tipoPessoa !== filters.tipoPessoa) return false;
      }

      // Filtro por interesse
      if (filters.interesse && filters.interesse !== "todos") {
        if (lead.interesse !== filters.interesse) return false;
      }

      // Filtro por status
      if (filters.status && filters.status !== "todos") {
        if (lead.status !== filters.status) return false;
      }

      // Filtro por data inicial
      if (filters.dataInicio) {
        const dataInicio = new Date(filters.dataInicio);
        const dataCadastro = new Date(lead.dataCadastro);
        if (dataCadastro < dataInicio) return false;
      }

      // Filtro por data final
      if (filters.dataFim) {
        const dataFim = new Date(filters.dataFim);
        dataFim.setHours(23, 59, 59); // Final do dia
        const dataCadastro = new Date(lead.dataCadastro);
        if (dataCadastro > dataFim) return false;
      }

      // Filtro por termo de busca
      if (filters.termo && filters.termo.trim() !== "") {
        const termo = filters.termo.toLowerCase().trim();
        const leadString = `${lead.nome || ""} ${lead.razaoSocial || ""} ${
          lead.nomeFantasia || ""
        } ${lead.email || ""} ${lead.telefone || ""}`.toLowerCase();
        
        if (!leadString.includes(termo)) return false;
      }

      return true;
    });
  }, [leads, filters]);

  // Função para atualizar os filtros
  const updateFilters = (newFilters: LeadFilter) => {
    setFilters(newFilters);
  };

  // Função para resetar os filtros
  const resetFilters = () => {
    setFilters({
      tipoPessoa: "todos",
      interesse: "todos",
      status: "todos",
    });
  };

  return {
    leads: filteredLeads,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
  };
};
