
export interface Lead {
  id: string;
  tipoPessoa: "pf" | "pj";
  nome?: string;
  razaoSocial?: string;
  nomeFantasia?: string;
  email: string;
  telefone: string;
  cpf?: string;
  cnpj?: string;
  interesse: string;
  observacoes?: string;
  contato?: string;
  dataCadastro: string;
  status: "novo" | "contatado" | "convertido" | "perdido";
}

export type LeadFilter = {
  tipoPessoa?: "pf" | "pj" | "todos";
  interesse?: string;
  status?: string;
  dataInicio?: string;
  dataFim?: string;
  termo?: string;
};
