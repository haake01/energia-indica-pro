
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const RegulamentoPage = () => {
  const handleDownloadRegulamento = () => {
    toast({
      title: "Download iniciado",
      description: "O regulamento será baixado em formato PDF.",
    });
  };

  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-white/95 flex flex-col">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
              
              <div className="ml-auto">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleDownloadRegulamento}
                >
                  <Download size={16} />
                  <span>Baixar PDF</span>
                </Button>
              </div>
            </div>
            
            <div className="mb-8 text-center">
              <Badge className="mb-4 bg-brand-orange text-white">Versão 1.0 - Maio/2025</Badge>
              <h1 className="text-3xl font-bold text-brand-blue mb-4">Regulamento do Programa de Indicações</h1>
              <p className="text-gray-500">Última atualização: 17 de Maio de 2025</p>
            </div>
            
            <div className="prose max-w-none">
              <p className="text-lg font-medium text-brand-blue mb-6">
                O presente regulamento estabelece as regras e condições para participação no programa de indicações LEX+ENERGIA.
              </p>
              
              <Accordion type="multiple" className="mb-8">
                <AccordionItem value="definicoes">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    1. Definições
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      Para os fins deste Regulamento, os termos e expressões empregados em letras maiúsculas terão os significados a eles atribuídos abaixo:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li><strong>INDICADOR</strong>: pessoa física cadastrada na plataforma LEX+ENERGIA para indicação de potenciais clientes.</li>
                      <li><strong>INDICADO</strong>: pessoa física ou jurídica indicada pelo INDICADOR como potencial cliente dos produtos e serviços oferecidos.</li>
                      <li><strong>ALEXANDRIA ENERGIA</strong>: empresa parceira responsável pela comercialização dos produtos e serviços de energia.</li>
                      <li><strong>LEX+ENERGIA</strong>: nome fantasia da empresa +ENERGIA, inscrita no CNPJ 32.372.756/0001-58, responsável pelo programa de indicações.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="objetivo">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    2. Objetivo do Programa
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      O programa de indicação tem como objetivo incentivar que os INDICADORES indiquem potenciais clientes para contratação de serviços de economia de energia elétrica, recebendo comissões pelos contratos efetivamente assinados pelos seus INDICADOS com a ALEXANDRIA ENERGIA.
                    </p>
                    
                    <p>
                      O programa visa criar uma rede de parceiros que possam divulgar os benefícios da portabilidade de energia elétrica, auxiliando pessoas físicas e jurídicas a reduzirem seus custos com energia sem necessidade de investimentos iniciais.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="elegibilidade">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    3. Elegibilidade
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      Podem participar como INDICADORES:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Pessoas físicas maiores de 18 anos;</li>
                      <li>Com cadastro completo e aprovado na plataforma;</li>
                      <li>Com dados válidos e verificados;</li>
                      <li>Que aceitaram integralmente os termos deste regulamento.</li>
                    </ul>
                    
                    <p>
                      Não podem participar:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Funcionários ou prestadores de serviço da LEX+ENERGIA ou da ALEXANDRIA ENERGIA;</li>
                      <li>Pessoas jurídicas de qualquer natureza;</li>
                      <li>Pessoas físicas que não completaram o processo de cadastro;</li>
                      <li>Menores de 18 anos.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="processo">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    4. Processo de Indicação
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      O processo de indicação funciona da seguinte forma:
                    </p>
                    <ol className="list-decimal pl-5 space-y-2">
                      <li>O INDICADOR cadastra os dados do potencial cliente (INDICADO) na plataforma;</li>
                      <li>A equipe da LEX+ENERGIA entra em contato com o INDICADO para apresentar os serviços;</li>
                      <li>Caso o INDICADO demonstre interesse, a ALEXANDRIA ENERGIA elabora uma proposta comercial;</li>
                      <li>Se o INDICADO assinar o contrato, o INDICADOR terá direito à comissão conforme regras deste regulamento.</li>
                    </ol>
                    
                    <p><strong>Tipos de clientes elegíveis para indicação:</strong></p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Pessoas físicas que pagam mais de R$ 300,00 mensais em sua conta de energia;</li>
                      <li>Pessoas jurídicas de qualquer porte que possuam CNPJ ativo;</li>
                      <li>Clientes localizados em território nacional, nas áreas onde a ALEXANDRIA ENERGIA possui cobertura.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="comissionamento">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    5. Comissionamento
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      As regras de comissionamento são:
                    </p>
                    <ul className="list-disc pl-5 space-y-3">
                      <li>A comissão será de 10% sobre o valor da parcela de energia da fatura apresentada pelo INDICADO no momento da geração da proposta comercial;</li>
                      <li>O pagamento será realizado em até 60 dias após a assinatura do contrato do INDICADO com a ALEXANDRIA ENERGIA;</li>
                      <li>A comissão será paga uma única vez, não havendo recorrência;</li>
                      <li>O pagamento será feito via PIX para a chave cadastrada pelo INDICADOR;</li>
                      <li>Não é necessária a emissão de nota fiscal para recebimento das comissões;</li>
                      <li>Caso o INDICADO rescinda o contrato antes do pagamento da comissão, o INDICADOR perderá o direito à comissão;</li>
                      <li>Valores de comissões serão calculados sobre o valor de energia pura, excluídos impostos, taxas, contribuições e outros encargos presentes na conta de energia.</li>
                    </ul>
                    
                    <div className="bg-gray-100 p-4 rounded-md border-l-4 border-brand-orange">
                      <p className="font-medium">Exemplo de cálculo:</p>
                      <p>Conta de energia do INDICADO: R$ 500,00</p>
                      <p>Valor da parcela de energia pura: R$ 300,00</p>
                      <p>Comissão (10%): R$ 30,00</p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="responsabilidades">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    6. Responsabilidades
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      O INDICADOR se compromete a:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Fornecer informações verdadeiras sobre os INDICADOS;</li>
                      <li>Obter autorização prévia dos INDICADOS para compartilhamento de seus dados;</li>
                      <li>Não fazer promessas ou garantias que não estejam previstas nas ofertas oficiais;</li>
                      <li>Não se apresentar como representante ou funcionário da LEX+ENERGIA ou ALEXANDRIA ENERGIA;</li>
                      <li>Não praticar qualquer ato que possa comprometer a imagem das empresas envolvidas;</li>
                      <li>Respeitar a Lei Geral de Proteção de Dados (LGPD) em todas as etapas do processo;</li>
                      <li>Não utilizar materiais de marketing não aprovados pela LEX+ENERGIA.</li>
                    </ul>
                    
                    <p>
                      A LEX+ENERGIA se compromete a:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Manter a plataforma em funcionamento para registro das indicações;</li>
                      <li>Processar as indicações em tempo hábil;</li>
                      <li>Realizar os pagamentos conforme regras estabelecidas;</li>
                      <li>Fornecer informações sobre o andamento das indicações;</li>
                      <li>Manter a confidencialidade dos dados dos INDICADORES e INDICADOS.</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="disposicoes">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    7. Disposições Gerais
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      A LEX+ENERGIA se reserva o direito de:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Alterar este regulamento a qualquer momento, mediante aviso prévio;</li>
                      <li>Encerrar o programa de indicação a seu critério;</li>
                      <li>Cancelar o cadastro de INDICADORES que violarem este regulamento ou praticarem atos fraudulentos;</li>
                      <li>Resolver casos omissos não previstos neste regulamento.</li>
                    </ul>
                    
                    <p>
                      A participação no programa implica na aceitação total e irrestrita de todos os termos deste regulamento.
                    </p>
                    
                    <p>
                      Eventuais dúvidas ou situações não previstas neste regulamento serão analisadas e decididas pela LEX+ENERGIA, cujas decisões são soberanas e irrecorríveis.
                    </p>
                    
                    <p>
                      Este regulamento está registrado e disponível para consulta pública na plataforma LEX+ENERGIA.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="lgpd">
                  <AccordionTrigger className="text-xl font-semibold text-brand-blue">
                    8. Proteção de Dados
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 space-y-4">
                    <p>
                      Todos os dados pessoais coletados no âmbito do programa de indicação serão tratados em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD).
                    </p>
                    
                    <p>
                      Ao se cadastrar como INDICADOR, o participante autoriza o uso de seus dados para:
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Processamento das indicações;</li>
                      <li>Pagamento das comissões;</li>
                      <li>Comunicações relacionadas ao programa;</li>
                      <li>Cumprimento de obrigações legais e regulatórias.</li>
                    </ul>
                    
                    <p>
                      Para mais informações, consulte nossa Política de Privacidade disponível no site.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <Separator className="my-10" />
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h2 className="text-xl font-bold text-brand-blue mb-4 flex items-center gap-2">
                  <CheckCircle size={24} className="text-green-500" />
                  <span>Termo de Aceite</span>
                </h2>
                
                <p className="mb-6">
                  Ao realizar seu cadastro na plataforma LEX+ENERGIA como INDICADOR, você declara que leu e concordou com todos os termos e condições presentes neste regulamento, comprometendo-se a respeitá-los integralmente.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/cadastro">
                    <Button className="w-full bg-brand-orange hover:bg-brand-orange/90 text-white">
                      Voltar para o Cadastro
                    </Button>
                  </Link>
                  
                  <Link to="/perguntas-frequentes">
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue/10">
                      Ver Perguntas Frequentes
                    </Button>
                  </Link>
                </div>
              </div>
              
              <p className="text-gray-500 italic text-center mt-8">
                Este documento é o regulamento oficial do programa de indicações LEX+ENERGIA. Versão 1.0 - Maio de 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulamentoPage;
