
export interface Gestor {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  departamento: string;
  dataCadastro: string;
  status: "ativo" | "inativo";
  permissoes: string[];
}

export type GestorFilter = {
  status?: "ativo" | "inativo" | "todos";
  departamento?: string;
  dataInicio?: string;
  dataFim?: string;
  termo?: string;
};
