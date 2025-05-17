
import { Gestor } from "@/types/gestor";

export const mockGestores: Gestor[] = [
  {
    id: "1",
    nome: "Rodrigo Silva",
    email: "rodrigo.silva@empresa.com",
    telefone: "(11) 99876-5432",
    cargo: "Coordenador de Vendas",
    departamento: "Vendas",
    dataCadastro: "2025-03-15",
    status: "ativo",
    permissoes: ["visualizar_leads", "editar_leads", "relatorios_basicos"]
  },
  {
    id: "2",
    nome: "Carla Santos",
    email: "carla.santos@empresa.com",
    telefone: "(11) 98765-4321",
    cargo: "Gerente de Marketing",
    departamento: "Marketing",
    dataCadastro: "2025-02-10",
    status: "ativo",
    permissoes: ["visualizar_leads", "editar_leads", "relatorios_avancados", "aprovar_indicacoes"]
  },
  {
    id: "3",
    nome: "André Oliveira",
    email: "andre.oliveira@empresa.com",
    telefone: "(11) 97654-3210",
    cargo: "Diretor Comercial",
    departamento: "Diretoria",
    dataCadastro: "2025-01-05",
    status: "ativo",
    permissoes: ["visualizar_leads", "editar_leads", "relatorios_avancados", "aprovar_indicacoes", "gerenciar_usuarios"]
  },
  {
    id: "4",
    nome: "Patricia Mendes",
    email: "patricia.mendes@empresa.com",
    telefone: "(11) 96543-2109",
    cargo: "Analista de Marketing",
    departamento: "Marketing",
    dataCadastro: "2025-04-01",
    status: "inativo",
    permissoes: ["visualizar_leads", "relatorios_basicos"]
  }
];

export const departamentos = [
  { value: "todos", label: "Todos" },
  { value: "Vendas", label: "Vendas" },
  { value: "Marketing", label: "Marketing" },
  { value: "Diretoria", label: "Diretoria" },
  { value: "Financeiro", label: "Financeiro" },
  { value: "RH", label: "Recursos Humanos" },
];

export const statusOptions = [
  { value: "todos", label: "Todos" },
  { value: "ativo", label: "Ativo" },
  { value: "inativo", label: "Inativo" },
];
