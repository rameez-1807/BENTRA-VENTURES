import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cqejrdwdddelpdlizbih.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseAnonKey) {
  console.warn('⚠️ Supabase Anon Key not found in VITE_SUPABASE_ANON_KEY. Realtime live subscriptions will activate once provided.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

