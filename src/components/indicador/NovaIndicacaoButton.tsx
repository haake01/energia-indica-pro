
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const NovaIndicacaoButton = () => {
  return (
    <Button className="bg-brand-orange hover:bg-brand-orange-light text-white">
      <Plus className="mr-2 h-4 w-4" />
      Nova Indicação
    </Button>
  );
};

export default NovaIndicacaoButton;
