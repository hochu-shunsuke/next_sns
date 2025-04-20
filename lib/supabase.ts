import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnnoKey = process.env.NEXT_PUBLIC_SUPABASE_ANNO_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnnoKey);