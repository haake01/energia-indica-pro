
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDown, FileUp, FilePdf } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Reports data mockup
const reportsList = [
  {
    id: "rel-001",
    title: "Relatório de Comissões - Maio 2025",
    date: "15/05/2025",
    description: "Resumo das comissões geradas no mês de Maio de 2025",
    type: "comissoes",
  },
  {
    id: "rel-002",
    title: "Relatório de Indicações - Maio 2025",
    date: "15/05/2025",
    description: "Detalhamento das indicações feitas em Maio de 2025",
    type: "indicacoes",
  },
  {
    id: "rel-003",
    title: "Relatório de Performance - 1º Trimestre 2025",
    date: "10/04/2025",
    description: "Análise de performance do indicador no primeiro trimestre de 2025",
    type: "performance",
  },
  {
    id: "rel-004",
    title: "Relatório de Comissões - Abril 2025",
    date: "15/04/2025",
    description: "Resumo das comissões geradas no mês de Abril de 2025",
    type: "comissoes",
  },
  {
    id: "rel-005",
    title: "Relatório de Indicações - Abril 2025",
    date: "15/04/2025",
    description: "Detalhamento das indicações feitas em Abril de 2025",
    type: "indicacoes",
  },
];

const RelatoriosPage = () => {
  const [filter, setFilter] = useState("todos");
  
  // Filter reports based on selected tab
  const filteredReports = filter === "todos" 
    ? reportsList 
    : reportsList.filter(report => report.type === filter);
  
  // Simulate downloading a report
  const handleDownload = (reportId: string, reportTitle: string) => {
    console.log(`Downloading report ${reportId}: ${reportTitle}`);
    // In a real app, this would trigger an API call to fetch the PDF
  };

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-white/80 flex flex-col">
        <div className="container mx-auto p-6 flex flex-col space-y-8">
          <div className="flex items-center">
            <Link to="/indicador/painel" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Voltar ao painel</span>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h1 className="text-2xl font-bold text-brand-blue mb-6">Relatórios em PDF</h1>

            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle>Seus Relatórios</CardTitle>
                <CardDescription>
                  Acesse todos os relatórios gerados para sua conta de indicador
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="todos" value={filter} onValueChange={setFilter} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="todos">Todos</TabsTrigger>
                    <TabsTrigger value="comissoes">Comissões</TabsTrigger>
                    <TabsTrigger value="indicacoes">Indicações</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="todos" className="mt-0">
                    <ReportsTable reports={filteredReports} onDownload={handleDownload} />
                  </TabsContent>
                  
                  <TabsContent value="comissoes" className="mt-0">
                    <ReportsTable reports={filteredReports} onDownload={handleDownload} />
                  </TabsContent>
                  
                  <TabsContent value="indicacoes" className="mt-0">
                    <ReportsTable reports={filteredReports} onDownload={handleDownload} />
                  </TabsContent>
                  
                  <TabsContent value="performance" className="mt-0">
                    <ReportsTable reports={filteredReports} onDownload={handleDownload} />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Solicitar Novo Relatório</CardTitle>
                <CardDescription>
                  Solicite a geração de um novo relatório específico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto py-6 justify-start"
                    onClick={() => console.log("Solicitando relatório de comissões")}
                  >
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <FilePdf className="h-5 w-5 text-brand-blue" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Relatório de Comissões</h3>
                      <p className="text-sm text-gray-500">Detalhamento de todas as suas comissões</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto py-6 justify-start"
                    onClick={() => console.log("Solicitando relatório de indicações")}
                  >
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <FilePdf className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Relatório de Indicações</h3>
                      <p className="text-sm text-gray-500">Lista completa das suas indicações</p>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 h-auto py-6 justify-start"
                    onClick={() => console.log("Solicitando relatório de performance")}
                  >
                    <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                      <FilePdf className="h-5 w-5 text-brand-orange" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-medium">Relatório de Performance</h3>
                      <p className="text-sm text-gray-500">Análise da sua performance como indicador</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

// Reports table component
const ReportsTable = ({ 
  reports, 
  onDownload 
}: { 
  reports: typeof reportsList,
  onDownload: (id: string, title: string) => void
}) => {
  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Título</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="text-right">Ação</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.title}</TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    report.type === 'comissoes' ? 'bg-blue-100 text-blue-800' :
                    report.type === 'indicacoes' ? 'bg-green-100 text-green-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {report.type === 'comissoes' ? 'Comissões' :
                     report.type === 'indicacoes' ? 'Indicações' :
                     'Performance'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="sm"
                    onClick={() => onDownload(report.id, report.title)}
                    className="bg-brand-blue hover:bg-brand-blue/80"
                  >
                    <ArrowDown className="h-4 w-4 mr-1" />
                    Baixar PDF
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                Nenhum relatório encontrado
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default RelatoriosPage;
