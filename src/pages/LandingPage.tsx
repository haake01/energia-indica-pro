
import React from "react";
import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorks from "@/components/landing/HowItWorks";
import Benefits from "@/components/landing/Benefits";
import Calculator from "@/components/landing/Calculator";
import FAQ from "@/components/landing/FAQ";
import CallToAction from "@/components/landing/CallToAction";
import Footer from "@/components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-cover bg-center bg-fixed" 
      style={{
        backgroundImage: "url('/lovable-uploads/d87ff5a8-c42e-4feb-b4aa-8b5c7606698a.png')",
      }}>
      <div className="flex min-h-screen flex-col bg-brand-blue/50 backdrop-blur-sm">
        <Header />
        <main className="flex-1">
          <HeroSection />
          <HowItWorks />
          <Benefits />
          <Calculator />
          <FAQ />
          <CallToAction />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
