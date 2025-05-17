
import { CircleCheck, Coins, Send, UserPlus } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Cadastre-se",
    description: "Faça seu cadastro gratuito como indicador e ative sua conta",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Indique conhecidos que queiram economizar no gasto de energia",
    description: "Cadastre pessoas ou empresas que pagam mais de R$ 300 na conta de luz",
    icon: Send,
  },
  {
    id: 3,
    title: "Acompanhe o status",
    description: "Veja em tempo real o andamento das suas indicações",
    icon: CircleCheck,
  },
  {
    id: 4,
    title: "Receba comissões",
    description: "Ganhe por cada cliente que economiza com nossa energia",
    icon: Coins,
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-xs font-semibold rounded-full bg-brand-blue/10 text-brand-blue">Como Funciona</span>
          <h2 className="text-3xl font-bold text-brand-blue mb-4">Processo Simples em 4 Passos</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O programa de indicação da LEX+ENERGIA é simples e transparente.
            Siga os passos abaixo e comece a ganhar:
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center text-center p-8 border border-gray-100 rounded-2xl shadow-md hover:shadow-lg transition-all hover:-translate-y-1 bg-brand-blue text-white"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 mb-4">
                <step.icon className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {step.id}. {step.title}
              </h3>
              <p className="text-white/90">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
