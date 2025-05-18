
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import LoginForm from "@/components/auth/LoginForm";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full max-w-md mx-auto p-6 space-y-8 mt-10">
        <div className="flex items-center">
          <Link to="/" className="text-gray-600 hover:text-gray-900 flex items-center gap-2">
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </Link>
        </div>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue mb-2">Login do Indicador</h1>
          <p className="text-gray-600 mb-8">
            Entre com seus dados para acessar sua conta
          </p>
        </div>

        <LoginForm />
      </div>
      
      <WhatsAppButton phoneNumber="11954707777" />
    </div>
  );
};

export default LoginPage;
