
import React from "react";
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FaturaViewerProps {
  url: string;
  filename?: string;
  onClose?: () => void;
}

const FaturaViewer = ({ url, filename = "Fatura", onClose }: FaturaViewerProps) => {
  const isPdf = url.toLowerCase().endsWith(".pdf") || url.includes("application/pdf");
  
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl w-full">
      <div className="bg-gray-50 p-4 flex justify-between items-center border-b">
        <div className="flex items-center space-x-2">
          <FileText className="text-brand-blue w-5 h-5" />
          <h3 className="font-medium text-lg">{filename}</h3>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="flex items-center space-x-1"
          >
            <Download className="w-4 h-4" />
            <span>Baixar</span>
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(url, "_blank")}
            className="flex items-center space-x-1"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Abrir</span>
          </Button>
          
          {onClose && (
            <Button variant="outline" size="sm" onClick={onClose}>
              Fechar
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4">
        {isPdf ? (
          <iframe
            src={`${url}#toolbar=0`}
            className="w-full h-[500px] border rounded"
            title="Visualização de fatura"
          />
        ) : (
          <div className="flex justify-center">
            <img src={url} alt="Fatura" className="max-h-[500px] object-contain" />
          </div>
        )}
      </div>
    </div>
  );
};

export default FaturaViewer;
