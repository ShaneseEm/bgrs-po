import React, { useState } from 'react';
import { X, Clock, Share2, Printer, Check } from 'lucide-react';
import { useDialog } from './ui';
import { ui } from '../data/ui';

export function NewsModal({ article, onClose, currentLang }) {
  const t = ui[currentLang] || ui.en;
  const [copied, setCopied] = useState(false);
  useDialog(Boolean(article), onClose);

  if (!article) return null;

  const share = async () => {
    const data = { title: article.title, text: article.summary, url: window.location.href };
    try {
      if (navigator.share) return await navigator.share(data);
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user cancelled or clipboard unavailable */
    }
  };

  const paragraphs = String(article.content || '').split(/\n{2,}/).filter(Boolean);
  const iconBtn = 'w-10 h-10 inline-flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-300 hover:text-[#1a4f6d] dark:hover:text-white hover:border-[#1a4f6d] transition-colors cursor-pointer';

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-0 sm:p-6 bg-[#0a2233]/80 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
        className="bg-white dark:bg-[#0a1a26] w-full max-w-3xl h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-[#0a1a26]/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-5 sm:px-8 py-3 flex items-center justify-between gap-4">
          <span className="bg-[#1a4f6d] text-white eyebrow px-3 py-1.5 truncate">{article.category}</span>
          <div className="flex items-center gap-2">
            <button onClick={() => window.print()} className={`${iconBtn} hidden sm:inline-flex`} title={t.news.print} aria-label={t.news.print}>
              <Printer className="w-4 h-4" />
            </button>
            <button onClick={share} className={iconBtn} title={copied ? t.news.copied : t.news.share} aria-label={t.news.share}>
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button onClick={onClose} className={iconBtn} aria-label={t.close} autoFocus>
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <article className="px-5 sm:px-10 py-8 sm:py-10">
          <h2 id="article-title" className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight mb-5">
            {article.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mb-8">
            <span>{article.date}</span>
            {article.readTime && (
              <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{article.readTime}</span>
            )}
          </div>

          {article.image && (
            <img src={article.image} alt="" className="w-full aspect-[16/9] object-cover bg-slate-200 mb-8" />
          )}

          <p className="font-serif text-lg sm:text-xl text-slate-800 dark:text-slate-100 leading-relaxed border-l-4 border-[#dab26a] pl-5 mb-8">
            {article.summary}
          </p>

          <div className="space-y-5 text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          {article.gallery?.length > 0 && (
            <section className="mt-10" aria-label="Photo gallery">
              <h3 className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-4">Photo gallery</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {article.gallery.map((g, i) => (
                  <a key={g.src} href={g.src} target="_blank" rel="noreferrer" className={`group block overflow-hidden bg-slate-200 ${i === 0 ? 'col-span-2 sm:col-span-3' : ''}`}>
                    <img src={g.src} alt={g.caption} loading="lazy" className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'}`} />
                    <span className="block text-xs text-slate-500 dark:text-slate-400 py-1.5">{g.caption}</span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {article.source && (
            <p className="mt-10 pt-5 border-t border-slate-100 dark:border-slate-800 text-sm text-slate-500 dark:text-slate-400">
              Source:{' '}
              <a href={article.source.url} target="_blank" rel="noreferrer" className="text-[#1a4f6d] dark:text-[#dab26a] underline">
                {article.source.label}
              </a>
            </p>
          )}
        </article>
      </div>
    </div>
  );
}
