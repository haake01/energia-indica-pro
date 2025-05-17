
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";

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
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  cpf: z.string().min(11, "CPF inválido"),
  phone: z.string().min(10, "Número de telefone inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "Você precisa aceitar os termos e condições",
  }),
  acceptRegulation: z.boolean().refine(val => val === true, {
    message: "Você precisa concordar com o regulamento do programa",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      cpf: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      acceptRegulation: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    // Simulação de cadastro - aqui você conectaria ao backend
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Cadastro realizado",
        description: "Sua conta foi criada com sucesso!",
      });
      console.log("Dados de cadastro:", data);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-white/80 flex flex-col">
        <div className="w-full max-w-md mx-auto p-6 space-y-8 my-10">
          <div className="flex items-center">
            <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-brand-blue mb-2">Cadastro de Indicador</h1>
            <p className="text-gray-600 mb-8">
              Preencha os dados abaixo para se cadastrar como indicador
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome completo</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Digite seu nome completo" 
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="123.456.789-00" 
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="(00) 00000-0000" 
                          {...field}
                          className="h-12 rounded-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
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
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
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
              
              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Eu li e aceito os <Link to="/termos" className="text-brand-blue hover:underline">termos de uso</Link> e <Link to="/privacidade" className="text-brand-blue hover:underline">política de privacidade</Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptRegulation"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 border">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Eu li e concordo com o <Link to="/regulamento" className="text-brand-blue hover:underline">regulamento do programa</Link> de indicações
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-orange hover:bg-brand-orange-light text-white h-12 rounded-full"
              >
                {isLoading ? "Processando..." : "Criar minha conta"}
              </Button>
            </form>
          </Form>

          <div className="flex justify-center mt-6">
            <p className="text-center text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-brand-blue font-medium hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
