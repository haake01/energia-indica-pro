import { supabase } from '../supabase';

// Clear all mocked data
export const limparDadosMockados = async () => {
  try {
    // 1. Keep only the main gestor
    await supabase
      .from('gestores')
      .delete()
      .neq('email', 'kleberhaake@gmail.com');
      
    // 2. Clear all indicadores
    await supabase
      .from('indicadores')
      .delete()
      .not('id', 'is', null);
      
    // 3. Clear all leads
    await supabase
      .from('leads')
      .delete()
      .not('id', 'is', null);
      
    // 4. Clear indicações
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
