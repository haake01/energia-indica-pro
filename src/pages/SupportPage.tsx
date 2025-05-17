
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const quickHelpFaqs = [
  {
    question: "Como faço para recuperar minha senha?",
    answer: "Acesse a página de login, clique em 'Esqueci minha senha' e siga as instruções enviadas ao seu e-mail cadastrado."
  },
  {
    question: "Quanto tempo leva para receber minhas comissões?",
    answer: "As comissões são pagas em até 60 dias após a assinatura de contrato do INDICADO com a ALEXANDRIA ENERGIA através da chave PIX informada no cadastro."
  },
  {
    question: "O que acontece depois que eu indico alguém?",
    answer: "Nossa equipe entrará em contato com a pessoa indicada para oferecer nosso serviço. Você poderá acompanhar todo o processo através do seu painel de indicador."
  }
];

const SupportPage = () => {
  return (
    <div 
      className="min-h-screen bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed"
    >
      <div className="min-h-screen bg-brand-blue/50 backdrop-blur-sm flex flex-col">
        <Header />
        <main className="flex-1 py-12">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold text-brand-lime mb-4">Central de Suporte</h1>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Estamos aqui para ajudar você com qualquer dúvida sobre o programa de indicações LEX+ENERGIA
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto">
              <Tabs defaultValue="help" className="w-full">
                <TabsList className="grid grid-cols-1 md:grid-cols-3 mb-8 bg-white/10">
                  <TabsTrigger value="help" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">
                    Ajuda Rápida
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">
                    Contato Direto
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">
                    Perguntas Frequentes
                  </TabsTrigger>
                </TabsList>
                
                <div className="bg-white rounded-2xl shadow p-8">
                  {/* Ajuda Rápida */}
                  <TabsContent value="help">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-brand-blue mb-4">Ajuda Rápida</h2>
                      <p className="text-gray-600 mb-6">
                        Aqui estão algumas perguntas frequentes para ajudar você rapidamente:
                      </p>
                      
                      <Accordion type="single" collapsible className="w-full">
                        {quickHelpFaqs.map((faq, index) => (
                          <AccordionItem key={index} value={`help-${index}`}>
                            <AccordionTrigger className="text-left font-medium text-gray-800">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-600">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                    
                    <div className="flex justify-center mt-8">
                      <Link to="/perguntas-frequentes">
                        <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                          Ver Todas as Perguntas Frequentes
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                  
                  {/* Contato Direto */}
                  <TabsContent value="contact">
                    <h2 className="text-2xl font-bold text-brand-blue mb-6">Entre em Contato</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <Mail className="mx-auto h-10 w-10 text-brand-orange mb-4" />
                        <h3 className="font-semibold text-lg mb-2">E-mail</h3>
                        <p className="text-gray-600 mb-4">Resposta em até 24h úteis</p>
                        <a href="mailto:suporte@lexmaisenergia.com.br" className="text-brand-blue font-medium hover:underline">
                          suporte@lexmaisenergia.com.br
                        </a>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <Phone className="mx-auto h-10 w-10 text-brand-orange mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Telefone</h3>
                        <p className="text-gray-600 mb-4">Segunda a Sexta, 9h às 18h</p>
                        <a href="tel:+551130421234" className="text-brand-blue font-medium hover:underline">
                          (11) 3042-1234
                        </a>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg text-center">
                        <MessageCircle className="mx-auto h-10 w-10 text-brand-orange mb-4" />
                        <h3 className="font-semibold text-lg mb-2">Chat</h3>
                        <p className="text-gray-600 mb-4">Resposta imediata</p>
                        <Button className="bg-brand-blue hover:bg-brand-blue/90">
                          Iniciar Chat
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mt-10 pt-8 border-t">
                      <h3 className="text-xl font-semibold mb-4">Formulário de Contato</h3>
                      <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">Nome</label>
                            <input
                              id="name"
                              type="text"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="Seu nome completo"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                            <input
                              id="email"
                              type="email"
                              className="w-full p-2 border border-gray-300 rounded-md"
                              placeholder="seu@email.com"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="subject" className="text-sm font-medium text-gray-700">Assunto</label>
                          <input
                            id="subject"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Assunto da mensagem"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="message" className="text-sm font-medium text-gray-700">Mensagem</label>
                          <textarea
                            id="message"
                            rows={5}
                            className="w-full p-2 border border-gray-300 rounded-md"
                            placeholder="Digite sua mensagem aqui..."
                          />
                        </div>
                        <Button type="submit" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                          Enviar Mensagem
                        </Button>
                      </form>
                    </div>
                  </TabsContent>
                  
                  {/* FAQ Completo */}
                  <TabsContent value="faq">
                    <h2 className="text-2xl font-bold text-brand-blue mb-4">Perguntas Frequentes</h2>
                    <p className="text-gray-600 mb-6">
                      Visite nossa página completa de FAQ para obter respostas detalhadas sobre o programa de indicações:
                    </p>
                    
                    <div className="text-center my-8">
                      <Link to="/perguntas-frequentes">
                        <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white">
                          Acessar FAQ Completo
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
              
              <div className="mt-10 text-center">
                <Link to="/" className="text-white hover:text-brand-lime inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Voltar à página inicial
                </Link>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SupportPage;
