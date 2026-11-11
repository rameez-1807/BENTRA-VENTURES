import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://cqejrdwdddelpdlizbih.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_dsI-IfswCr8FViiCPGGIvA_s9vuD8oC';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
