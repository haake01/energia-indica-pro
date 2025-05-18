
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from "lucide-react";

const programaFaqs = [
  {
    question: "O que é o programa Indique e Ganhe da LEX +ENERGIA?",
    answer: "O programa Indique e Ganhe é uma iniciativa da LEX+ENERGIA que permite que os indicadores recebam comissões para indicar novos clientes para economia de energia elétrica, e receber comissões pelos contratos assinados pelos seus INDICADOS com a ALEXANDRIA ENERGIA."
  },
  {
    question: "Existe algum Regulamento?",
    answer: "Sim, você ao preencher seus dados como INDICADOR, estará aderindo irrestritamente a todas as regras e condições estipuladas no REGULAMENTO disponível nesta plataforma."
  },
  {
    question: "Quem pode participar como indicador?",
    answer: "Qualquer pessoa física com networking aderente ao perfil de consumo de energia pode se cadastrar e participar como INDICADOR. Não há requisitos específicos além de preencher o cadastro com dados válidos e ter uma chave PIX para coleta de comissões."
  }
];

const indicacoesFaqs = [
  {
    question: "Quem posso indicar?",
    answer: "Você pode indicar tanto pessoas físicas quanto jurídicas que pagam mais de R$ 300,00 na conta de energia elétrica mensal."
  },
  {
    question: "Existe limite de INDICADOS?",
    answer: "Não existe limite de indicações. Você pode indicar quantos clientes quiser, a qualquer tempo, desde que atendam aos requisitos mínimos."
  },
  {
    question: "Como faço para indicar alguém?",
    answer: "Após fazer seu cadastro como INDICADOR, você terá acesso ao painel onde poderá cadastrar seus INDICADOS com os dados básicos para contato e abordagem. Deverá estar atento e obedecer de maneira irrestrita às regras do REGULAMENTO desta Campanha de Indicações."
  },
  {
    question: "O que acontece depois que eu indico alguém?",
    answer: "Nossa equipe entrará em contato com a pessoa indicada para oferecer nosso serviço. Você poderá acompanhar todo o processo através do seu painel de indicador."
  }
];

const comissoesFaqs = [
  {
    question: "Qual o fato gerador de Comissões neste programa de indicações?",
    answer: "O fato gerador de Comissões é a assinatura do contrato do INDICADO com a ALEXANDRIA ENERGIA. O INDICADOR poderá acompanhar nesta plataforma o andamento do processo e interagir com seu INDICADO para estimulá-lo a efetivar seu CONTRATO DE ASSINATURA DE ENERGIA. Estima-se que em até 60 dias após a assinatura do contrato, ocorrerá o pagamento da Comissão."
  },
  {
    question: "Quem me pagará as Comissões?",
    answer: "A +Energia como afiliada \"LEX\" da ALEXANDRIA ENERGIA é a única responsável por este Programa de Indicações, e portanto, do pagamento de Comissões pelas INDICAÇÕES CONVERTIDAS."
  },
  {
    question: "Como são calculadas as comissões?",
    answer: "As comissões são calculadas aplicando-se 10% sobre o valor da parcela de energia da fatura apresentada pelo INDICADO (excluídos todos os itens que não sejam ENERGIA) no momento da geração da proposta comercial pela Alexandria, uma única vez. Não existe recorrência."
  },
  {
    question: "Recebo comissão recorrente?",
    answer: "Não, você receberá apenas uma comissão de 10% sobre o valor aplicado a parcela faturável de energia da fatura apresentada pelo seu INDICADO para a ALEXANDRIA gerar uma proposta comercial."
  }
];

const beneficiosFaqs = [
  {
    question: "Quais são os benefícios para quem é indicado?",
    answer: "Os indicados que fizerem sua portabilidade e assinarem contrato com a Alexandria conseguem economizar de 5% até 20% (na pessoa física, baixa tensão) e de 20% a 40% para empresas (média e alta tensão) na conta de energia, sem qualquer investimento inicial, permanecendo sempre em bandeira verde e no caso de empresas, ficando livre do horário de ponta."
  },
  {
    question: "É necessário fazer alguma alteração na instalação elétrica?",
    answer: "Não é necessário fazer nenhuma alteração na instalação elétrica ou investimento. O processo é 100% \"sistêmico\", similar a portabilidade de telefonia celular ou empréstimos bancários. A injeção dos créditos de energia ocorre em até 120 dias da assinatura do contrato, lembrando que este prazo é estabelecido pela ANEEL."
  },
  {
    question: "Isso é legal? Está regulamentado?",
    answer: "Sim, o serviço é 100% legal e está de acordo com a Lei 14.300/22 Resolução Normativa da ANEEL nº 482/2012 e suas atualizações."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-brand-lime">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-white max-w-3xl mx-auto">
            Tire suas principais dúvidas sobre o programa de indicação da LEX+ENERGIA
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto bg-brand-lime rounded-2xl shadow p-8">
          <Tabs defaultValue="programa" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8 bg-white/20">
              <TabsTrigger value="programa" className="data-[state=active]:bg-white data-[state=active]:text-brand-lime text-white">Sobre o Programa</TabsTrigger>
              <TabsTrigger value="indicacoes" className="data-[state=active]:bg-white data-[state=active]:text-brand-lime text-white">Indicações</TabsTrigger>
              <TabsTrigger value="comissoes" className="data-[state=active]:bg-white data-[state=active]:text-brand-lime text-white">Comissões</TabsTrigger>
              <TabsTrigger value="beneficios" className="data-[state=active]:bg-white data-[state=active]:text-brand-lime text-white">Benefícios aos Indicados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="programa">
              <Accordion type="single" collapsible className="w-full">
                {programaFaqs.map((faq, index) => (
                  <AccordionItem key={index} value={`programa-${index}`}>
                    <AccordionTrigger className="text-left font-medium text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white">
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
                    <AccordionTrigger className="text-left font-medium text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white">
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
                    <AccordionTrigger className="text-left font-medium text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white">
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
                    <AccordionTrigger className="text-left font-medium text-white">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 text-white">
              <BookOpen size={20} />
              <span>Quer conhecer todos os detalhes?</span>
            </div>
            <div className="flex gap-4">
              <Link to="/perguntas-frequentes">
                <Button variant="outline" className="border-white bg-white text-brand-lime hover:bg-white/80 rounded-full">
                  Ver todas as perguntas
                </Button>
              </Link>
              <Link to="/regulamento">
                <Button variant="outline" className="border-white bg-white text-brand-lime hover:bg-white/80 rounded-full">
                  Ver regulamento
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
