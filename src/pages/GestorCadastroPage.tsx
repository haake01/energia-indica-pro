import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/lib/supabase";
import { registerGestor, cadastrarGestorInicial } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { Eye, EyeOff } from "lucide-react";

const gestorFormSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  whatsapp: z.string().min(10, { message: "Whatsapp inválido" }),
  password: z.string().min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
});

type GestorFormValues = z.infer<typeof gestorFormSchema>;

const GestorCadastroPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const form = useForm<GestorFormValues>({
    resolver: zodResolver(gestorFormSchema),
    defaultValues: {
      nome: "KLEBER MARKUS HAAKE",
      email: "kleberhaake@gmail.com",
      whatsapp: "11954707777",
      password: "Gestor@123",
    },
  });

  // Verificar se já existe um gestor e criar o default se não existir
  useEffect(() => {
    const checkDefaultGestor = async () => {
      const { data } = await supabase.from("gestores").select("*").eq("email", "kleberhaake@gmail.com");
      
      if (!data || data.length === 0) {
        // Criar gestor default
        await createDefaultGestor();
      }
    };
    
    checkDefaultGestor();
  }, []);
  
  const createDefaultGestor = async () => {
    try {
      const defaultGestor = {
        nome: "KLEBER MARKUS HAAKE", 
        email: "kleberhaake@gmail.com", 
        whatsapp: "11954707777",
        password: "Gestor@123",
        cargo: "Administrador",
        nivel_acesso: "admin",
      };
      
      const result = await registerGestor({
        ...defaultGestor,
        telefone: defaultGestor.whatsapp, // Adaptando o campo para a API
      });
      
      if (result.success) {
        console.log("Gestor padrão criado com sucesso!");
      } else {
        console.error("Erro ao criar gestor padrão:", result.error);
      }
    } catch (err) {
      console.error("Erro ao criar gestor padrão:", err);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (values: GestorFormValues) => {
    setIsLoading(true);
    
    try {
      const gestorData = {
        nome: values.nome,
        email: values.email,
        telefone: values.whatsapp,
        cargo: "Gestor",
        nivel_acesso: "gestor",
        password: values.password,
      };
      
      const result = await registerGestor(gestorData);
      
      if (result.success) {
        toast({
          title: "Gestor cadastrado com sucesso!",
          description: "O gestor foi adicionado ao sistema.",
        });
        navigate("/gestor/painel");
      } else {
        toast({
          variant: "destructive",
          title: "Erro no cadastro",
          description: result.error?.toString() || "Ocorreu um erro ao cadastrar o gestor.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error?.message || "Ocorreu um erro ao cadastrar o gestor.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Cadastro de Gestor</h1>
          <p className="mt-2 text-gray-600">Cadastre um novo gestor para o sistema</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    <Input type="email" placeholder="Email do gestor" {...field} />
                  </FormControl>
                  <FormDescription>
                    Este email será usado para login no sistema.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="whatsapp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp</FormLabel>
                  <FormControl>
                    <Input placeholder="DDD+número, ex: 11987654321" {...field} />
                  </FormControl>
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
                  <div className="relative">
                    <FormControl>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="Crie uma senha" 
                        {...field} 
                        className="pr-10"
                      />
                    </FormControl>
                    <button
                      type="button"
                      onClick={toggleShowPassword}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <FormDescription>
                    Mínimo de 6 caracteres.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-brand-blue hover:bg-brand-blue-dark"
              disabled={isLoading}
            >
              {isLoading ? "Cadastrando..." : "Cadastrar Gestor"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default GestorCadastroPage;
