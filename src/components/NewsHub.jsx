import React, { useState } from 'react';
import { ArrowRight, ArrowUpRight, Clock } from 'lucide-react';

import { ui } from '../data/ui';
import { useDialog } from './ui';

// Tab index → category keywords (English and Amharic); index 0 = all
const TAB_KEYWORDS = [null, ['press', 'መግለጫ'], ['cabinet', 'ካቢኔ'], ['speech', 'ንግግር'], ['development', 'ልማት']];

const activate = (fn) => ({
  onClick: fn,
  onKeyDown: (e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), fn()),
  role: 'button',
  tabIndex: 0,
});

export function NewsCard({ article, onSelect, readLabel, style, className = '' }) {
  return (
    <article
      {...activate(() => onSelect(article))}
      style={style}
      className={`group bg-white dark:bg-[#0a1a26] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col focus-visible:outline-3 focus-visible:outline-[#dab26a] ${className}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-0 left-0 w-full h-0 bg-[#004750]/30 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
        <span className="absolute top-4 left-4 bg-[#1a4f6d] text-white eyebrow px-3 py-1.5">{article.category}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-sm text-slate-400 mb-3">{article.date}</div>
        <h3 className="font-serif text-xl text-[#1a4f6d] dark:text-white leading-snug mb-3 group-hover:text-[#3a6d8c] dark:group-hover:text-[#dab26a] transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">{article.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1a4f6d] dark:text-[#dab26a] group-hover:text-[#b0823a] transition-colors">
          {readLabel}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

/* Always-visible media section: videos and photos collected from every article */
function MediaGallery({ articles, lang }) {
  const am = lang === 'am';
  const [open, setOpen] = useState(null);
  useDialog(open !== null, () => setOpen(null));

  const seen = new Set();
  const uniq = (list, key) => list.filter((x) => !seen.has(key(x)) && seen.add(key(x)));
  const videos = uniq(articles.flatMap((a) => a.videos || []), (v) => v.id || v.url);
  seen.clear();
  const photos = uniq(articles.flatMap((a) => a.gallery || []), (g) => g.src);
  if (!videos.length && !photos.length) return null;

  const step = (d) => setOpen((i) => (i + d + photos.length) % photos.length);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" aria-label={am ? 'የፎቶና ቪዲዮ ማዕከል' : 'Photo and video gallery'}>
      <div className="pb-4 mb-8 border-b-4 border-[#1a4f6d] dark:border-[#dab26a]">
        <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-2">{am ? 'ሚዲያ' : 'Media'}</div>
        <h2 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight tracking-tight">{am ? 'የፎቶና ቪዲዮ ማዕከል' : 'Video & Photo Gallery'}</h2>
      </div>

      {videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {videos.map((v) =>
            v.type === 'youtube' ? (
              <figure key={v.id}>
                <div className="aspect-video bg-black">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${v.id}`}
                    title={v.title}
                    loading="lazy"
                    allow="accelerometer; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                </div>
                <figcaption className="text-sm text-slate-500 dark:text-slate-400 mt-2">{v.title}</figcaption>
              </figure>
            ) : (
              <a key={v.url} href={v.url} target="_blank" rel="noreferrer" className="aspect-video flex items-center justify-center text-center p-6 bg-[#0e2f45] text-white font-serif text-lg hover:bg-[#1a4f6d] transition-colors">
                {v.label}
              </a>
            )
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {photos.map((g, i) => (
            <button key={g.src} onClick={() => setOpen(i)} className="group relative overflow-hidden bg-slate-200 aspect-[4/3] cursor-pointer focus-visible:outline-3 focus-visible:outline-[#dab26a]" aria-label={g.caption}>
              <img src={g.src} alt={g.caption} loading="lazy" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a2233]/85 to-transparent text-left text-xs text-white px-3 pt-8 pb-2">{g.caption}</span>
            </button>
          ))}
        </div>
      )}

      {open !== null && (
        <div className="fixed inset-0 z-[130] bg-[#0a2233]/95 flex items-center justify-center p-4 animate-fade-in" onClick={() => setOpen(null)}>
          <figure className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={photos[open].src} alt={photos[open].caption} className="w-full max-h-[80vh] object-contain" />
            <figcaption className="text-white text-center text-sm mt-3">{photos[open].caption} · {open + 1}/{photos.length}</figcaption>
          </figure>
          <button onClick={(e) => { e.stopPropagation(); step(-1); }} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white text-2xl cursor-pointer hover:bg-white/20" aria-label="Previous">‹</button>
          <button onClick={(e) => { e.stopPropagation(); step(1); }} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 text-white text-2xl cursor-pointer hover:bg-white/20" aria-label="Next">›</button>
          <button onClick={() => setOpen(null)} className="absolute top-3 right-3 w-11 h-11 rounded-full bg-white/10 text-white text-xl cursor-pointer hover:bg-white/20" aria-label="Close">✕</button>
        </div>
      )}
    </section>
  );
}

export function NewsHub({ content, currentLang, onSelectNews }) {
  const n = content.news;
  const t = (ui[currentLang] || ui.en).news;
  const [tab, setTab] = useState(0);

  const keywords = TAB_KEYWORDS[tab];
  const articles = keywords ? n.articles.filter((a) => keywords.some((k) => a.category.toLowerCase().includes(k))) : n.articles;
  const [featured, ...rest] = articles;

  const today = new Intl.DateTimeFormat(currentLang === 'am' ? 'am-ET' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  return (
    <div id="news" className="bg-white dark:bg-[#0a1a26]">
      {/* ===== Masthead ===== */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 lg:pt-16">
        <div className="pb-6 border-b-4 border-[#1a4f6d] dark:border-[#dab26a] flex flex-col md:flex-row md:items-end justify-between gap-6 animate-rise">
          <div>
            <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-3">{n.subtitle}</div>
            <h1 className="font-serif text-3xl lg:text-4xl text-[#1a4f6d] dark:text-white leading-tight tracking-tight">{n.title}</h1>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 md:text-right shrink-0">
            <div className="font-medium text-slate-700 dark:text-slate-200">{today}</div>
            <div>{n.articles.length} {t.stories}</div>
          </div>
        </div>

        {/* Filter pills */}
        <div role="tablist" aria-label={n.title} className="flex gap-2 overflow-x-auto py-6 -mx-1 px-1">
          {n.tabs.map((label, i) => (
            <button
              key={label}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium border transition-all duration-300 cursor-pointer ${
                tab === i
                  ? 'bg-[#1a4f6d] border-[#1a4f6d] text-white shadow-md scale-105'
                  : 'border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-[#1a4f6d] hover:text-[#1a4f6d] dark:hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {!featured ? (
          <p className="text-center text-slate-500 dark:text-slate-400 py-24">{t.empty}</p>
        ) : (
          <div key={tab}>
            {/* Lead story + latest list */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14">
              <article
                {...activate(() => onSelectNews(featured))}
                className="lg:col-span-8 group relative overflow-hidden bg-[#0e2f45] min-h-[420px] lg:min-h-[540px] cursor-pointer animate-rise focus-visible:outline-3 focus-visible:outline-[#dab26a]"
              >
                <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a2233] via-[#0a2233]/60 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10 text-white">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-[#dab26a] text-[#0e2f45] eyebrow px-3 py-1.5">{t.featured}</span>
                    <span className="eyebrow text-slate-200">{featured.category}</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl leading-tight mb-4 max-w-3xl group-hover:text-[#dab26a] transition-colors duration-300">
                    {featured.title}
                  </h2>
                  <p className="text-slate-200 leading-relaxed max-w-2xl line-clamp-2 mb-5">{featured.summary}</p>
                  <div className="flex items-center gap-5 text-sm text-slate-300">
                    <span>{featured.date}</span>
                    {featured.readTime && <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{featured.readTime}</span>}
                  </div>
                </div>
              </article>

              <aside className="lg:col-span-4">
                <div className="eyebrow text-slate-800 dark:text-slate-100 pb-4 border-b border-slate-200 dark:border-slate-800">{t.latest}</div>
                <ol>
                  {articles.map((a, i) => (
                    <li key={a.id} className="animate-rise" style={{ animationDelay: `${120 + i * 90}ms` }}>
                      <button
                        onClick={() => onSelectNews(a)}
                        className="group w-full text-left flex gap-5 py-5 border-b border-slate-200 dark:border-slate-800 cursor-pointer"
                      >
                        <span className="font-serif text-3xl leading-none text-slate-300 dark:text-slate-600 group-hover:text-[#dab26a] transition-colors w-8 shrink-0">{i + 1}</span>
                        <span className="min-w-0">
                          <span className="block eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-1.5">{a.category}</span>
                          <span className="block font-serif text-lg text-[#1a4f6d] dark:text-white leading-snug group-hover:underline underline-offset-4 decoration-[#dab26a]">{a.title}</span>
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-[#1a4f6d] dark:group-hover:text-[#dab26a] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                      </button>
                    </li>
                  ))}
                </ol>
              </aside>
            </div>

            {rest.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {rest.map((a, i) => (
                  <NewsCard key={a.id} article={a} onSelect={onSelectNews} readLabel={n.readArticle} className="animate-rise" style={{ animationDelay: `${200 + i * 120}ms` }} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <MediaGallery articles={n.articles} lang={currentLang} />
    </div>
  );
}
