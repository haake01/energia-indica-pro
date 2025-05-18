import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react";

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
import { registerIndicador, loginWithGoogle } from "@/lib/auth";

const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Digite um e-mail válido"),
  tipoConta: z.enum(["pf", "pj"]),
  cpf: z.string().optional(),
  cnpj: z.string().optional(),
  telefone: z.string().min(10, "Número de telefone inválido"),
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
}).refine(
  (data) => {
    if (data.tipoConta === "pf") {
      return !!data.cpf && data.cpf.length >= 11;
    }
    if (data.tipoConta === "pj") {
      return !!data.cnpj && data.cnpj.length >= 14;
    }
    return false;
  },
  {
    message: "CPF ou CNPJ é obrigatório conforme o tipo de conta",
    path: ["cpf"],
  }
);

type FormValues = z.infer<typeof formSchema>;

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [tipoContaSelecionada, setTipoContaSelecionada] = useState<"pf" | "pj">("pf");
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      email: "",
      tipoConta: "pf",
      cpf: "",
      cnpj: "",
      telefone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
      acceptRegulation: false,
    },
  });

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleTipoContaChange = (tipo: "pf" | "pj") => {
    setTipoContaSelecionada(tipo);
    form.setValue("tipoConta", tipo);
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        throw new Error(result.error?.message || "Erro ao realizar cadastro com Google");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro com Google",
        description: error.message || "Não foi possível realizar cadastro com Google.",
      });
    }
  };

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);

    try {
      const registerData = {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        password: data.password,
        tipoConta: data.tipoConta,
        cpf: data.tipoConta === "pf" ? data.cpf : undefined,
        cnpj: data.tipoConta === "pj" ? data.cnpj : undefined,
      };

      const result = await registerIndicador(registerData);
      
      if (result.success) {
        toast({
          title: "Cadastro realizado com sucesso!",
          description: "Verifique seu email para confirmar sua conta.",
        });
        navigate("/login");
      } else {
        throw new Error(result.error?.message || "Erro ao realizar cadastro");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erro no cadastro",
        description: error.message || "Não foi possível realizar seu cadastro. Tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
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

          <div className="flex justify-center mb-4">
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => handleTipoContaChange("pf")}
                className={`px-4 py-2 rounded-md ${
                  tipoContaSelecionada === "pf" 
                    ? "bg-brand-blue text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Pessoa Física
              </button>
              <button
                type="button"
                onClick={() => handleTipoContaChange("pj")}
                className={`px-4 py-2 rounded-md ${
                  tipoContaSelecionada === "pj" 
                    ? "bg-brand-blue text-white" 
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Pessoa Jurídica
              </button>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button"
            className="w-full h-12 rounded-full flex items-center justify-center gap-2 mb-4"
            onClick={handleGoogleSignUp}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              <path d="M1 1h22v22H1z" fill="none"/>
            </svg>
            Cadastrar com Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou cadastre com seus dados</span>
            </div>
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
                {tipoContaSelecionada === "pf" ? (
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
                ) : (
                  <FormField
                    control={form.control}
                    name="cnpj"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNPJ</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="12.345.678/0001-90" 
                            {...field}
                            className="h-12 rounded-lg"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={form.control}
                  name="telefone"
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
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                          {...field}
                          className="h-12 rounded-lg pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={toggleShowPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
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
                    <div className="relative">
                      <FormControl>
                        <Input 
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••" 
                          {...field}
                          className="h-12 rounded-lg pr-10"
                        />
                      </FormControl>
                      <button
                        type="button"
                        onClick={toggleShowConfirmPassword}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
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
