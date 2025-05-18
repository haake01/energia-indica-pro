
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase - em um ambiente de produção, estes valores viriam de variáveis de ambiente
const supabaseUrl = 'https://jhdvbtjavncmvmavdljx.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZHZidGphdm5jbXZtYXZkbGp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1NTU5MzIsImV4cCI6MjAyMjEzMTkzMn0.DVtRwaSSKRPrEePLrFpYwfSrvOVNJ3L8l_5a4g5X7L8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

