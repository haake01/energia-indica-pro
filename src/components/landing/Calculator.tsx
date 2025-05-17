
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Calculator = () => {
  const [clientCount, setClientCount] = useState(5);
  const [avgBill, setAvgBill] = useState(500);
  
  // Simplified commission calculation - in real app would be more complex
  const estimatedCommission = () => {
    const baseCommission = avgBill >= 500 ? 100 : 50;
    return clientCount * baseCommission;
  };

  return (
    <section className="py-16 bg-white border-t border-b border-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-brand-blue mb-6">Calcule Seus Ganhos</h2>
            <p className="text-lg text-gray-600 mb-8">
              Use nossa calculadora para estimar quanto você pode ganhar como indicador.
              Quanto mais clientes você indicar, maior seu potencial de ganhos!
            </p>
            <div className="bg-brand-blue/10 p-6 rounded-lg">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="client-count">Número de indicações por mês:</Label>
                  <Input 
                    id="client-count"
                    type="range" 
                    min="1" 
                    max="20" 
                    value={clientCount}
                    onChange={(e) => setClientCount(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1</span>
                    <span>10</span>
                    <span>20</span>
                  </div>
                  <p className="text-center font-medium mt-1">{clientCount} indicações</p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="avg-bill">Valor médio da fatura (R$):</Label>
                  <Input 
                    id="avg-bill"
                    type="range" 
                    min="300" 
                    max="1000" 
                    step="50"
                    value={avgBill}
                    onChange={(e) => setAvgBill(parseInt(e.target.value))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>R$ 300</span>
                    <span>R$ 650</span>
                    <span>R$ 1000+</span>
                  </div>
                  <p className="text-center font-medium mt-1">R$ {avgBill},00</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-brand-blue text-white rounded-lg p-8 shadow-lg">
            <div className="text-center space-y-6">
              <h3 className="text-2xl font-bold">Seu potencial de ganhos:</h3>
              <div className="space-y-2">
                <p className="text-brand-lime text-4xl md:text-5xl font-bold">
                  R$ {estimatedCommission()},00
                </p>
                <p className="text-white/80 text-xl">por mês</p>
              </div>
              <div className="space-y-2">
                <p className="text-2xl font-bold">
                  R$ {estimatedCommission() * 12},00
                </p>
                <p className="text-white/80">por ano</p>
              </div>
              <Link to="/cadastro">
                <Button className="w-full bg-brand-orange hover:bg-brand-orange-light text-white text-lg py-6">
                  Comece a ganhar agora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
