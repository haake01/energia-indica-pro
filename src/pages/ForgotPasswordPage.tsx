
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link } from "react-router-dom";
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

const formSchema = z.object({
  email: z.string().email("Digite um e-mail válido"),
});

type FormValues = z.infer<typeof formSchema>;

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    setIsLoading(true);

    // Simulação de envio de email - aqui você conectaria ao backend
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
      toast({
        title: "E-mail enviado",
        description: "Instruções de recuperação foram enviadas para seu e-mail.",
      });
      console.log("Email para recuperação:", data.email);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto p-6 space-y-8 mt-10">
        <div className="flex items-center">
          <Link to="/login" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar para o login</span>
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Recuperar Senha</h1>
          <p className="text-gray-600 mb-8">
            Digite seu e-mail e enviaremos instruções para recuperar sua senha
          </p>
        </div>

        {!submitted ? (
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

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-blue hover:bg-brand-blue/90 text-white h-12 rounded-full"
              >
                {isLoading ? "Enviando..." : "Recuperar senha"}
              </Button>
            </form>
          </Form>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <ArrowLeft className="text-green-600 rotate-180" />
            </div>
            <h3 className="text-lg font-medium text-green-800 mb-2">E-mail enviado</h3>
            <p className="text-green-700 mb-4">
              Verifique sua caixa de entrada e siga as instruções para redefinir sua senha.
            </p>
            <Button
              onClick={() => setSubmitted(false)}
              variant="outline"
              className="border-green-600 text-green-700 hover:bg-green-50"
            >
              Reenviar e-mail
            </Button>
          </div>
        )}

        <div className="text-center pt-4">
          <p className="text-sm text-gray-600">
            Lembrou sua senha?{" "}
            <Link to="/login" className="text-brand-blue hover:underline">
              Voltar ao login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
