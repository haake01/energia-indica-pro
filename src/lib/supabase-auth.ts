
import { supabase } from './supabase';
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

// Função para login com Google
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
    
    // O retorno será um objeto com a URL para redirecionamento
    // O processo de login será concluído após o redirecionamento
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

// Função para processar o callback do OAuth
export const handleAuthCallback = async () => {
  try {
    // Obter a sessão do usuário atual após o redirecionamento
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError) {
      throw new Error(sessionError.message);
    }
    
    if (!session) {
      throw new Error("Nenhuma sessão encontrada");
    }
    
    // Verificar se o usuário já existe na tabela de indicadores
    const { data: indicadorExistente } = await supabase
      .from('indicadores')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    // Se o usuário não existe na tabela de indicadores, criar um registro
    if (!indicadorExistente) {
      // Extrair informações do usuário autenticado
      const { nome, email } = session.user.user_metadata;
      
      // Adicionar o usuário à tabela de indicadores
      const { error: profileError } = await supabase
        .from('indicadores')
        .insert({
          id: session.user.id,
          nome: nome || email.split('@')[0], // Usar email como backup se nome não estiver disponível
          email: session.user.email,
          telefone: "", // Campo obrigatório, mas não temos essa info do Google
          data_cadastro: new Date().toISOString(),
          status: 'ativo',
          oauth_provider: 'google',
        });

      if (profileError) {
        console.error('Erro ao criar perfil do indicador:', profileError);
        throw new Error('Erro ao criar perfil do indicador após login com Google');
      }
      
      // Atualizar os metadados do usuário para incluir a role
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
    console.error("Erro no login:", error);
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
    // Para o cadastro inicial, não verificamos autenticação
    const isInitialSetup = data.email === 'kleberhaake@gmail.com' && data.nivel_acesso === 'admin';
    
    if (!isInitialSetup) {
      // Verificar se o usuário atual tem permissão para cadastrar gestores
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error('Você precisa estar autenticado para realizar esta ação');
      }
    }

    // Verificar se o email já existe
    const { data: existingUser, error: checkError } = await supabase.auth.admin.listUsers({
      filter: {
        email: data.email
      }
    });

    if (checkError) {
      console.error('Erro ao verificar usuário existente:', checkError);
      throw new Error(checkError.message);
    }

    if (existingUser && existingUser.users.length > 0) {
      throw new Error('Este email já está sendo usado');
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
    email: "kleberhaake@gmail.com",
    telefone: "11954707777",
    cargo: "Administrador",
    nivel_acesso: "admin",
    password: "Gestor@123" // Esta senha deve ser alterada após o primeiro acesso
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

// Limpar todos os dados mockados
export const limparDadosMockados = async () => {
  try {
    // 1. Manter apenas o gestor principal
    await supabase
      .from('gestores')
      .delete()
      .neq('email', 'kleberhaake@gmail.com');
      
    // 2. Limpar todos os indicadores
    await supabase
      .from('indicadores')
      .delete()
      .not('id', 'is', null);
      
    // 3. Limpar todos os leads
    await supabase
      .from('leads')
      .delete()
      .not('id', 'is', null);
      
    // 4. Limpar indicações
    await supabase
      .from('indicacoes')
      .delete()
      .not('id', 'is', null);
    
    return { success: true, message: 'Todos os dados mockados foram removidos.' };
  } catch (error: any) {
    console.error('Erro ao limpar dados mockados:', error);
    return { success: false, error };
  }
};

// Verificar se o usuário está autenticado e obter suas informações
export const verificarAutenticacao = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      throw new Error(error.message);
    }
    
    if (!data.session) {
      return { autenticado: false };
    }
    
    // Obter informações do usuário autenticado
    const usuarioId = data.session.user.id;
    const role = data.session.user.user_metadata.role;
    
    // Se for gestor, buscar informações adicionais da tabela de gestores
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
    // Se for indicador, buscar informações adicionais da tabela de indicadores
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
    
    // Se não for nem gestor nem indicador
    return { autenticado: true, usuario: data.session.user, role };
    
  } catch (error: any) {
    console.error('Erro ao verificar autenticação:', error);
    return { autenticado: false, error };
  }
};
