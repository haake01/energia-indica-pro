
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const TermosPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto py-12 px-4 md:px-6 max-w-4xl">
        <div className="mb-8">
          <Link to="/" className="text-brand-blue hover:text-brand-blue/80 inline-flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar à página inicial
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Termos de Uso</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="font-medium">
              Última atualização: 18 de maio de 2025
            </p>
            
            <p className="mt-6">
              Bem-vindo à plataforma LEX+ENERGIA, operada pela Alexandria Energia (CNPJ 32.372.756/0001-58).
              Por favor, leia atentamente estes Termos de Uso antes de utilizar nossos serviços.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar ou utilizar nossa plataforma, você confirma que leu, entendeu e concorda com estes Termos de Uso 
              e com nossa Política de Privacidade. Se você não concordar com qualquer parte destes termos, não poderá 
              acessar ou utilizar nossos serviços.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Descrição do Serviço</h2>
            <p>
              A plataforma LEX+ENERGIA é um sistema para gerenciamento de indicações de clientes interessados em 
              economizar de 5% a 40% em suas contas de energia através do mercado livre de energia. A plataforma permite:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Cadastramento como indicador</li>
              <li>Registro de indicações (leads) de pessoas físicas e jurídicas</li>
              <li>Acompanhamento do status das indicações</li>
              <li>Gestão de comissões por indicações bem-sucedidas</li>
              <li>Geração de relatórios e análises</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Cadastro e Conta</h2>
            <p>
              3.1. Para utilizar nossos serviços como indicador, você precisará criar uma conta fornecendo informações 
              precisas e atualizadas.
            </p>
            <p className="mt-2">
              3.2. Você é responsável por manter a confidencialidade de sua senha e por todas as atividades 
              realizadas em sua conta.
            </p>
            <p className="mt-2">
              3.3. Reservamo-nos o direito de recusar cadastros, suspender ou encerrar contas a nosso critério, 
              especialmente em casos de informações falsas ou uso indevido.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Uso da Plataforma</h2>
            <p>
              4.1. Indicadores apenas poderão ver e gerenciar suas próprias indicações.
            </p>
            <p className="mt-2">
              4.2. Gestores terão acesso às informações conforme seu nível de permissão.
            </p>
            <p className="mt-2">
              4.3. É expressamente proibido:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Usar a plataforma para fins ilegais ou não autorizados</li>
              <li>Violar os direitos de propriedade intelectual</li>
              <li>Tentar acessar dados de outros usuários</li>
              <li>Realizar engenharia reversa ou tentativas de invasão</li>
              <li>Compartilhar suas credenciais de acesso</li>
              <li>Publicar conteúdo ofensivo, difamatório ou discriminatório</li>
              <li>Utilizar meios automatizados para acessar o serviço sem autorização</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Comissões e Pagamentos</h2>
            <p>
              5.1. As comissões são pagas conforme as regras estabelecidas no Regulamento, disponível na plataforma.
            </p>
            <p className="mt-2">
              5.2. O pagamento de comissões ocorrerá apenas após a confirmação de contratação efetiva por parte do 
              cliente indicado.
            </p>
            <p className="mt-2">
              5.3. A Alexandria Energia reserva-se o direito de reter pagamentos em casos de suspeita de fraude ou 
              irregularidades nas indicações.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Proteção de Dados</h2>
            <p>
              6.1. Tratamos seus dados pessoais de acordo com nossa Política de Privacidade e conforme a 
              Lei Geral de Proteção de Dados (LGPD).
            </p>
            <p className="mt-2">
              6.2. Ao utilizar nossa plataforma, você autoriza a coleta e processamento de seus dados conforme 
              descrito na Política de Privacidade.
            </p>
            <p className="mt-2">
              6.3. Você é responsável por obter o consentimento adequado das pessoas cujos dados fornece como indicações.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Propriedade Intelectual</h2>
            <p>
              7.1. Todo o conteúdo disponibilizado na plataforma, incluindo mas não limitado a textos, gráficos, logos, 
              ícones, imagens, clipes de áudio, downloads digitais e softwares, é propriedade da Alexandria Energia 
              ou de seus licenciadores e está protegido por leis de propriedade intelectual.
            </p>
            <p className="mt-2">
              7.2. É proibida a reprodução, distribuição, exibição, transmissão, uso, modificação, ou qualquer outra 
              forma de utilização do material da plataforma sem consentimento prévio por escrito.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Limitação de Responsabilidade</h2>
            <p>
              8.1. A Alexandria Energia não garante que o serviço estará disponível ininterruptamente ou livre de erros.
            </p>
            <p className="mt-2">
              8.2. Não somos responsáveis por perdas ou danos resultantes de:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Falhas ou interrupções no serviço</li>
              <li>Vírus ou outros códigos maliciosos que possam afetar seu equipamento</li>
              <li>Condutas de terceiros na plataforma</li>
              <li>Informações imprecisas fornecidas por usuários</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Alterações nos Termos</h2>
            <p>
              Podemos modificar estes Termos a qualquer momento, publicando os termos revisados na plataforma. 
              Seu uso continuado da plataforma após tais alterações constitui aceitação dos novos termos.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Cancelamento e Rescisão</h2>
            <p>
              10.1. Você pode cancelar sua conta a qualquer momento, entrando em contato com nosso suporte.
            </p>
            <p className="mt-2">
              10.2. Reservamo-nos o direito de suspender ou encerrar seu acesso à plataforma, sem aviso prévio, 
              em caso de violação destes Termos.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">11. Lei Aplicável</h2>
            <p>
              Estes Termos são regidos pelas leis brasileiras. Qualquer disputa ou reclamação relacionada a estes 
              termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">12. Contato</h2>
            <p>
              Para questões relacionadas a estes Termos, entre em contato pelo e-mail: 
              <a href="mailto:contato@lexmaisenergia.com.br" className="text-brand-blue hover:underline ml-1">
                contato@lexmaisenergia.com.br
              </a>
            </p>
            
            <p className="mt-10 pt-4 border-t text-sm text-gray-500">
              Alexandria Energia - CNPJ 32.372.756/0001-58
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermosPage;
