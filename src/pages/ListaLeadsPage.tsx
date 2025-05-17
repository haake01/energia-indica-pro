
import React from "react";
import { Link } from "react-router-dom";
import { Plus, Filter, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import LeadFilterBar from "@/components/lead/LeadFilterBar";
import LeadListItem from "@/components/lead/LeadListItem";
import { useLeadList } from "@/hooks/useLeadList";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ListaLeadsPage = () => {
  const { leads, isLoading, filters, updateFilters, resetFilters } = useLeadList();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="w-full max-w-6xl mx-auto p-6 space-y-6 my-10">
        <div className="flex items-center justify-between">
          <Link to="/indicador/painel" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar ao painel</span>
          </Link>
          
          <Link to="/indicador/cadastrar-lead">
            <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white flex items-center gap-2">
              <Plus size={18} />
              <span>Cadastrar novo lead</span>
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Leads Cadastrados</h1>
          <p className="text-gray-600">
            Gerencie seus leads e acompanhe o status de cada indicação
          </p>
        </div>

        {/* Barra de filtros */}
        <LeadFilterBar
          filters={filters}
          onFilterChange={updateFilters}
          onResetFilters={resetFilters}
        />

        {/* Lista de leads */}
        <div className="space-y-4">
          {isLoading ? (
            // Estado de carregamento
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                  <Skeleton className="h-6 w-24" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-40" />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </div>
            ))
          ) : leads.length === 0 ? (
            // Estado sem resultados
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <Filter className="mx-auto h-12 w-12 text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">Nenhum lead encontrado</h3>
              <p className="text-gray-500 mb-4">
                Tente ajustar os filtros ou cadastre novos leads para começar.
              </p>
              <Link to="/indicador/cadastrar-lead">
                <Button className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                  Cadastrar novo lead
                </Button>
              </Link>
            </div>
          ) : (
            // Lista de leads
            leads.map((lead) => <LeadListItem key={lead.id} lead={lead} />)
          )}
        </div>

        {/* Paginação */}
        {leads.length > 0 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default ListaLeadsPage;
