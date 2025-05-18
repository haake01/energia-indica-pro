
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { registerGestor } from "@/lib/supabase-auth";

// Schema for gestor registration form
const formSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  cargo: z.string().min(3, "Cargo deve ter no mínimo 3 caracteres"),
  nivel_acesso: z.enum(["admin", "gestor", "visualizador"]),
  password: z.string().min(8, "A senha deve ter no mínimo 8 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

const GestorCadastroPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      cargo: "",
      nivel_acesso: "gestor",
      password: "",
    },
  });

  // Form submission handler
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const result = await registerGestor({
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cargo: data.cargo,
        nivel_acesso: data.nivel_acesso,
        password: data.password,
      });

      if (result.success) {
        toast({
          title: "Gestor cadastrado com sucesso!",
          description: "O gestor já pode acessar o sistema.",
        });
        form.reset();
      } else if (result.message) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar gestor",
          description: result.message,
        });
      } else if (result.error) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar gestor",
          description: result.error.message || "Ocorreu um erro ao processar seu cadastro.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar gestor",
        description: error.message || "Ocorreu um erro ao processar seu cadastro.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Cadastro de Gestor</h1>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do gestor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@exemplo.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input placeholder="(00) 00000-0000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="cargo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cargo</FormLabel>
                  <FormControl>
                    <Input placeholder="Cargo do gestor" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="nivel_acesso"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nível de acesso</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o nível de acesso" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Administrador</SelectItem>
                      <SelectItem value="gestor">Gestor</SelectItem>
                      <SelectItem value="visualizador">Visualizador</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-brand-blue hover:bg-brand-blue/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar Gestor"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GestorCadastroPage;
