import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { PageHeader } from './ui';
import { ui } from '../data/ui';

// Tab index → category keywords (English and Amharic); index 0 = all
const TAB_KEYWORDS = [null, ['press', 'መግለጫ'], ['cabinet', 'ካቢኔ'], ['speech', 'ንግግር'], ['development', 'ልማት']];

export function NewsCard({ article, onSelect, readLabel }) {
  const open = () => onSelect(article);
  return (
    <article
      onClick={open}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), open())}
      role="button"
      tabIndex={0}
      className="group bg-white dark:bg-[#0a1a26] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col focus-visible:outline-3 focus-visible:outline-[#dab26a]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
        <img src={article.image} alt="" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute top-0 left-0 w-full h-0 bg-[#004750]/30 backdrop-blur-[2px] transition-all duration-500 ease-in-out group-hover:h-full" />
        <span className="absolute top-4 left-4 bg-[#1a4f6d] text-white eyebrow px-3 py-1.5">{article.category}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs text-slate-400 mb-3">{article.date}</div>
        <h3 className="font-serif text-xl text-[#1a4f6d] dark:text-white leading-snug mb-3 group-hover:text-[#3a6d8c] dark:group-hover:text-[#dab26a] transition-colors line-clamp-3">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-6">{article.summary}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-[#1a4f6d] dark:text-[#dab26a] group-hover:text-[#dab26a] transition-colors">
          {readLabel}
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}

export function NewsHub({ content, currentLang, onNavigate, onSelectNews }) {
  const n = content.news;
  const t = (ui[currentLang] || ui.en).news;
  const [tab, setTab] = useState(0);

  const keywords = TAB_KEYWORDS[tab];
  const articles = keywords
    ? n.articles.filter((a) => keywords.some((k) => a.category.toLowerCase().includes(k)))
    : n.articles;
  const [featured, ...rest] = articles;

  return (
    <div id="news">
      <PageHeader content={content} onNavigate={onNavigate} title={n.title} image="/images/president-gerd-forum.jpg" />

      {/* Filter tabs */}
      <div className="bg-white dark:bg-[#0a1a26] border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div role="tablist" aria-label={n.title} className="flex overflow-x-auto -mb-px">
            {n.tabs.map((label, i) => (
              <button
                key={label}
                role="tab"
                aria-selected={tab === i}
                onClick={() => setTab(i)}
                className={`relative whitespace-nowrap px-4 py-5 text-[15px] font-medium transition-colors cursor-pointer ${
                  tab === i ? 'text-[#1a4f6d] dark:text-[#dab26a]' : 'text-slate-500 dark:text-slate-400 hover:text-[#1a4f6d] dark:hover:text-white'
                }`}
              >
                {label}
                <span className={`absolute left-4 right-4 bottom-0 h-[3px] bg-[#dab26a] transition-transform duration-300 origin-left ${tab === i ? 'scale-x-100' : 'scale-x-0'}`} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="py-14 sm:py-20 bg-[#f8fafc] dark:bg-[#0c1f2e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!featured ? (
            <p className="text-center text-slate-500 dark:text-slate-400 py-20">{t.empty}</p>
          ) : (
            <>
              {/* Featured story */}
              <article
                onClick={() => onSelectNews(featured)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onSelectNews(featured))}
                role="button"
                tabIndex={0}
                className="group grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-[#0a1a26] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer mb-10 focus-visible:outline-3 focus-visible:outline-[#dab26a]"
              >
                <div className="lg:col-span-7 relative overflow-hidden bg-slate-200 aspect-[16/10] lg:aspect-auto lg:min-h-[420px]">
                  <img src={featured.image} alt="" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute top-5 left-5 bg-[#dab26a] text-[#0e2f45] eyebrow px-3 py-1.5">{t.featured}</span>
                </div>
                <div className="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="eyebrow text-[#3a6d8c] dark:text-[#dab26a] mb-4">{featured.category}</div>
                  <h2 className="font-serif text-2xl lg:text-3xl text-[#1a4f6d] dark:text-white leading-snug mb-5 group-hover:text-[#3a6d8c] dark:group-hover:text-[#dab26a] transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-4">{featured.summary}</p>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mb-8">
                    <span>{featured.date}</span>
                    {featured.readTime && (
                      <span className="inline-flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{featured.readTime}</span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a4f6d] dark:text-[#dab26a]">
                    {n.readArticle}
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </article>

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                  {rest.map((a) => (
                    <NewsCard key={a.id} article={a} onSelect={onSelectNews} readLabel={n.readArticle} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
