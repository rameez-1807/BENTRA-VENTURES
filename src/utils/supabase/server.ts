import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  process.env.SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  'https://cqejrdwdddelpdlizbih.supabase.co';

const supabaseKey = 
  process.env.SUPABASE_SERVICE_ROLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  'sb_publishable_dsI-IfswCr8FViiCPGGIvA_s9vuD8oC';

export const createServerSupabaseClient = () => {
  return createClient(supabaseUrl, supabaseKey);
};

export const serverSupabase = createServerSupabaseClient();

