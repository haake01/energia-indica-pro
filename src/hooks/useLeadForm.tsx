
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formSchema, FormValues } from "@/schemas/leadFormSchema";
import { toast } from "@/hooks/use-toast";

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

  return {
    form,
    isLoading,
    tipoPessoa,
    handleTipoPessoaChange,
    onSubmit,
  };
};
