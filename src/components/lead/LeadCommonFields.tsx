
import React from "react";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const interesses = [
  { value: "energia", label: "Energia Solar" },
  { value: "internet", label: "Internet Fibra" },
  { value: "agua", label: "Economia de Água" },
  { value: "consultoria", label: "Consultoria Empresarial" },
];

const LeadCommonFields = () => {
  const form = useFormContext();

  return (
    <>
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
    </>
  );
};

export default LeadCommonFields;
