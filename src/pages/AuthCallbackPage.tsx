
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleAuthCallback } from '@/lib/supabase-auth';
import { toast } from '@/hooks/use-toast';

const AuthCallbackPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const processAuthCallback = async () => {
      try {
        // Process the authentication callback
        const result = await handleAuthCallback();
        
        if (result.success) {
          toast({
            title: 'Autenticação bem-sucedida',
            description: 'Você foi autenticado com sucesso.'
          });
          
          // Redirect based on role
          if (result.role === 'gestor') {
            navigate('/gestor/painel');
          } else {
            navigate('/indicador/painel');
          }
        } else {
          throw new Error(result.error || 'Falha na autenticação');
        }
      } catch (error: any) {
        console.error('Erro no callback de autenticação:', error);
        toast({
          variant: 'destructive',
          title: 'Erro na autenticação',
          description: error.message || 'Ocorreu um erro durante o processo de login.'
        });
        navigate('/login');
      } finally {
        setIsProcessing(false);
      }
    };

    processAuthCallback();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-brand-blue">Processando Login</h1>
        {isProcessing ? (
          <>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
            </div>
            <p className="text-gray-600">
              Estamos verificando suas credenciais...
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            Redirecionando...
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthCallbackPage;
