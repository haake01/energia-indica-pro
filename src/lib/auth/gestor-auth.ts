
import { supabase } from '../supabase';
import { toast } from '@/hooks/use-toast';

// Function to register a gestor
export const registerGestor = async (data: {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
  nivel_acesso: string;
  password: string;
}) => {
  try {
    // For initial setup, we don't check authentication
    const isInitialSetup = data.email === 'kleberhaake@gmail.com' && data.nivel_acesso === 'admin';
    
    if (!isInitialSetup) {
      // Check if current user has permission to register gestores
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error('Você precisa estar autenticado para realizar esta ação');
      }
    }

    // Check if email already exists
    const { data: existingUsers, error: checkError } = await supabase
      .from('auth.users')
      .select('email')
      .eq('email', data.email)
      .limit(1);

    if (checkError) {
      console.error('Erro ao verificar usuário existente:', checkError);
      throw new Error(checkError.message);
    }

    if (existingUsers && existingUsers.length > 0) {
      throw new Error('Este email já está sendo usado');
    }

    // 2. Create user in Supabase authentication
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true, // No email confirmation required for gestores
      user_metadata: {
        nome: data.nome,
        telefone: data.telefone,
        cargo: data.cargo,
        nivel_acesso: data.nivel_acesso,
        role: 'gestor', // Define user role as gestor
      }
    });

    if (authError) {
      console.error('Erro ao registrar gestor:', authError);
      throw new Error(authError.message);
    }

    // 3. Add user to "gestores" table
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
        // Try to delete the created user to avoid inconsistency
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

// Register initial gestor (Kleber Markus Haake)
export const cadastrarGestorInicial = async () => {
  const gestorInicial = {
    nome: "KLEBER MARKUS HAAKE",
    email: "kleberhaake@gmail.com",
    telefone: "11954707777",
    cargo: "Administrador",
    nivel_acesso: "admin",
    password: "Gestor@123" // This password should be changed after first login
  };
  
  try {
    // Check if gestor already exists
    const { data: gestorExistente, error: checkError } = await supabase
      .from('gestores')
      .select('id')
      .eq('email', gestorInicial.email)
      .single();
    
    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Erro ao verificar gestor existente:', checkError);
      throw new Error(checkError.message);
    }
    
    // If gestor already exists, do nothing
    if (gestorExistente) {
      console.log('Gestor já cadastrado');
      return { success: true, message: 'Gestor já cadastrado' };
    }
    
    // If it doesn't exist, register it
    return await registerGestor(gestorInicial);
    
  } catch (error: any) {
    console.error('Erro ao cadastrar gestor inicial:', error);
    return { success: false, error };
  }
};
