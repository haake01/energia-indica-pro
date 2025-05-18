
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import NotFound from "./pages/NotFound";
import IndicadorPage from "./pages/IndicadorPage";
import IndicadorPainelPage from "./pages/IndicadorPainelPage";
import CadastroLeadPage from "./pages/CadastroLeadPage";
import ListaLeadsPage from "./pages/ListaLeadsPage";
import FAQPage from "./pages/FAQPage";
import GestorPainelPage from "./pages/GestorPainelPage";
import GestorCadastroPage from "./pages/GestorCadastroPage";
import RegulamentoPage from "./pages/RegulamentoPage";
import RelatoriosPage from "./pages/RelatoriosPage";
import SupportPage from "./pages/SupportPage";
import CookiesPage from "./pages/CookiesPage";
import TermosPage from "./pages/TermosPage";
import PrivacidadePage from "./pages/PrivacidadePage";
import WhatsAppButton from "./components/ui/whatsapp-button";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import AudioPlayer from "./components/ui/audio-player";

const App = () => {
  // Create the query client instance inside the component
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/cadastro" element={<RegisterPage />} />
            <Route path="/recuperar-senha" element={<ForgotPasswordPage />} />
            <Route path="/indicador" element={<IndicadorPage />} />
            <Route path="/indicador/painel" element={<IndicadorPainelPage />} />
            <Route path="/indicador/cadastrar-lead" element={<CadastroLeadPage />} />
            <Route path="/indicador/leads" element={<ListaLeadsPage />} />
            <Route path="/indicador/relatorios" element={<RelatoriosPage />} />
            <Route path="/gestor/painel" element={<GestorPainelPage />} />
            <Route path="/gestor/cadastrar" element={<GestorCadastroPage />} />
            <Route path="/perguntas-frequentes" element={<FAQPage />} />
            <Route path="/regulamento" element={<RegulamentoPage />} />
            <Route path="/suporte" element={<SupportPage />} />
            <Route path="/cookies" element={<CookiesPage />} />
            <Route path="/termos" element={<TermosPage />} />
            <Route path="/privacidade" element={<PrivacidadePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
          <Sonner />
          <WhatsAppButton phoneNumber="11954707777" />
          <AudioPlayer audioUrl="/indique e ganhe (1).mp3" autoPlay={true} />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
