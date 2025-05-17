
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "@/components/indicador/DashboardSidebar";
import { FileText, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardHeader from "@/components/indicador/DashboardHeader";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const RelatoriosPage = () => {
  const navigate = useNavigate();
  
  const handleDownload = (reportName: string) => {
    toast({
      title: "Iniciando download",
      description: `O relatório ${reportName} será baixado em instantes.`,
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex flex-col flex-1">
        <DashboardHeader title="Relatórios" description="Visualize e baixe relatórios importantes" />
        
        <main className="flex-1 p-6">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Relatórios Disponíveis</h1>
              <p className="text-gray-600">Acesse todos os seus dados e estatísticas em formato PDF</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Select defaultValue="mes">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mes">Último mês</SelectItem>
                  <SelectItem value="trimestre">Último trimestre</SelectItem>
                  <SelectItem value="semestre">Último semestre</SelectItem>
                  <SelectItem value="ano">Último ano</SelectItem>
                </SelectContent>
              </Select>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Filter size={16} />
                    <span>Filtros</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Filtros de relatórios</DialogTitle>
                    <DialogDescription>
                      Selecione os filtros desejados para os relatórios
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="status">Status das indicações</Label>
                      <Select defaultValue="todas">
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Selecione um status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todas">Todas</SelectItem>
                          <SelectItem value="pendente">Pendentes</SelectItem>
                          <SelectItem value="aprovada">Aprovadas</SelectItem>
                          <SelectItem value="recusada">Recusadas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="tipo">Tipo de cliente</Label>
                      <Select defaultValue="todos">
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Selecione um tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="todos">Todos</SelectItem>
                          <SelectItem value="pf">Pessoa Física</SelectItem>
                          <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline">Limpar filtros</Button>
                    <Button>Aplicar filtros</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Tabs defaultValue="indicacoes" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="indicacoes">Indicações</TabsTrigger>
              <TabsTrigger value="comissoes">Comissões</TabsTrigger>
              <TabsTrigger value="desempenho">Desempenho</TabsTrigger>
            </TabsList>
            
            <TabsContent value="indicacoes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Relatório de Indicações Mensais */}
                <ReportCard 
                  title="Indicações Mensais" 
                  description="Relatório detalhado de todas as suas indicações do mês"
                  icon={<FileText className="h-8 w-8 text-blue-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Indicações Mensais")}
                />
                
                {/* Relatório de Status das Indicações */}
                <ReportCard 
                  title="Status das Indicações" 
                  description="Acompanhamento de status de todas as indicações"
                  icon={<FileText className="h-8 w-8 text-green-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Status das Indicações")}
                />
                
                {/* Relatório de Indicações por Região */}
                <ReportCard 
                  title="Indicações por Região" 
                  description="Distribuição geográfica das suas indicações"
                  icon={<FileText className="h-8 w-8 text-purple-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Indicações por Região")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="comissoes" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Relatório de Comissões */}
                <ReportCard 
                  title="Extrato de Comissões" 
                  description="Detalhamento de todas as comissões recebidas"
                  icon={<FileText className="h-8 w-8 text-green-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Extrato de Comissões")}
                />
                
                {/* Relatório de Previsão de Comissões */}
                <ReportCard 
                  title="Previsão de Comissões" 
                  description="Estimativa de comissões futuras baseadas em indicações em andamento"
                  icon={<FileText className="h-8 w-8 text-amber-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Previsão de Comissões")}
                />
                
                {/* Relatório Fiscal Anual */}
                <ReportCard 
                  title="Relatório Fiscal Anual" 
                  description="Resumo anual para fins de declaração de imposto de renda"
                  icon={<FileText className="h-8 w-8 text-red-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Relatório Fiscal Anual")}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="desempenho" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {/* Relatório de Desempenho */}
                <ReportCard 
                  title="Desempenho Geral" 
                  description="Visão geral do seu desempenho como indicador"
                  icon={<FileText className="h-8 w-8 text-indigo-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Desempenho Geral")}
                />
                
                {/* Relatório de Conversão */}
                <ReportCard 
                  title="Taxa de Conversão" 
                  description="Análise da sua taxa de conversão de indicações em contratos"
                  icon={<FileText className="h-8 w-8 text-cyan-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Taxa de Conversão")}
                />
                
                {/* Relatório de Comparativo */}
                <ReportCard 
                  title="Comparativo Trimestral" 
                  description="Comparação do seu desempenho atual com trimestres anteriores"
                  icon={<FileText className="h-8 w-8 text-orange-500" />}
                  badges={["PDF"]}
                  onDownload={() => handleDownload("Comparativo Trimestral")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

// Componente para renderização do card de relatório
interface ReportCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  badges: string[];
  onDownload: () => void;
}

const ReportCard = ({ title, description, icon, badges, onDownload }: ReportCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gray-50">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            {icon}
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
            </div>
          </div>
          <div className="flex gap-2">
            {badges.map((badge, index) => (
              <Badge key={index} variant="outline">{badge}</Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <CardDescription className="text-sm text-gray-600 h-12">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 flex justify-end">
        <Button onClick={onDownload} variant="default" size="sm" className="gap-2">
          <Download size={16} />
          <span>Baixar</span>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RelatoriosPage;
