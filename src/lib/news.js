import { useEffect, useMemo, useState } from 'react';

// Category keys stored in the database → index into content.news.tabs (0 is "All")
export const CATEGORIES = ['press', 'cabinet', 'speech', 'development'];
export const categoryLabel = (key, tabs) => tabs?.[CATEGORIES.indexOf(key) + 1] || key;

const wordsPerMinute = 200;
const readTime = (text, lang) => {
  const minutes = Math.max(1, Math.round(String(text).trim().split(/\s+/).length / wordsPerMinute));
  return lang === 'am' ? `${minutes} ደቂቃ ንባብ` : `${minutes} min read`;
};

const formatDate = (iso, lang) =>
  new Intl.DateTimeFormat(lang === 'am' ? 'am-ET' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso));

// Database row → the article shape the public components already render
export function toArticle(row, lang, tabs) {
  const am = lang === 'am';
  const pick = (en, amv) => (am && amv?.trim() ? amv : en);
  const body = pick(row.body_en, row.body_am);
  return {
    id: row.id,
    title: pick(row.title_en, row.title_am),
    summary: pick(row.summary_en, row.summary_am),
    content: body,
    category: categoryLabel(row.category, tabs),
    date: row.published_at ? formatDate(row.published_at, lang) : '',
    readTime: readTime(body, lang),
    image: row.image_url || '/images/assosa-city.jpg',
    featured: row.featured,
  };
}

/*
  Published news from Supabase, newest first with featured stories on top.
  Returns null while loading or when Supabase is not configured / unreachable,
  so callers can fall back to the bundled articles.
*/
export function usePublishedNews(lang, tabs) {
  const [rows, setRows] = useState(null);

  useEffect(() => {
    let cancelled = false;
    // Loaded on demand so the Supabase client never delays the first paint
    import('./supabase').then(({ supabase }) => {
      if (!supabase || cancelled) return;
      supabase
        .from('news')
        .select('*')
        .eq('status', 'published')
        .lte('published_at', new Date().toISOString())
        .order('featured', { ascending: false })
        .order('published_at', { ascending: false })
        .limit(60)
        .then(({ data, error }) => {
          if (cancelled) return;
          if (error) {
            console.warn('[news] falling back to bundled articles:', error.message);
            return;
          }
          setRows(data);
        });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return useMemo(() => (rows && rows.length ? rows.map((r) => toArticle(r, lang, tabs)) : null), [rows, lang, tabs]);
}
