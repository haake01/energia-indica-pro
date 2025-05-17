
import { createClient } from '@supabase/supabase-js';

// These would typically come from environment variables
// For this implementation, we'll use public values
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseAnonKey = 'your-public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
