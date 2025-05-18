
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { cadastrarGestorInicial, registerGestor } from "@/lib/supabase-auth";

const gestorSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cargo: z.string().min(2, "Cargo obrigatório"),
  nivel_acesso: z.enum(["admin", "gestor", "visualizador"]),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres")
});

type GestorFormValues = z.infer<typeof gestorSchema>;

const GestorCadastroPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<GestorFormValues>({
    resolver: zodResolver(gestorSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cargo: "",
      nivel_acesso: "gestor",
      password: ""
    }
  });

  const onSubmit = async (data: GestorFormValues) => {
    try {
      const result = await registerGestor(data);
      
      if (result.success) {
        toast({
          title: "Gestor cadastrado com sucesso!",
          description: "O novo gestor já pode acessar o sistema.",
        });
        navigate("/gestor/painel");
      } else {
        throw new Error(result.error?.message || "Erro ao cadastrar gestor");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar gestor",
        description: error.message || "Ocorreu um erro ao processar o cadastro.",
      });
    }
  };

  // Função para cadastrar o gestor inicial (Kleber)
  const cadastrarGestorPadrao = async () => {
    try {
      const result = await cadastrarGestorInicial();
      
      if (result.success) {
        toast({
          title: "Gestor padrão cadastrado com sucesso!",
          description: result.message || "O gestor já pode acessar o sistema.",
        });
        navigate("/gestor/painel");
      } else {
        throw new Error(result.error?.message || "Erro ao cadastrar gestor padrão");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar gestor padrão",
        description: error.message || "Ocorreu um erro ao processar o cadastro.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Link to="/gestor/painel" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar ao painel</span>
          </Link>
          
          <Button 
            variant="outline" 
            onClick={cadastrarGestorPadrao}
            className="bg-brand-blue/10 text-brand-blue border-brand-blue hover:bg-brand-blue/20"
          >
            Cadastrar Gestor Padrão
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Cadastrar Novo Gestor</CardTitle>
            <CardDescription>
              Adicione um novo gestor ao sistema com as permissões apropriadas
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome completo</Label>
                  <Controller
                    name="nome"
                    control={control}
                    render={({ field }) => (
                      <Input id="nome" placeholder="Nome do gestor" {...field} />
                    )}
                  />
                  {errors.nome && (
                    <p className="text-sm text-red-500">{errors.nome.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input id="email" type="email" placeholder="email@exemplo.com" {...field} />
                    )}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500">{errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Controller
                    name="telefone"
                    control={control}
                    render={({ field }) => (
                      <Input id="telefone" placeholder="(11) 99999-9999" {...field} />
                    )}
                  />
                  {errors.telefone && (
                    <p className="text-sm text-red-500">{errors.telefone.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Controller
                    name="cargo"
                    control={control}
                    render={({ field }) => (
                      <Input id="cargo" placeholder="Ex: Analista de Vendas" {...field} />
                    )}
                  />
                  {errors.cargo && (
                    <p className="text-sm text-red-500">{errors.cargo.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nivel_acesso">Nível de acesso</Label>
                  <Controller
                    name="nivel_acesso"
                    control={control}
                    render={({ field }) => (
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o nível de acesso" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Administrador</SelectItem>
                          <SelectItem value="gestor">Gestor</SelectItem>
                          <SelectItem value="visualizador">Visualizador</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.nivel_acesso && (
                    <p className="text-sm text-red-500">{errors.nivel_acesso.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Senha inicial</Label>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <Input id="password" type="password" placeholder="Senha segura" {...field} />
                    )}
                  />
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={() => navigate("/gestor/painel")}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-brand-blue hover:bg-brand-blue/90" disabled={isSubmitting}>
                {isSubmitting ? "Cadastrando..." : "Cadastrar Gestor"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default GestorCadastroPage;
