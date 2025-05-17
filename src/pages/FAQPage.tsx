
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
import { BookOpen, Mail, HeadphonesIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  },
  {
    question: "Existe algum custo para participar do programa?",
    answer: "Não há nenhum custo para participar. O cadastro é totalmente gratuito e não cobramos taxas de adesão ou mensalidades."
  },
  {
    question: "Como faço meu cadastro como indicador?",
    answer: "Basta acessar nossa plataforma, clicar em 'Cadastre-se', preencher todos os seus dados, incluindo uma chave PIX válida para recebimento de comissões, e concordar com nosso regulamento."
  },
  {
    question: "Posso participar sendo pessoa jurídica?",
    answer: "Sim, empresas também podem se cadastrar como indicadoras. O processo é o mesmo, mas exige informações específicas de pessoa jurídica como CNPJ e razão social."
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
  },
  {
    question: "Posso acompanhar o status das minhas indicações?",
    answer: "Sim, através do seu painel de indicador você consegue acompanhar em tempo real o status de cada indicação, desde o cadastro inicial até a conversão em contrato."
  },
  {
    question: "É possível indicar clientes de qualquer região do Brasil?",
    answer: "Sim, aceitamos indicações de todo o território nacional, desde que a região seja atendida pelo serviço de portabilidade da ALEXANDRIA ENERGIA."
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
    question: "Quando recebo minhas comissões?",
    answer: "As comissões são pagas em até 60 dias após a assinatura de contrato do INDICADO com a ALEXANDRIA ENERGIA através da chave PIX informada no cadastro."
  },
  {
    question: "Recebo comissão recorrente?",
    answer: "Não, você receberá apenas uma comissão de 10% sobre o valor aplicado a parcela faturável de energia da fatura apresentada pelo seu INDICADO para a ALEXANDRIA gerar uma proposta comercial."
  },
  {
    question: "Preciso Emitir Nota Fiscal?",
    answer: "Não é necessário emitir nota fiscal para receber suas comissões. O pagamento é feito diretamente via PIX para a chave cadastrada."
  },
  {
    question: "Existe um valor mínimo ou máximo de comissão?",
    answer: "Não há valor mínimo estabelecido. O valor da comissão é diretamente proporcional ao consumo de energia do seu indicado. Também não há um teto máximo para ganhos."
  },
  {
    question: "O que acontece se meu indicado desistir após assinar o contrato?",
    answer: "Uma vez que o contrato foi assinado e a comissão foi gerada, você não perde o direito à comissão, mesmo se posteriormente o cliente decidir cancelar o serviço."
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
  },
  {
    question: "Por quanto tempo o meu indicado economizará na conta de luz?",
    answer: "O contrato padrão tem duração de 12 meses, podendo ser renovado. Durante todo esse período, seu indicado continuará economizando na conta de energia."
  },
  {
    question: "Meu indicado pode cancelar o contrato a qualquer momento?",
    answer: "O contrato possui um período mínimo de fidelidade. Os termos específicos e condições para cancelamento estão detalhados no contrato que será apresentado ao seu indicado."
  }
];

const sistemaDeFAQs = [
  {
    question: "Como acesso o painel do indicador?",
    answer: "Após realizar seu cadastro e login na plataforma, você será direcionado automaticamente para o seu painel de indicador, onde poderá acompanhar suas indicações e comissões."
  },
  {
    question: "Esqueci minha senha, como recupero?",
    answer: "Na página de login, clique em 'Esqueci minha senha' e siga as instruções que serão enviadas para o e-mail cadastrado."
  },
  {
    question: "Como faço para atualizar meus dados cadastrais?",
    answer: "No seu painel do indicador, acesse o menu 'Configurações' ou 'Minha Conta' para atualizar seus dados pessoais, incluindo a chave PIX para recebimento."
  },
  {
    question: "Os relatórios disponíveis no sistema podem ser baixados?",
    answer: "Sim, todos os relatórios gerados pelo sistema podem ser baixados em formato PDF para seu controle e acompanhamento."
  },
  {
    question: "O sistema funciona bem em dispositivos móveis?",
    answer: "Sim, nossa plataforma é totalmente responsiva e funciona perfeitamente em smartphones e tablets, permitindo que você faça indicações e acompanhe seu desempenho de qualquer lugar."
  }
];

const FAQPage = () => {
  return (
    <div 
      className="min-h-screen bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed"
    >
      <div className="min-h-screen bg-brand-blue/50 backdrop-blur-sm flex flex-col">
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
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                  <TabsTrigger value="programa" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Sobre o Programa</TabsTrigger>
                  <TabsTrigger value="indicacoes" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Indicações</TabsTrigger>
                  <TabsTrigger value="comissoes" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Comissões</TabsTrigger>
                  <TabsTrigger value="beneficios" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Benefícios</TabsTrigger>
                  <TabsTrigger value="sistema" className="data-[state=active]:bg-brand-lime data-[state=active]:text-white">Sistema</TabsTrigger>
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

                <TabsContent value="sistema">
                  <Accordion type="single" collapsible className="w-full">
                    {sistemaDeFAQs.map((faq, index) => (
                      <AccordionItem key={index} value={`sistema-${index}`}>
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
              
              <div className="mt-10 border-t pt-8 flex flex-col md:flex-row gap-6 items-center justify-between">
                <div className="flex items-center text-brand-blue gap-2">
                  <BookOpen size={24} />
                  <span className="font-medium">Quer conhecer todos os detalhes do programa?</span>
                </div>
                <div className="flex gap-4">
                  <Link to="/regulamento">
                    <Button variant="outline" className="border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white">
                      Ver Regulamento Completo
                    </Button>
                  </Link>
                  <Link to="/suporte">
                    <Button className="bg-brand-blue hover:bg-brand-blue/90 text-white flex items-center gap-2">
                      <HeadphonesIcon size={18} />
                      <span>Central de Suporte</span>
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="mt-10 bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-brand-blue mb-2">Não encontrou o que procura?</h3>
                    <p className="text-gray-600">Nossa equipe de suporte está pronta para ajudar você com qualquer dúvida.</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Link to="/suporte">
                      <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white flex items-center gap-2">
                        <Mail size={18} />
                        <span>Contato</span>
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FAQPage;
