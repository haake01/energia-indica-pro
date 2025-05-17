
import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NovaIndicacaoButton = () => {
  return (
    <Link to="/indicador/cadastrar-lead">
      <Button className="bg-brand-orange hover:bg-brand-orange/80 text-white rounded-full">
        <Plus className="mr-2 h-4 w-4" />
        Nova Indicação
      </Button>
    </Link>
  );
};

export default NovaIndicacaoButton;
