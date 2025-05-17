
import { BadgeCheck, BarChart3, Clock4, CreditCard, ShieldCheck, ThumbsUp } from "lucide-react";

const benefitItems = [
  {
    title: "Comissões Atrativas",
    description: "Ganhe valores significativos por cada cliente que economiza",
    icon: CreditCard,
  },
  {
    title: "Pagamento Rápido",
    description: "Receba suas comissões em prazos justos e transparentes",
    icon: Clock4,
  },
  {
    title: "Zero Investimento",
    description: "Sem taxas de adesão ou mensalidades para participar",
    icon: ThumbsUp,
  },
  {
    title: "Acompanhamento em Tempo Real",
    description: "Painel exclusivo para monitorar suas indicações",
    icon: BarChart3,
  },
  {
    title: "Suporte Dedicado",
    description: "Equipe pronta para auxiliar em todas as etapas",
    icon: ShieldCheck,
  },
  {
    title: "Produto de Qualidade",
    description: "Indique um serviço que realmente entrega economia",
    icon: BadgeCheck,
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold rounded-full bg-brand-orange/10 text-brand-orange">Benefícios</span>
          <h2 className="text-3xl font-bold text-brand-orange mb-4">Por Que Ser um Indicador?</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ao se tornar um indicador da LEX+ENERGIA, você acessa diversos benefícios:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefitItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-brand-orange p-8 rounded-2xl shadow hover:shadow-md transition-all hover:-translate-y-1 flex items-start space-x-4"
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/20">
                  <item.icon className="text-white w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-white">{item.title}</h3>
                <p className="text-white/90">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
