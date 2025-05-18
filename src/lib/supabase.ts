
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase com URLs válidas
// Em um ambiente de produção, seria recomendado usar variáveis de ambiente
const supabaseUrl = 'https://gtfemjrpaaitmwbrxhwa.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZmVtanJwYWFpdG13YnJ4aHdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTU5MzIsImV4cCI6MjAyMjEzMTkzMn0.661lu2Hl-XaWOgxq5D4Z1e3XJAjyyQoavVyJQTu_QrY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
