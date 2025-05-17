
import * as z from "zod";

// Esquema de validação para Pessoa Física
export const pessoaFisicaSchema = z.object({
  tipoPessoa: z.literal("pf"),
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  interesse: z.string().min(1, "Selecione um interesse"),
  observacoes: z.string().optional(),
});

// Esquema de validação para Pessoa Jurídica
export const pessoaJuridicaSchema = z.object({
  tipoPessoa: z.literal("pj"),
  razaoSocial: z.string().min(3, "Razão social deve ter pelo menos 3 caracteres"),
  nomeFantasia: z.string().optional(),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cnpj: z.string().min(14, "CNPJ inválido"),
  interesse: z.string().min(1, "Selecione um interesse"),
  observacoes: z.string().optional(),
  contato: z.string().min(3, "Nome do contato deve ter pelo menos 3 caracteres"),
});

// União dos esquemas
export const formSchema = z.discriminatedUnion("tipoPessoa", [
  pessoaFisicaSchema,
  pessoaJuridicaSchema,
]);

export type FormValues = z.infer<typeof formSchema>;
