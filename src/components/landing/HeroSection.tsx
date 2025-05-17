
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-brand-blue/90 via-brand-blue/80 to-brand-blue/70 text-white relative">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Indique e Ganhe com a LEX+ENERGIA
              </h1>
              <p className="mx-auto max-w-[700px] text-lg md:text-xl text-white/90">
                Torne-se um indicador e ganhe comissões por cada cliente que economiza na conta de energia.
                Um programa simples e lucrativo para todos.
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-4 min-[400px]:flex-row">
              <Link to="/cadastro">
                <Button className="bg-brand-orange text-white hover:bg-brand-orange-light text-lg px-8 py-6 rounded-full group">
                  Quero ser indicador
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <a href="#como-funciona">
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 text-lg px-8 py-6 rounded-full">
                  Como funciona
                </Button>
              </a>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="w-full h-auto bg-white/10 border border-white/20 backdrop-blur-sm p-8 rounded-2xl shadow-lg transform transition-transform hover:scale-105">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Comissões atrativas</h3>
                <p className="text-xl md:text-3xl font-bold text-white">
                  Ganhe <span className="text-brand-orange">10%</span>
                </p>
                <p className="text-base md:text-lg">
                  sobre a fatura do seu INDICADO
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
