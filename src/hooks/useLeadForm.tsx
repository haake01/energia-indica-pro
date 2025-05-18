
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/schemas/leadFormSchema";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

export const useLeadForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoPessoa, setTipoPessoa] = useState<"pf" | "pj">("pf");
  const navigate = useNavigate();

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
      
      // Get current user
      const { data: userSession } = await supabase.auth.getSession();
      
      if (!userSession.session) {
        throw new Error("Usuário não está autenticado");
      }
      
      const userId = userSession.session.user.id;
      
      // Upload fatura if exists
      if (data.fatura) {
        const fileName = `${Date.now()}-${data.fatura.name}`;
        const filePath = `leads/${userId}/${fileName}`;
        
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('faturas')
          .upload(filePath, data.fatura);
          
        if (uploadError) {
          console.error('Erro ao fazer upload da fatura:', uploadError);
          throw new Error("Erro ao fazer upload da fatura");
        }
        
        // Get public URL for the file
        const { data: publicUrlData } = supabase.storage
          .from('faturas')
          .getPublicUrl(filePath);
          
        faturaUrl = publicUrlData.publicUrl;
      }
      
      // Dados a serem salvos
      const leadData = {
        ...data,
        faturaUrl,
        dataCadastro: new Date().toISOString(),
        status: "novo",
        indicadorId: userId,
      };
      
      // Remove the file object before inserting into the database
      const { fatura, ...leadDataToSave } = leadData;
      
      // Insert lead into the database
      const { data: savedLead, error: insertError } = await supabase
        .from('leads')
        .insert([leadDataToSave])
        .select();
        
      if (insertError) {
        console.error('Erro ao salvar lead:', insertError);
        throw new Error("Erro ao salvar lead no banco de dados");
      }
      
      toast({
        title: "Lead cadastrado com sucesso!",
        description: "O lead foi registrado em nosso sistema.",
      });
      
      form.reset();
      
      // Redirect to leads list after successful submission
      navigate("/indicador/leads");
      
    } catch (error: any) {
      console.error("Erro ao cadastrar lead:", error);
      toast({
        title: "Erro ao cadastrar lead",
        description: error.message || "Ocorreu um erro ao processar sua solicitação.",
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
