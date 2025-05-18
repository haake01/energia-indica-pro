
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/lib/supabase-auth";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const result = await loginUser(data.email, data.password);
      
      if (result.success) {
        // Redirecionar com base no papel do usuário
        if (result.role === 'gestor') {
          navigate('/gestor/painel');
        } else {
          navigate('/indicador/painel');
        }
      } else {
        throw new Error(result.error?.message || "Erro ao realizar login");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login",
        description: error.message || "Credenciais inválidas. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto p-6 space-y-8 mt-10">
        <div className="flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Login do Indicador</h1>
          <p className="text-gray-600 mb-8">
            Entre com seus dados para acessar sua conta
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="seu@email.com"
                      {...field}
                      className="h-12 rounded-lg"
                    />
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
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      className="h-12 rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-12 rounded-full"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </Form>

        <div className="text-center space-y-4 pt-4">
          <p className="text-sm text-gray-600">
            <Link to="/recuperar-senha" className="text-brand-blue hover:underline">
              Esqueci minha senha
            </Link>
          </p>
          
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-600">Ainda não tem uma conta?</span>
            <Link to="/cadastro" className="text-brand-orange font-medium hover:underline">
              Cadastre-se
            </Link>
          </div>
        </div>
      </div>
      
      <WhatsAppButton phoneNumber="11954707777" />
    </div>
  );
};

export default LoginPage;
