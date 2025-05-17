
import React from "react";
import { User, Building } from "lucide-react";
import { FormField, FormItem, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface LeadTypePickerProps {
  tipoPessoa: "pf" | "pj";
  onChange: (value: "pf" | "pj") => void;
}

const LeadTypePicker: React.FC<LeadTypePickerProps> = ({ tipoPessoa, onChange }) => {
  return (
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
          onClick={() => onChange("pf")}
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
          onClick={() => onChange("pj")}
        >
          <Building className="text-brand-blue" />
          <span className="font-medium">Pessoa Jurídica</span>
        </button>
      </div>
    </div>
  );
};

export default LeadTypePicker;
