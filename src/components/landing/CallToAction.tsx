
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-brand-blue via-brand-blue/90 to-brand-blue/80 text-white">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para começar a ganhar com indicações?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Junte-se a centenas de indicadores que já estão lucrando com a LEX+ENERGIA.
            O cadastro é rápido, gratuito e você pode começar hoje mesmo!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/cadastro">
              <Button className="bg-brand-orange text-white hover:bg-brand-orange-light text-lg px-8 py-6 w-full md:w-auto">
                Cadastre-se agora
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/20 text-lg px-8 py-6 w-full md:w-auto">
                Já sou indicador
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-white/70">
            Ao se cadastrar, você concorda com nossos termos e condições.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
