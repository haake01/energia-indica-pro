
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const CookiesPage = () => {
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
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Política de Cookies</h1>
          
          <div className="prose max-w-none text-gray-700">
            <h2 className="text-xl font-semibold mt-6 mb-3">1. O que são cookies?</h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados em seu dispositivo (computador, smartphone ou tablet) 
              quando você visita nosso site. Eles permitem que o site lembre suas ações e preferências por um período 
              de tempo, para que você não precise reinseri-las quando revisitar o site ou navegar de uma página para outra.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">2. Como utilizamos os cookies</h2>
            <p>
              A LEX+ENERGIA utiliza cookies para diversas finalidades, incluindo:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>
                <strong>Cookies essenciais:</strong> necessários para o funcionamento básico do site, como autenticação 
                e segurança.
              </li>
              <li>
                <strong>Cookies de preferências:</strong> armazenam suas configurações e preferências de uso.
              </li>
              <li>
                <strong>Cookies estatísticos:</strong> coletam informações anônimas sobre como você utiliza nosso site, 
                nos ajudando a melhorar sua estrutura e conteúdo.
              </li>
              <li>
                <strong>Cookies de marketing:</strong> utilizados para exibir anúncios personalizados de acordo 
                com seus interesses.
              </li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">3. Tipos de cookies que utilizamos</h2>
            <div className="overflow-x-auto mt-4 mb-6">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Tipo de Cookie</th>
                    <th className="border border-gray-300 px-4 py-2">Descrição</th>
                    <th className="border border-gray-300 px-4 py-2">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Sessão</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Armazenam informações temporárias para monitorar suas atividades durante uma visita
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Temporário (até fechar o navegador)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Persistentes</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Armazenam suas preferências para visitas recorrentes
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Permanente (até expirar ou ser excluído)</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">Próprios</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Criados pelo nosso site
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Variável</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2">De terceiros</td>
                    <td className="border border-gray-300 px-4 py-2">
                      Providos por serviços externos (Google Analytics, etc.)
                    </td>
                    <td className="border border-gray-300 px-4 py-2">Variável</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">4. Como gerenciar cookies</h2>
            <p>
              Você pode controlar e/ou excluir cookies conforme desejar. A maioria dos navegadores permite 
              recusar cookies ou aceitá-los caso a caso. Para saber mais sobre como gerenciar cookies, 
              verifique as configurações de seu navegador ou dispositivo.
            </p>
            <p className="mt-4">
              É importante observar que desativar determinados cookies pode afetar a funcionalidade do site.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">5. Cookies de terceiros</h2>
            <p>
              Alguns cookies são colocados por serviços terceirizados que aparecem em nossas páginas, como:
            </p>
            <ul className="list-disc pl-6 mt-2 mb-4 space-y-2">
              <li>Google Analytics (análise de uso do site)</li>
              <li>Supabase (autenticação e gerenciamento de dados)</li>
              <li>Plataformas de mídia social (para permitir compartilhamentos)</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">6. Atualizações na política de cookies</h2>
            <p>
              Esta política pode ser atualizada periodicamente para refletir alterações em nossas práticas 
              ou obrigações legais. A data da última atualização será sempre indicada no final deste documento.
            </p>
            
            <h2 className="text-xl font-semibold mt-6 mb-3">7. Contato</h2>
            <p>
              Caso tenha dúvidas sobre esta política, entre em contato conosco através do e-mail: 
              <a href="mailto:contato@lexmaisenergia.com.br" className="text-brand-blue hover:underline">
                contato@lexmaisenergia.com.br
              </a>
            </p>
            
            <p className="mt-10 pt-4 border-t text-sm text-gray-500">
              Última atualização: 18 de maio de 2025
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;
