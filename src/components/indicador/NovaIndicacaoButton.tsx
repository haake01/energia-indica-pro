
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NovaIndicacaoButton = () => {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: "Nova indicação",
      description: "O formulário de nova indicação será aberto em breve.",
    });
  };

  return (
    <Button 
      onClick={handleClick}
      className="bg-brand-orange hover:bg-brand-orange-light text-white"
    >
      <Plus className="mr-2 h-4 w-4" />
      Nova Indicação
    </Button>
  );
};

export default NovaIndicacaoButton;
