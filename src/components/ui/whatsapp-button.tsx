
import React, { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

type WhatsAppButtonProps = {
  phoneNumber: string;
  message?: string;
};

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber,
  message = "Olá! Gostaria de saber mais sobre o programa Indique e Ganhe.",
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY || document.documentElement.scrollTop;
      if (st > lastScrollTop && st > 300) {
        // Scrolling down & past threshold
        setIsVisible(false);
      } else if (st < lastScrollTop || st < 300) {
        // Scrolling up or near top
        setIsVisible(true);
      }
      setLastScrollTop(st <= 0 ? 0 : st);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const formattedNumber = phoneNumber.replace(/\D/g, "");
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodedMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-20 opacity-0'
      }`}
      title="Fale conosco pelo WhatsApp"
    >
      <MessageCircle size={24} />
    </a>
  );
};

export default WhatsAppButton;
