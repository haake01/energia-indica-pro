
import * as z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/jpg"];

// Esquema de validação para Pessoa Física
export const pessoaFisicaSchema = z.object({
  tipoPessoa: z.literal("pf"),
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  interesse: z.string().min(1, "Selecione um interesse"),
  observacoes: z.string().optional(),
  fatura: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, "Arquivo muito grande. Tamanho máximo: 5MB")
    .refine(
      file => ACCEPTED_FILE_TYPES.includes(file.type),
      "Formato de arquivo não suportado. Use PDF, JPEG ou PNG"
    )
    .optional(),
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
  fatura: z.instanceof(File)
    .refine(file => file.size <= MAX_FILE_SIZE, "Arquivo muito grande. Tamanho máximo: 5MB")
    .refine(
      file => ACCEPTED_FILE_TYPES.includes(file.type),
      "Formato de arquivo não suportado. Use PDF, JPEG ou PNG"
    )
    .optional(),
});

// União dos esquemas
export const formSchema = z.discriminatedUnion("tipoPessoa", [
  pessoaFisicaSchema,
  pessoaJuridicaSchema,
]);

export type FormValues = z.infer<typeof formSchema>;
