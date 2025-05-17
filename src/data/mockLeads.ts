
import { Lead } from "@/types/lead";

export const mockLeads: Lead[] = [
  {
    id: "1",
    tipoPessoa: "pf",
    nome: "Maria Silva",
    email: "maria.silva@email.com",
    telefone: "(11) 98765-4321",
    cpf: "123.456.789-00",
    interesse: "energia",
    observacoes: "Cliente interessado em economia de energia",
    dataCadastro: "2025-05-01",
    status: "novo"
  },
  {
    id: "2",
    tipoPessoa: "pj",
    razaoSocial: "Comércio Exemplo LTDA",
    nomeFantasia: "Loja Exemplo",
    email: "contato@exemplo.com",
    telefone: "(11) 3333-4444",
    cnpj: "12.345.678/0001-90",
    interesse: "internet",
    contato: "João Gerente",
    dataCadastro: "2025-05-05",
    status: "contatado"
  },
  {
    id: "3",
    tipoPessoa: "pf",
    nome: "Carlos Pereira",
    email: "carlos.pereira@email.com",
    telefone: "(11) 91234-5678",
    cpf: "987.654.321-00",
    interesse: "agua",
    observacoes: "Necessita de economia urgente",
    dataCadastro: "2025-05-08",
    status: "convertido"
  },
  {
    id: "4",
    tipoPessoa: "pj",
    razaoSocial: "Consultoria Empresarial S.A.",
    nomeFantasia: "ConsultaTech",
    email: "atendimento@consultatech.com",
    telefone: "(11) 2222-3333",
    cnpj: "98.765.432/0001-10",
    interesse: "consultoria",
    contato: "Ana Diretora",
    dataCadastro: "2025-05-10",
    status: "contatado"
  },
  {
    id: "5",
    tipoPessoa: "pf",
    nome: "Roberto Almeida",
    email: "roberto.almeida@email.com",
    telefone: "(11) 97777-8888",
    cpf: "111.222.333-44",
    interesse: "energia",
    dataCadastro: "2025-05-12",
    status: "perdido"
  }
];

export const interesses = [
  { value: "todos", label: "Todos" },
  { value: "energia", label: "Energia Solar" },
  { value: "internet", label: "Internet Fibra" },
  { value: "agua", label: "Economia de Água" },
  { value: "consultoria", label: "Consultoria Empresarial" },
];

export const statusOptions = [
  { value: "todos", label: "Todos" },
  { value: "novo", label: "Novo" },
  { value: "contatado", label: "Contatado" },
  { value: "convertido", label: "Convertido" },
  { value: "perdido", label: "Perdido" },
];
