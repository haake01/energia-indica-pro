
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const PrivacidadePage = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Política de Privacidade</h1>
          
          <div className="prose max-w-none text-gray-700">
            <p className="font-medium">
              Última atualização: 18 de maio de 2025
            </p>
            
            <p className="mt-6">
              Esta Política de Privacidade descreve como a Alexandria Energia (LEX+ENERGIA, "nós", "nosso" ou "empresa") 
              coleta, usa, armazena e protege suas informações pessoais quando você utiliza nossa plataforma. 
              Estamos comprometidos com a proteção de sua privacidade e com o cumprimento da Lei Geral de Proteção 
              de Dados (LGPD) e legislação aplicável.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3">1. Dados que coletamos</h2>
            <p>
              Podemos coletar os seguintes tipos de informações:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>
                <strong>Dados de cadastro:</strong> nome completo, e-mail, CPF/CNPJ, telefone, endereço
              </li>
              <li>
                <strong>Dados de indicados:</strong> informações que você fornece sobre potenciais clientes
              </li>
              <li>
                <strong>Dados financeiros:</strong> informações bancárias para pagamento de comissões
              </li>
              <li>
                <strong>Dados de uso:</strong> informações sobre como você utiliza nossa plataforma, incluindo 
                logs, histórico de atividades e interações
              </li>
              <li>
                <strong>Dados técnicos:</strong> endereço IP, tipo de navegador, dispositivo, cookies
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Finalidade do tratamento</h2>
            <p>
              Utilizamos seus dados pessoais para:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Fornecer e gerenciar nossos serviços</li>
              <li>Processar indicações e calcular comissões</li>
              <li>Verificar identidade e prevenir fraudes</li>
              <li>Enviar comunicações relacionadas ao serviço</li>
              <li>Melhorar nossa plataforma e experiência do usuário</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Resolver disputas e solucionar problemas</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Base legal para tratamento</h2>
            <p>
              Tratamos seus dados com base nas seguintes fundamentações legais:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>
                <strong>Execução de contrato:</strong> para fornecer nossos serviços conforme os Termos de Uso
              </li>
              <li>
                <strong>Consentimento:</strong> quando você nos autoriza explicitamente a tratar seus dados
              </li>
              <li>
                <strong>Interesse legítimo:</strong> quando necessário para nossa operação comercial, 
                sem prejudicar seus direitos
              </li>
              <li>
                <strong>Obrigação legal:</strong> quando exigido por lei ou regulamento
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Compartilhamento de dados</h2>
            <p>
              Podemos compartilhar suas informações com:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>
                <strong>Colaboradores da empresa:</strong> funcionários que necessitam acessar os dados 
                para desempenhar suas funções
              </li>
              <li>
                <strong>Fornecedores de serviços:</strong> empresas que nos auxiliam com funcionalidades 
                específicas (como serviços de hospedagem, processamento de pagamentos)
              </li>
              <li>
                <strong>Parceiros comerciais:</strong> quando necessário para viabilizar comissões e contratos
              </li>
              <li>
                <strong>Autoridades públicas:</strong> quando exigido por lei ou ordem judicial
              </li>
            </ul>
            <p className="mt-4">
              Todos os terceiros com quem compartilhamos dados estão obrigados a respeitar a confidencialidade 
              e segurança de suas informações.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Armazenamento e segurança</h2>
            <p>
              5.1. Armazenamos seus dados pelo tempo necessário para cumprir as finalidades para as quais foram 
              coletados, incluindo obrigações legais, contratuais, prestação de contas ou solicitação de autoridades.
            </p>
            <p className="mt-2">
              5.2. Implementamos medidas técnicas e organizacionais apropriadas para proteger seus dados contra 
              acesso não autorizado, alteração, divulgação ou destruição.
            </p>
            <p className="mt-2">
              5.3. Embora nos esforcemos para proteger seus dados, nenhum método de transmissão pela internet 
              ou armazenamento eletrônico é 100% seguro.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Transferência internacional</h2>
            <p>
              Seus dados podem ser transferidos e processados em servidores localizados fora de seu país de 
              residência. Garantimos que qualquer transferência internacional de dados respeite as exigências 
              legais aplicáveis e mantenha nível adequado de proteção.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Seus direitos</h2>
            <p>
              De acordo com a LGPD, você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Confirmar a existência de tratamento de seus dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Solicitar a portabilidade dos dados</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Ser informado sobre a possibilidade de não fornecer consentimento</li>
              <li>Solicitar a revisão de decisões automatizadas</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato através do e-mail: 
              <a href="mailto:privacidade@lexmaisenergia.com.br" className="text-brand-blue hover:underline ml-1">
                privacidade@lexmaisenergia.com.br
              </a>
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">8. Proteção de dados de menores</h2>
            <p>
              Nossos serviços não são direcionados a menores de 18 anos. Não coletamos intencionalmente 
              dados pessoais de pessoas nessa faixa etária. Se você acredita que coletamos informações de 
              um menor, entre em contato conosco imediatamente.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">9. Alterações na Política de Privacidade</h2>
            <p>
              Podemos atualizar esta política periodicamente. A data da última atualização será indicada 
              no início do documento. Recomendamos que você revise esta política regularmente.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">10. Contato</h2>
            <p>
              Para questões relacionadas a esta Política de Privacidade ou sobre o tratamento de seus dados, 
              entre em contato com nosso Encarregado de Proteção de Dados (DPO) através do e-mail: 
              <a href="mailto:dpo@lexmaisenergia.com.br" className="text-brand-blue hover:underline ml-1">
                dpo@lexmaisenergia.com.br
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

export default PrivacidadePage;
