
import React from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const programaFaqs = [
  {
    question: "O que é o programa Indique e Ganhe?",
    answer: "O programa Indique e Ganhe é uma iniciativa da LEX+ENERGIA que permite que indicadores recebam comissões por indicarem novos clientes para economia de energia elétrica."
  },
  {
    question: "Quem pode participar como indicador?",
    answer: "Qualquer pessoa física com bom networking pode se cadastrar e participar como indicador. Não há requisitos específicos além de completar o cadastro com dados válidos e ter uma chave PIX para recebimento das comissões."
  },
  {
    question: "Existe algum custo para participar do programa?",
    answer: "Não há nenhum custo para participar. O cadastro é totalmente gratuito e não cobramos taxas de adesão ou mensalidades."
  },
  {
    question: "Como me torno um indicador?",
    answer: "Basta fazer seu cadastro em nossa plataforma, preencher seus dados pessoais e bancários, e aguardar a aprovação do seu cadastro, que geralmente acontece em até 24 horas."
  }
];

const indicacoesFaqs = [
  {
    question: "Quem posso indicar?",
    answer: "Você pode indicar tanto pessoas físicas quanto jurídicas que paguem mais de R$ 300 na conta de energia elétrica mensal."
  },
  {
    question: "Existe limite de indicações?",
    answer: "Não existe limite de indicações. Você pode indicar quantos clientes quiser, desde que atendam aos requisitos mínimos."
  },
  {
    question: "Como faço para indicar alguém?",
    answer: "Após fazer seu cadastro como indicador, você terá acesso ao painel onde poderá cadastrar suas indicações com os dados básicos dos potenciais clientes."
  },
  {
    question: "O que acontece depois que eu indico alguém?",
    answer: "Nossa equipe entrará em contato com a pessoa indicada para oferecer nosso serviço. Você poderá acompanhar todo o processo através do seu painel de indicador."
  },
  {
    question: "Quais dados são necessários para fazer uma indicação?",
    answer: "Para indicar alguém, você precisa fornecer o nome completo, telefone, e-mail, cidade e uma estimativa do valor da conta de luz do indicado."
  }
];

const comissoesFaqs = [
  {
    question: "Como são calculadas as comissões?",
    answer: "As comissões são calculadas como 10% do valor da fatura de energia do cliente indicado mensalmente."
  },
  {
    question: "Quando recebo minha comissão?",
    answer: "As comissões são pagas após a confirmação da contratação do serviço pelo cliente indicado, normalmente em até 30 dias após a conversão do lead."
  },
  {
    question: "Recebo comissão recorrente?",
    answer: "Sim, você receberá comissões mensais enquanto seu indicado permanecer como cliente ativo da LEX+ENERGIA."
  },
  {
    question: "Preciso emitir nota fiscal para receber?",
    answer: "Não é necessário emitir nota fiscal para receber suas comissões. O pagamento é feito diretamente via PIX para a chave cadastrada."
  },
  {
    question: "Qual o valor médio das comissões?",
    answer: "O valor varia de acordo com o consumo de energia do seu indicado. Para uma conta média de R$ 500, você receberia R$ 50 mensais de comissão, totalizando R$ 600 por ano por cliente indicado."
  }
];

const beneficiosFaqs = [
  {
    question: "Quais são os benefícios para quem é indicado?",
    answer: "Os indicados conseguem economizar até 20% na conta de luz, sem investimento inicial e com toda a assessoria necessária."
  },
  {
    question: "É necessário fazer alguma alteração na instalação elétrica?",
    answer: "Não é necessário fazer nenhuma alteração na instalação elétrica. O processo é 100% burocrático e não envolve obras ou instalações."
  },
  {
    question: "Isso é legal? É regulamentado?",
    answer: "Sim, o serviço é 100% legal e está de acordo com a Resolução Normativa da ANEEL nº 482/2012 e suas atualizações."
  },
  {
    question: "Quanto tempo demora para o indicado começar a economizar?",
    answer: "Após a contratação, o processo de migração leva em média de 30 a 60 dias, dependendo da distribuidora de energia local."
  },
  {
    question: "Quem pode se beneficiar desse serviço?",
    answer: "Qualquer pessoa física ou jurídica que tenha uma conta de energia elétrica convencional e pague mais de R$ 300 mensais pode se beneficiar."
  }
];

const FAQPage = () => {
  return (
    <div 
      className="flex min-h-screen flex-col" 
      style={{
        backgroundImage: "url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="flex min-h-screen flex-col bg-brand-blue/50 backdrop-blur-sm">
        <Header />
        <main className="flex-1 py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-brand-lime mb-4">Perguntas Frequentes</h1>
              <p className="text-lg text-white max-w-3xl mx-auto">
                Todas as informações que você precisa saber sobre o programa de indicação da LEX+ENERGIA
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
              <Tabs defaultValue="programa" className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
                  <TabsTrigger value="programa" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Sobre o Programa</TabsTrigger>
                  <TabsTrigger value="indicacoes" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Indicações</TabsTrigger>
                  <TabsTrigger value="comissoes" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Comissões</TabsTrigger>
                  <TabsTrigger value="beneficios" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Benefícios aos Indicados</TabsTrigger>
                </TabsList>
                
                <TabsContent value="programa">
                  <Accordion type="single" collapsible className="w-full">
                    {programaFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`programa-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-800">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="indicacoes">
                  <Accordion type="single" collapsible className="w-full">
                    {indicacoesFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`indicacoes-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-800">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="comissoes">
                  <Accordion type="single" collapsible className="w-full">
                    {comissoesFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`comissoes-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-800">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
                
                <TabsContent value="beneficios">
                  <Accordion type="single" collapsible className="w-full">
                    {beneficiosFaqs.map((faq, index) => (
                      <AccordionItem key={index} value={`beneficios-${index}`}>
                        <AccordionTrigger className="text-left font-medium text-gray-800">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FAQPage;
