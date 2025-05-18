
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
import { loginUser, loginWithGoogle } from "@/lib/auth";
import PasswordInput from "./PasswordInput";
import SocialLoginButton from "./SocialLoginButton";

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
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

  const handleGoogleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        throw new Error(result.error?.message || "Erro ao realizar login com Google");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no login com Google",
        description: error.message || "Não foi possível realizar login com Google.",
      });
    }
  };

  return (
    <div className="space-y-6">
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
          
          <PasswordInput 
            form={form} 
            name="password" 
            label="Senha" 
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

      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-white px-2 text-muted-foreground">ou continue com</span>
      </div>

      <SocialLoginButton provider="google" onClick={handleGoogleLogin} />

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
  );
};

export default LoginForm;
