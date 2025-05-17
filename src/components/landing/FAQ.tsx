
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const faqs = [
  {
    question: "Quem pode se tornar um indicador?",
    answer: "Qualquer pessoa maior de 18 anos pode se cadastrar para ser um indicador da LEX+ENERGIA. Não é necessário conhecimento técnico, apenas sua rede de contatos."
  },
  {
    question: "Existe algum custo para participar do programa?",
    answer: "Não há nenhum custo para participar. O cadastro é totalmente gratuito e não cobramos taxas de adesão ou mensalidades."
  },
  {
    question: "Como são calculadas as comissões?",
    answer: "As comissões são calculadas com base no valor da fatura de energia do cliente indicado. Quanto maior o valor da fatura, maior a comissão. Todos os detalhes estão disponíveis no regulamento."
  },
  {
    question: "Quando recebo minhas comissões?",
    answer: "As comissões são pagas após a confirmação da contratação do serviço pelo cliente indicado, normalmente em até 30 dias após a conversão do lead."
  },
  {
    question: "Posso indicar qualquer tipo de cliente?",
    answer: "Você pode indicar tanto pessoas físicas quanto empresas, desde que tenham faturas de energia acima de R$ 300,00 mensais."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-blue mb-4">Perguntas Frequentes</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Tire suas principais dúvidas sobre o programa de indicação da LEX+ENERGIA
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-gray-800">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-8 text-center">
            <Link to="/faq">
              <Button variant="outline" className="border-brand-blue text-brand-blue hover:bg-brand-blue/10 rounded-full">
                Ver todas as perguntas
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
