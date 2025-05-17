
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/schemas/leadFormSchema";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

export const useLeadForm = () => {
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

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    
    try {
      let faturaUrl = null;
      
      // Upload fatura se existir
      if (data.fatura) {
        // Em um cenário real, este seria o bucket do Supabase
        // const { data: fileData, error } = await supabase.storage
        //  .from('faturas')
        //  .upload(`${Date.now()}-${data.fatura.name}`, data.fatura);
        
        // if (error) throw error;
        // faturaUrl = fileData?.path;
        
        // Simulação de upload
        faturaUrl = URL.createObjectURL(data.fatura);
        
        // Simulação de atraso de upload
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      
      // Dados a serem salvos
      const leadData = {
        ...data,
        faturaUrl,
        dataCadastro: new Date().toISOString(),
        status: "novo",
        indicadorId: "user-123", // Em um app real, seria o ID do usuário logado
      };
      
      // Simulação de envio para API
      // Em um cenário real, seria algo como:
      // const { data: savedLead, error } = await supabase
      //   .from('leads')
      //   .insert([leadData])
      //   .select();
      
      console.log("Dados do lead:", leadData);
      
      // Simulação de espera
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Lead cadastrado com sucesso!",
        description: "O lead foi registrado em nosso sistema.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Erro ao cadastrar lead:", error);
      toast({
        title: "Erro ao cadastrar lead",
        description: "Ocorreu um erro ao processar sua solicitação.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    form,
    isLoading,
    tipoPessoa,
    handleTipoPessoaChange,
    onSubmit,
  };
};
