import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useDialog } from './ui';
import { ui } from '../data/ui';

const match = (q, ...fields) => fields.some((f) => String(f || '').toLowerCase().includes(q));

export function SearchModal({ isOpen, onClose, content, currentLang, onSelectNews, onNavigate }) {
  const t = ui[currentLang] || ui.en;
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);
  useDialog(isOpen, onClose);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
    else setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();
  const groups = q
    ? [
        {
          label: t.search.news,
          items: content.news.articles
            .filter((a) => match(q, a.title, a.summary, a.content, a.category))
            .map((a) => ({ key: `n${a.id}`, eyebrow: a.category, title: a.title, sub: a.summary, go: () => onSelectNews(a) })),
        },
        {
          label: t.search.initiatives,
          items: content.initiatives.items
            .filter((i) => match(q, i.title, i.desc, i.category))
            .map((i) => ({ key: `i${i.id}`, eyebrow: i.category, title: i.title, sub: i.desc, go: () => onNavigate('initiatives') })),
        },
        {
          label: t.search.bureaus,
          items: content.administration.bureaus
            .filter((b) => match(q, b.name, b.head, b.email))
            .map((b) => ({ key: `b${b.email}`, eyebrow: b.head, title: b.name, sub: b.email, go: () => onNavigate('administration') })),
        },
      ].filter((g) => g.items.length)
    : [];

  return (
    <div className="fixed inset-0 z-[120] flex items-start justify-center p-0 sm:p-6 sm:pt-24 bg-[#0a2233]/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={content.nav.searchPlaceholder}
        className="bg-white dark:bg-[#0a1a26] w-full max-w-2xl h-full sm:h-auto sm:max-h-[75vh] shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-[#1a4f6d] dark:text-[#dab26a] flex-shrink-0" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.nav.searchPlaceholder}
            aria-label={content.nav.searchPlaceholder}
            className="w-full bg-transparent py-5 text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
          />
          <button onClick={onClose} aria-label={t.close} className="w-10 h-10 inline-flex items-center justify-center rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white cursor-pointer flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-5 sm:p-6">
          {!q ? (
            <p className="text-center text-sm text-slate-400 py-10">{t.search.hint}</p>
          ) : groups.length === 0 ? (
            <p className="text-center text-sm text-slate-500 dark:text-slate-400 py-10">
              {t.search.none} &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="space-y-8">
              {groups.map((g) => (
                <div key={g.label}>
                  <div className="eyebrow text-slate-400 mb-3">{g.label} ({g.items.length})</div>
                  <ul className="divide-y divide-slate-100 dark:divide-slate-800 border-y border-slate-100 dark:border-slate-800">
                    {g.items.map((it) => (
                      <li key={it.key}>
                        <button
                          onClick={() => { it.go(); onClose(); }}
                          className="group w-full text-left py-4 flex items-start justify-between gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/40 px-2 transition-colors cursor-pointer"
                        >
                          <span className="min-w-0">
                            <span className="block eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-1">{it.eyebrow}</span>
                            <span className="block font-serif text-[#1a4f6d] dark:text-white leading-snug">{it.title}</span>
                            <span className="block text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{it.sub}</span>
                          </span>
                          <ArrowRight className="w-4 h-4 mt-5 text-slate-300 group-hover:text-[#1a4f6d] dark:group-hover:text-[#dab26a] flex-shrink-0" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
