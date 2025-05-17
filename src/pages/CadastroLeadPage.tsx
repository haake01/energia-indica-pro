
import React from "react";
import { Link } from "react-router-dom";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Import components
import PessoaFisicaForm from "@/components/lead/PessoaFisicaForm";
import PessoaJuridicaForm from "@/components/lead/PessoaJuridicaForm";
import LeadCommonFields from "@/components/lead/LeadCommonFields";
import LeadTypePicker from "@/components/lead/LeadTypePicker";

// Import custom hook
import { useLeadForm } from "@/hooks/useLeadForm";

const CadastroLeadPage = () => {
  const { form, isLoading, tipoPessoa, handleTipoPessoaChange, onSubmit } = useLeadForm();

  return (
    <div className="min-h-screen flex flex-col bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-white/80 flex flex-col">
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
              {/* Tipo de Pessoa - Componente separado */}
              <LeadTypePicker tipoPessoa={tipoPessoa} onChange={handleTipoPessoaChange} />
              
              {/* Field para armazenar o tipo de pessoa no form */}
              <RadioGroup
                value={tipoPessoa}
                className="hidden"
                onValueChange={(value: "pf" | "pj") => form.setValue("tipoPessoa", value)}
              >
                <RadioGroupItem value="pf" id="pf" />
                <RadioGroupItem value="pj" id="pj" />
              </RadioGroup>
              
              {/* Formulário dinâmico baseado no tipo de pessoa */}
              <div className="bg-white rounded-lg p-6 border border-gray-200 space-y-6">
                {/* Renderiza componente baseado no tipo de pessoa */}
                {tipoPessoa === "pf" ? <PessoaFisicaForm /> : <PessoaJuridicaForm />}
                
                {/* Campos comuns para ambos os tipos */}
                <LeadCommonFields />
              </div>
              
              <div className="flex items-center pb-4">
                <Link to="/regulamento" className="text-brand-blue hover:underline text-sm">
                  Ver regulamento do programa de indicações
                </Link>
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
    </div>
  );
};

export default CadastroLeadPage;
