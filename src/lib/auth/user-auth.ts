
import { supabase } from '../supabase';
import { toast } from '@/hooks/use-toast';

export type RegisterData = {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  cpf?: string;
  cnpj?: string;
  tipoConta: 'pf' | 'pj';
};

// Function to register a new "indicador"
export const registerIndicador = async (data: RegisterData) => {
  try {
    // 1. Create user in Supabase authentication
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nome: data.nome,
          telefone: data.telefone,
          cpf: data.tipoConta === 'pf' ? data.cpf : null,
          cnpj: data.tipoConta === 'pj' ? data.cnpj : null,
          role: 'indicador', // Define user role as "indicador"
        },
        emailRedirectTo: `${window.location.origin}/login?confirmado=true`,
      }
    });

    if (authError) {
      console.error('Erro ao registrar usuário:', authError);
      throw new Error(authError.message);
    }

    // 2. Add user to "indicadores" table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('indicadores')
        .insert({
          id: authData.user.id,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cpf: data.tipoConta === 'pf' ? data.cpf : null,
          cnpj: data.tipoConta === 'pj' ? data.cnpj : null,
          data_cadastro: new Date().toISOString(),
          status: 'ativo',
        });

      if (profileError) {
        console.error('Erro ao criar perfil do indicador:', profileError);
        // Try to delete the created user to avoid inconsistency
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('Erro ao criar perfil do indicador');
      }
    }

    toast({
      title: "Cadastro realizado com sucesso!",
      description: "Verifique seu e-mail para confirmar a conta.",
    });

    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro no cadastro",
      description: error.message || "Ocorreu um erro ao processar seu cadastro.",
    });
    
    return { success: false, error };
  }
};

// Function for Google login
export const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        }
      }
    });

    if (error) {
      throw new Error(error.message);
    }
    
    // Return will be an object with URL for redirection
    // Login process will be completed after redirection
    return { 
      success: true, 
      data 
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro no login com Google",
      description: error.message || "Não foi possível fazer login com o Google.",
    });
    
    return { success: false, error };
  }
};

// Function to process OAuth callback
export const handleAuthCallback = async () => {
  try {
    // Get current user session after redirection
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw new Error(sessionError.message);
    }
    
    if (!session) {
      throw new Error("Nenhuma sessão encontrada");
    }
    
    // Check if user already exists in "indicadores" table
    const { data: indicadorExistente } = await supabase
      .from('indicadores')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    // If user doesn't exist in "indicadores" table, create a record
    if (!indicadorExistente) {
      // Extract authenticated user info
      const { name, email } = session.user.user_metadata;
      
      // Add user to "indicadores" table
      const { error: profileError } = await supabase
        .from('indicadores')
        .insert({
          id: session.user.id,
          nome: name || email.split('@')[0], // Use email as backup if name isn't available
          email: session.user.email,
          telefone: "", // Required field, but we don't have this info from Google
          data_cadastro: new Date().toISOString(),
          status: 'ativo',
          oauth_provider: 'google',
        });

      if (profileError) {
        console.error('Erro ao criar perfil do indicador:', profileError);
        throw new Error('Erro ao criar perfil do indicador após login com Google');
      }
      
      // Update user metadata to include role
      await supabase.auth.updateUser({
        data: {
          role: 'indicador',
        }
      });
    }
    
    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo ao programa de indicações!",
    });
    
    return { 
      success: true, 
      role: 'indicador',
      user: session.user 
    };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro no processamento de autenticação",
      description: error.message || "Não foi possível concluir o login.",
    });
    
    return { success: false, error };
  }
};

// Function for user login
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Check user role for correct redirection
    const role = data.user.user_metadata.role;

    toast({
      title: "Login realizado com sucesso",
      description: "Bem-vindo de volta!",
    });

    return { 
      success: true, 
      role, 
      user: data.user 
    };
  } catch (error: any) {
    console.error("Erro no login:", error);
    toast({
      variant: "destructive",
      title: "Erro no login",
      description: error.message || "Credenciais inválidas. Tente novamente.",
    });
    
    return { success: false, error };
  }
};

// Function for password reset
export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    toast({
      title: "E-mail enviado",
      description: "Verifique sua caixa de entrada para redefinir sua senha.",
    });

    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro ao enviar e-mail de recuperação",
      description: error.message || "Não foi possível enviar o e-mail. Tente novamente.",
    });
    
    return { success: false, error };
  }
};

// Function for logout
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      throw new Error(error.message);
    }
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso.",
    });
    
    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro ao fazer logout",
      description: error.message || "Ocorreu um erro ao sair do sistema.",
    });
    
    return { success: false, error };
  }
};

// Check if user is authenticated and get their information
export const verificarAutenticacao = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data.session) {
      return { autenticado: false };
    }
    
    // Get authenticated user information
    const usuarioId = data.session.user.id;
    const role = data.session.user.user_metadata.role;
    
    // If it's a "gestor", get additional information from "gestores" table
    if (role === 'gestor') {
      const { data: gestor, error: gestorError } = await supabase
        .from('gestores')
        .select('*')
        .eq('id', usuarioId)
        .single();
        
      if (gestorError) {
        console.error('Erro ao buscar dados do gestor:', gestorError);
        return { autenticado: true, usuario: data.session.user, role };
      }
      
      return { autenticado: true, usuario: data.session.user, role, dadosAdicionais: gestor };
    } 
    // If it's an "indicador", get additional information from "indicadores" table
    else if (role === 'indicador') {
      const { data: indicador, error: indicadorError } = await supabase
        .from('indicadores')
        .select('*')
        .eq('id', usuarioId)
        .single();
        
      if (indicadorError) {
        console.error('Erro ao buscar dados do indicador:', indicadorError);
        return { autenticado: true, usuario: data.session.user, role };
      }
      
      return { autenticado: true, usuario: data.session.user, role, dadosAdicionais: indicador };
    }
    
    // If it's neither "gestor" nor "indicador"
    return { autenticado: true, usuario: data.session.user, role };
    
  } catch (error: any) {
    console.error('Erro ao verificar autenticação:', error);
    return { autenticado: false, error };
  }
};
