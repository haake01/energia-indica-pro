
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { Filter } from "lucide-react";

const Index = () => {
  const handleWelcome = () => {
    toast("Sistema LEX + ENERGIA planejado!", {
      description: "Visualização do sistema de indicação de energia mais barata.",
      duration: 5000,
    });
  };

  // Dados de exemplo para o gráfico de status
  const statusData = [
    { nome: "Novo", quantidade: 12 },
    { nome: "Em Análise", quantidade: 8 },
    { nome: "Contatado", quantidade: 5 },
    { nome: "Negociação", quantidade: 3 },
    { nome: "Convertido", quantidade: 2 },
    { nome: "Rejeitado", quantidade: 1 },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-4 px-6 bg-card">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">LEX + ENERGIA</h1>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Painel</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px]">
                    <div className="font-medium">Dashboard</div>
                    <div className="font-medium">Leads</div>
                    <div className="font-medium">Comissões</div>
                    <div className="font-medium text-blue-600">Relatórios PDF</div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <h2 className="text-2xl font-bold mb-6">Sistema de Indicação Planejado</h2>
        
        {/* Seção 1: Relatórios em PDF Filtráveis */}
        <section className="mb-10">
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Relatórios em PDF Filtráveis
              </CardTitle>
              <CardDescription>Exportação personalizada de relatórios</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Tipo de Lead</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="pf">Pessoa Física</SelectItem>
                      <SelectItem value="pj">Pessoa Jurídica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="novo">Novo</SelectItem>
                      <SelectItem value="analise">Em Análise</SelectItem>
                      <SelectItem value="contatado">Contatado</SelectItem>
                      <SelectItem value="negociacao">Negociação</SelectItem>
                      <SelectItem value="convertido">Convertido</SelectItem>
                      <SelectItem value="rejeitado">Rejeitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Período</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7dias">Últimos 7 dias</SelectItem>
                      <SelectItem value="30dias">Últimos 30 dias</SelectItem>
                      <SelectItem value="90dias">Últimos 90 dias</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Região/UF</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="SP">São Paulo</SelectItem>
                      <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                      <SelectItem value="MG">Minas Gerais</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Faixa de Valor</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todas" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas</SelectItem>
                      <SelectItem value="300-500">R$ 300 - R$ 500</SelectItem>
                      <SelectItem value="501-1000">R$ 501 - R$ 1.000</SelectItem>
                      <SelectItem value="1001+">Acima de R$ 1.000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Indicador</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Todos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos</SelectItem>
                      <SelectItem value="id1">João Silva</SelectItem>
                      <SelectItem value="id2">Maria Oliveira</SelectItem>
                      <SelectItem value="id3">Carlos Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Formato do Relatório</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="PDF Detalhado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf-detalhado">PDF Detalhado</SelectItem>
                      <SelectItem value="pdf-resumido">PDF Resumido</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button variant="outline">Limpar Filtros</Button>
                <Button className="bg-blue-700 hover:bg-blue-800">Gerar Relatório</Button>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Seção 2: Fluxo de Status com Alteração Manual do Gestor */}
        <section className="mb-10">
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle>Fluxo de Status com Ações do Gestor</CardTitle>
              <CardDescription>Visualização completa do processo com alterações manuais</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="overflow-x-auto pb-4">
                <div className="min-w-[800px]">
                  <div className="flex justify-between items-center mb-6 relative">
                    <div className="flex-1 text-center border border-blue-200 rounded-lg bg-blue-50 py-3">
                      <p className="font-medium">NOVO</p>
                      <p className="text-xs text-gray-500">Cadastrado pelo Indicador</p>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex-1 text-center border border-gray-200 rounded-lg py-3">
                      <p className="font-medium">EM ANÁLISE</p>
                      <p className="text-xs text-gray-500">Verificação pelo Gestor</p>
                      <div className="mt-2 bg-yellow-100 rounded px-2 py-1 text-xs inline-block">
                        Gestor pode alterar manualmente
                      </div>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex-1 text-center border border-gray-200 rounded-lg py-3">
                      <p className="font-medium">CONTATADO</p>
                      <p className="text-xs text-gray-500">Cliente abordado</p>
                      <div className="mt-2 bg-yellow-100 rounded px-2 py-1 text-xs inline-block">
                        Gestor pode alterar manualmente
                      </div>
                    </div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex-1 text-center border border-gray-200 rounded-lg py-3">
                      <p className="font-medium">NEGOCIAÇÃO</p>
                      <p className="text-xs text-gray-500">Proposta enviada</p>
                      <div className="mt-2 bg-yellow-100 rounded px-2 py-1 text-xs inline-block">
                        Gestor pode alterar manualmente
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-[25%] flex items-start">
                    <div className="w-8 h-16 border-r border-gray-300"></div>
                  </div>
                  
                  <div className="flex justify-between items-center relative">
                    <div className="flex-1"></div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex-1 text-center border border-red-200 rounded-lg bg-red-50 py-3">
                      <p className="font-medium">REJEITADO</p>
                      <p className="text-xs text-gray-500">Lead não aproveitado</p>
                      <div className="mt-2 bg-yellow-100 rounded px-2 py-1 text-xs inline-block">
                        Gestor pode alterar manualmente
                      </div>
                    </div>
                    <div className="flex-1"></div>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <div className="flex-1 text-center border border-green-200 rounded-lg bg-green-50 py-3">
                      <p className="font-medium">CONVERTIDO</p>
                      <p className="text-xs text-gray-500">Lead fechou contrato</p>
                      <div className="mt-2 bg-yellow-100 rounded px-2 py-1 text-xs inline-block">
                        Gestor pode alterar manualmente
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        
        {/* Seção 3: Separação de Campos de Leads PF e PJ */}
        <section>
          <Card>
            <CardHeader className="bg-orange-50">
              <CardTitle>Modelo de Dados: Leads PF e PJ</CardTitle>
              <CardDescription>Campos separados por tipo de cliente</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h3 className="text-lg font-bold mb-3 pb-2 border-b">Leads Pessoa Física (PF)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campo</TableHead>
                        <TableHead>Tipo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">id</TableCell>
                        <TableCell>UUID (PK)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">indicador_id</TableCell>
                        <TableCell>FK → usuarios.id</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">tipo_lead</TableCell>
                        <TableCell>constante: 'PF'</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-blue-50 font-medium">Dados Pessoais</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">nome_completo</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">cpf</TableCell>
                        <TableCell>string (validado)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">data_nascimento</TableCell>
                        <TableCell>date</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-blue-50 font-medium">Endereço</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">endereco_completo</TableCell>
                        <TableCell>vários campos separados</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-blue-50 font-medium">Contato</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">whatsapp</TableCell>
                        <TableCell>string (formatado)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">email</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">telefone_alternativo</TableCell>
                        <TableCell>string (opcional)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-blue-50 font-medium">Dados de Energia</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">concessionaria_energia</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">valor_estimado_fatura</TableCell>
                        <TableCell>decimal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">upload_fatura_recente</TableCell>
                        <TableCell>string (url)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-blue-50 font-medium">Campos de Controle</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">status</TableCell>
                        <TableCell>enum (novo, análise, etc)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">comissao_estimada</TableCell>
                        <TableCell>decimal</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold mb-3 pb-2 border-b">Leads Pessoa Jurídica (PJ)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Campo</TableHead>
                        <TableHead>Tipo</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">id</TableCell>
                        <TableCell>UUID (PK)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">indicador_id</TableCell>
                        <TableCell>FK → usuarios.id</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">tipo_lead</TableCell>
                        <TableCell>constante: 'PJ'</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-orange-50 font-medium">Dados da Empresa</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">razao_social</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">nome_fantasia</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">cnpj</TableCell>
                        <TableCell>string (validado)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">inscricao_estadual</TableCell>
                        <TableCell>string (opcional)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">setor_atuacao</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-orange-50 font-medium">Pessoa de Contato</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">contato_nome</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">contato_cargo</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">whatsapp</TableCell>
                        <TableCell>string (formatado)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">email</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-orange-50 font-medium">Dados de Energia</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">concessionaria_energia</TableCell>
                        <TableCell>string</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">valor_estimado_fatura</TableCell>
                        <TableCell>decimal</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">numero_unidades</TableCell>
                        <TableCell>integer</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">demanda_contratada</TableCell>
                        <TableCell>decimal (opcional)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">upload_fatura_recente</TableCell>
                        <TableCell>string (url)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={2} className="bg-orange-50 font-medium">Campos de Controle</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">status</TableCell>
                        <TableCell>enum (novo, análise, etc)</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">potencial_economia</TableCell>
                        <TableCell>decimal (opcional)</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <footer className="border-t py-6 bg-muted/50">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2025 LEX + ENERGIA / Alexandria Energia. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
