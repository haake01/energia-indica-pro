
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, User, Building, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validação para Pessoa Física
const pessoaFisicaSchema = z.object({
  tipoPessoa: z.literal("pf"),
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cpf: z.string().min(11, "CPF inválido"),
  interesse: z.string().min(1, "Selecione um interesse"),
  observacoes: z.string().optional(),
});

// Esquema de validação para Pessoa Jurídica
const pessoaJuridicaSchema = z.object({
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
const formSchema = z.discriminatedUnion("tipoPessoa", [
  pessoaFisicaSchema,
  pessoaJuridicaSchema,
]);

type FormValues = z.infer<typeof formSchema>;

const interesses = [
  { value: "energia", label: "Energia Solar" },
  { value: "internet", label: "Internet Fibra" },
  { value: "agua", label: "Economia de Água" },
  { value: "consultoria", label: "Consultoria Empresarial" },
];

const CadastroLeadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState<"pf" | "pj">("pf");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tipoPessoa: "pf",
      nome: "",
      email: "",
      telefone: "",
      cpf: "",
      interesse: "",
      observacoes: "",
    },
    mode: "onChange",
  });

  // Atualiza o formulário quando o tipo de pessoa muda
  const handleTipoPessoaChange = (value: "pf" | "pj") => {
    setTipoPessoa(value);
    form.reset({
      tipoPessoa: value,
      ...(value === "pf"
        ? {
            nome: "",
            email: "",
            telefone: "",
            cpf: "",
            interesse: "",
            observacoes: "",
          }
        : {
            razaoSocial: "",
            nomeFantasia: "",
            email: "",
            telefone: "",
            cnpj: "",
            interesse: "",
            observacoes: "",
            contato: "",
          }),
    });
  };

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    // Simulação de envio para API
    setTimeout(() => {
      console.log("Dados do lead:", data);
      
      toast({
        title: "Lead cadastrado com sucesso!",
        description: "O lead foi registrado em nosso sistema.",
      });
      
      form.reset();
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-4xl mx-auto p-6 space-y-8 my-10">
        <div className="flex items-center">
          <Link to="/indicador/painel" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar ao painel</span>
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Cadastro de Lead</h1>
          <p className="text-gray-600 mb-8">
            Preencha os dados abaixo para cadastrar um novo lead
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Tipo de Pessoa */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h2 className="text-lg font-semibold mb-4">Tipo de Lead</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
                    tipoPessoa === "pf"
                      ? "bg-blue-50 border-blue-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTipoPessoaChange("pf")}
                >
                  <User className="text-brand-blue" />
                  <span className="font-medium">Pessoa Física</span>
                </button>
                <button
                  type="button"
                  className={`flex items-center justify-center gap-3 p-4 rounded-lg border ${
                    tipoPessoa === "pj"
                      ? "bg-blue-50 border-blue-300"
                      : "bg-white border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => handleTipoPessoaChange("pj")}
                >
                  <Building className="text-brand-blue" />
                  <span className="font-medium">Pessoa Jurídica</span>
                </button>
              </div>
              <FormField
                control={form.control}
                name="tipoPessoa"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="hidden"
                      >
                        <RadioGroupItem value="pf" id="pf" />
                        <RadioGroupItem value="pj" id="pj" />
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            {/* Formulário dinâmico baseado no tipo de pessoa */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">
              {tipoPessoa === "pf" ? (
                <>
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo*</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail*</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone*</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF*</FormLabel>
                        <FormControl>
                          <Input placeholder="000.000.000-00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              ) : (
                <>
                  <FormField
                    control={form.control}
                    name="razaoSocial"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Razão Social*</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite a razão social" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="nomeFantasia"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                          <Input placeholder="Digite o nome fantasia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>E-mail*</FormLabel>
                          <FormControl>
                            <Input placeholder="email@exemplo.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="telefone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Telefone*</FormLabel>
                          <FormControl>
                            <Input placeholder="(00) 00000-0000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ*</FormLabel>
                          <FormControl>
                            <Input placeholder="00.000.000/0000-00" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="contato"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome do contato*</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome do responsável" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </>
              )}
              
              <FormField
                control={form.control}
                name="interesse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Área de interesse*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma área de interesse" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {interesses.map((interesse) => (
                          <SelectItem key={interesse.value} value={interesse.value}>
                            {interesse.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais sobre o lead"
                        className="resize-none min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full md:w-auto bg-brand-orange hover:bg-brand-orange/90 text-white h-12 rounded-full px-8"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  <span>Cadastrar Lead</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CadastroLeadPage;
