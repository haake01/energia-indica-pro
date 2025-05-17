
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const RegulamentoPage = () => {
  return (
    <div className="min-h-screen bg-[url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')] bg-cover bg-center bg-fixed">
      <div className="min-h-screen bg-white/90 flex flex-col">
        <div className="container mx-auto py-8">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Link>
            </div>
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-brand-blue mb-4">Regulamento do Programa de Indicações</h1>
              <p className="text-gray-500">Atualizado em: 17 de Maio de 2025</p>
            </div>
            
            <div className="prose max-w-none">
              <h2 className="text-xl font-semibold text-brand-blue mb-4">1. Definições</h2>
              <p className="mb-4">
                Para os fins deste Regulamento, os termos e expressões empregados em letras maiúsculas terão os significados a eles atribuídos abaixo:
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><strong>INDICADOR</strong>: pessoa física cadastrada na plataforma LEX+ENERGIA para indicação de potenciais clientes.</li>
                <li><strong>INDICADO</strong>: pessoa física ou jurídica indicada pelo INDICADOR como potencial cliente dos produtos e serviços oferecidos.</li>
                <li><strong>ALEXANDRIA ENERGIA</strong>: empresa parceira responsável pela comercialização dos produtos e serviços de energia.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">2. Objetivo do Programa</h2>
              <p className="mb-6">
                O programa de indicação tem como objetivo incentivar que os INDICADORES indiquem potenciais clientes para contratação de serviços de economia de energia elétrica, recebendo comissões pelos contratos efetivamente assinados pelos seus INDICADOS com a ALEXANDRIA ENERGIA.
              </p>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">3. Elegibilidade</h2>
              <p className="mb-4">
                Podem participar como INDICADORES:
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Pessoas físicas maiores de 18 anos;</li>
                <li>Com cadastro completo e aprovado na plataforma;</li>
                <li>Com dados válidos e verificados;</li>
                <li>Que aceitaram integralmente os termos deste regulamento.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">4. Processo de Indicação</h2>
              <p className="mb-4">
                O processo de indicação funciona da seguinte forma:
              </p>
              <ol className="list-decimal pl-5 mb-6 space-y-2">
                <li>O INDICADOR cadastra os dados do potencial cliente (INDICADO) na plataforma;</li>
                <li>A equipe da LEX+ENERGIA entra em contato com o INDICADO para apresentar os serviços;</li>
                <li>Caso o INDICADO demonstre interesse, a ALEXANDRIA ENERGIA elabora uma proposta comercial;</li>
                <li>Se o INDICADO assinar o contrato, o INDICADOR terá direito à comissão conforme regras deste regulamento.</li>
              </ol>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">5. Comissionamento</h2>
              <p className="mb-4">
                As regras de comissionamento são:
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>A comissão será de 10% sobre o valor da parcela de energia da fatura apresentada pelo INDICADO no momento da geração da proposta comercial;</li>
                <li>O pagamento será realizado em até 60 dias após a assinatura do contrato do INDICADO com a ALEXANDRIA ENERGIA;</li>
                <li>A comissão será paga uma única vez, não havendo recorrência;</li>
                <li>O pagamento será feito via PIX para a chave cadastrada pelo INDICADOR;</li>
                <li>Não é necessária a emissão de nota fiscal para recebimento das comissões.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">6. Responsabilidades</h2>
              <p className="mb-6">
                O INDICADOR se compromete a:
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Fornecer informações verdadeiras sobre os INDICADOS;</li>
                <li>Obter autorização prévia dos INDICADOS para compartilhamento de seus dados;</li>
                <li>Não fazer promessas ou garantias que não estejam previstas nas ofertas oficiais;</li>
                <li>Não se apresentar como representante ou funcionário da LEX+ENERGIA ou ALEXANDRIA ENERGIA.</li>
              </ul>
              
              <h2 className="text-xl font-semibold text-brand-blue mb-4">7. Disposições Gerais</h2>
              <p className="mb-4">
                A LEX+ENERGIA se reserva o direito de:
              </p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li>Alterar este regulamento a qualquer momento, mediante aviso prévio;</li>
                <li>Encerrar o programa de indicação a seu critério;</li>
                <li>Cancelar o cadastro de INDICADORES que violarem este regulamento ou praticarem atos fraudulentos;</li>
                <li>Resolver casos omissos não previstos neste regulamento.</li>
              </ul>
              
              <p className="text-gray-700 italic">
                Este documento é uma previsão do regulamento final. O regulamento oficial será disponibilizado após aprovação jurídica.
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <Button asChild className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                <Link to="/cadastro">Voltar para o cadastro</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulamentoPage;
