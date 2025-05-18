
import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';

export type RegisterData = {
  email: string;
  password: string;
  nome: string;
  telefone: string;
  cpf?: string;
  cnpj?: string;
  tipoConta: 'pf' | 'pj';
};

// Função para registrar um novo indicador
export const registerIndicador = async (data: RegisterData) => {
  try {
    // 1. Criar o usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nome: data.nome,
          telefone: data.telefone,
          cpf: data.tipoConta === 'pf' ? data.cpf : null,
          cnpj: data.tipoConta === 'pj' ? data.cnpj : null,
          role: 'indicador', // Define o papel do usuário como indicador
        },
        emailRedirectTo: `${window.location.origin}/login?confirmado=true`,
      }
    });

    if (authError) {
      console.error('Erro ao registrar usuário:', authError);
      throw new Error(authError.message);
    }

    // 2. Adicionar o usuário à tabela de indicadores
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
        // Tentar excluir o usuário criado para evitar inconsistência
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

// Função para login de usuários
export const loginUser = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    // Verificar o papel do usuário para redirecionar corretamente
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
    toast({
      variant: "destructive",
      title: "Erro no login",
      description: error.message || "Credenciais inválidas. Tente novamente.",
    });
    
    return { success: false, error };
  }
};

// Função para cadastrar um gestor
export const registerGestor = async (data: {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  nivel_acesso: string;
  password: string;
}) => {
  try {
    // 1. Verificar se o usuário atual tem permissão para cadastrar gestores
    const { data: session } = await supabase.auth.getSession();
    
    if (!session.session) {
      throw new Error('Você precisa estar autenticado para realizar esta ação');
    }

    // 2. Criar o usuário na autenticação do Supabase
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true, // Não requer confirmação de email para gestores
      user_metadata: {
        nome: data.nome,
        telefone: data.telefone,
        cargo: data.cargo,
        nivel_acesso: data.nivel_acesso,
        role: 'gestor', // Define o papel do usuário como gestor
      }
    });

    if (authError) {
      console.error('Erro ao registrar gestor:', authError);
      throw new Error(authError.message);
    }

    // 3. Adicionar o usuário à tabela de gestores
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('gestores')
        .insert({
          id: authData.user.id,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cargo: data.cargo,
          nivel_acesso: data.nivel_acesso,
          data_cadastro: new Date().toISOString(),
          status: 'ativo',
        });

      if (profileError) {
        console.error('Erro ao criar perfil do gestor:', profileError);
        // Tentar excluir o usuário criado para evitar inconsistência
        await supabase.auth.admin.deleteUser(authData.user.id);
        throw new Error('Erro ao criar perfil do gestor');
      }
    }

    toast({
      title: "Gestor cadastrado com sucesso!",
      description: "O novo gestor já pode acessar o sistema.",
    });

    return { success: true };
  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Erro no cadastro do gestor",
      description: error.message || "Ocorreu um erro ao cadastrar o gestor.",
    });
    
    return { success: false, error };
  }
};

// Função para recuperar senha
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

// Função para logout
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

// Cadastrar o gestor inicial (Kleber Markus Haake)
export const cadastrarGestorInicial = async () => {
  const gestorInicial = {
    nome: "KLEBER MARKUS HAAKE",
    email: "kleberhaakedigital@gmail.com",
    telefone: "11954707777",
    cargo: "Administrador",
    nivel_acesso: "admin",
    password: "SenhaSegura123!" // Esta senha deve ser alterada após o primeiro acesso
  };
  
  try {
    // Verificar se o gestor já existe
    const { data: gestorExistente, error: checkError } = await supabase
      .from('gestores')
      .select('id')
      .eq('email', gestorInicial.email)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar gestor existente:', checkError);
      throw new Error(checkError.message);
    }
    
    // Se o gestor já existe, não fazer nada
    if (gestorExistente) {
      console.log('Gestor já cadastrado');
      return { success: true, message: 'Gestor já cadastrado' };
    }
    
    // Se não existe, cadastrar
    return await registerGestor(gestorInicial);
    
  } catch (error: any) {
    console.error('Erro ao cadastrar gestor inicial:', error);
    return { success: false, error };
  }
};
