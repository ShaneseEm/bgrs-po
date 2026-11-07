import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null until the project keys are configured — the site then falls back to bundled news
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const NEWS_BUCKET = 'news-images';
