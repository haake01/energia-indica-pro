
import React, { useState } from "react";
import { Upload, File, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  onChange: (file: File | null) => void;
  value: File | null;
  accept?: string;
  maxSize?: number; // in MB
  label?: string;
  error?: string;
}

export const FileUpload = ({
  onChange,
  value,
  accept = ".pdf,.jpg,.jpeg,.png",
  maxSize = 5, // 5MB default
  label = "Upload arquivo",
  error
}: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  
  const handleChange = (file: File | null) => {
    if (!file) {
      onChange(null);
      setFileError(null);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setFileError(`Arquivo muito grande. Tamanho máximo: ${maxSize}MB`);
      return;
    }
    
    // Check file type
    const fileType = file.type.split('/')[1];
    const acceptedTypes = accept.split(',').map(type => 
      type.trim().replace('.', '')
    );
    
    if (!acceptedTypes.includes(fileType) && !acceptedTypes.includes('*')) {
      setFileError(`Tipo de arquivo não permitido. Formatos aceitos: ${accept}`);
      return;
    }
    
    setFileError(null);
    onChange(file);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleChange(e.target.files[0]);
    }
  };
  
  const removeFile = () => {
    onChange(null);
    setFileError(null);
  };
  
  return (
    <div className="w-full">
      {!value ? (
        <div
          className={`border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            dragActive ? "border-brand-blue bg-brand-blue/10" : "border-gray-300"
          } ${fileError || error ? "border-red-500" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="h-10 w-10 text-gray-400 mb-2" />
          <p className="text-gray-600 text-center mb-2">{label}</p>
          <p className="text-xs text-gray-500">
            Arraste e solte ou clique para selecionar um arquivo
          </p>
          <p className="text-xs text-gray-500">
            Formatos permitidos: {accept.replace(/\./g, '').toUpperCase()}
          </p>
          <p className="text-xs text-gray-500">
            Tamanho máximo: {maxSize}MB
          </p>
          <input
            id="file-input"
            type="file"
            className="hidden"
            accept={accept}
            onChange={handleFileInputChange}
          />
        </div>
      ) : (
        <div className="border rounded-md p-3 flex justify-between items-center">
          <div className="flex items-center">
            <File className="h-6 w-6 text-brand-blue mr-2" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">{value.name}</p>
              <p className="text-xs text-gray-500">
                {(value.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={(e) => {
              e.stopPropagation();
              removeFile();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      {(fileError || error) && (
        <p className="text-sm text-red-500 mt-1">{fileError || error}</p>
      )}
    </div>
  );
};
