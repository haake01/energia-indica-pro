
import { useState, useEffect, useMemo } from "react";
import { Lead, LeadFilter } from "@/types/lead";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";

export const useLeadList = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<LeadFilter>({
    tipoPessoa: "todos",
    interesse: "todos",
    status: "todos",
  });
  const [userRole, setUserRole] = useState<"indicador" | "gestor" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Fetch user session and determine role
  useEffect(() => {
    const fetchUserSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        const userId = data.session.user.id;
        setUserId(userId);
        
        // Check if user is a gestor
        const { data: gestorData } = await supabase
          .from('gestores')
          .select('id')
          .eq('id', userId)
          .single();
          
        if (gestorData) {
          setUserRole('gestor');
        } else {
          setUserRole('indicador');
        }
      }
    };
    
    fetchUserSession();
  }, []);

  // Fetch leads from Supabase
  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true);
      
      try {
        if (!userId || !userRole) return;
        
        let query = supabase.from('leads').select('*');
        
        // If user is an indicador, only show their leads
        if (userRole === 'indicador') {
          query = query.eq('indicadorId', userId);
        }
        
        // Apply filters from state if needed
        if (filters.tipoPessoa && filters.tipoPessoa !== "todos") {
          query = query.eq('tipoPessoa', filters.tipoPessoa);
        }
        
        if (filters.interesse && filters.interesse !== "todos") {
          query = query.eq('interesse', filters.interesse);
        }
        
        if (filters.status && filters.status !== "todos") {
          query = query.eq('status', filters.status);
        }
        
        if (filters.dataInicio) {
          query = query.gte('dataCadastro', filters.dataInicio);
        }
        
        if (filters.dataFim) {
          const endDate = new Date(filters.dataFim);
          endDate.setHours(23, 59, 59);
          query = query.lte('dataCadastro', endDate.toISOString());
        }
        
        if (filters.termo && filters.termo.trim() !== "") {
          const termo = filters.termo.toLowerCase().trim();
          query = query.or(`nome.ilike.%${termo}%,razaoSocial.ilike.%${termo}%,email.ilike.%${termo}%`);
        }
        
        // Order by date descending (newest first)
        query = query.order('dataCadastro', { ascending: false });
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setLeads(data || []);
      } catch (error: any) {
        console.error("Erro ao buscar leads:", error);
        toast({
          title: "Erro ao carregar leads",
          description: error.message || "Não foi possível carregar seus leads. Tente novamente mais tarde.",
          variant: "destructive",
        });
        setLeads([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeads();
  }, [userId, userRole, filters]);

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

  // Função para atualizar status do lead (apenas para gestores)
  const updateLeadStatus = async (leadId: string, newStatus: string) => {
    if (userRole !== 'gestor') {
      toast({
        title: "Permissão negada",
        description: "Apenas gestores podem atualizar o status dos leads.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status: newStatus })
        .eq('id', leadId);
        
      if (error) {
        throw error;
      }
      
      // Update local state
      setLeads(prev => 
        prev.map(lead => 
          lead.id === leadId ? { ...lead, status: newStatus as any } : lead
        )
      );
      
      toast({
        title: "Status atualizado",
        description: `O status do lead foi atualizado para ${newStatus}.`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      toast({
        title: "Erro ao atualizar status",
        description: error.message || "Não foi possível atualizar o status do lead.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    leads,
    isLoading,
    filters,
    updateFilters,
    resetFilters,
    updateLeadStatus,
    userRole
  };
};
