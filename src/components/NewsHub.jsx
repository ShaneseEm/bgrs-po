import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, Filter, ChevronRight, Sparkles } from 'lucide-react';
import { NewsModal } from './NewsModal';

export function NewsHub({ content, currentLang }) {
  const n = content.news;
  const [activeTab, setActiveTab] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Filter articles based on activeTab
  const filteredArticles = activeTab === 'All' || activeTab === 'ሁሉም'
    ? n.articles
    : n.articles.filter((art) => {
        if (activeTab === 'Press Releases' || activeTab === 'መግለጫዎች') return art.category.toLowerCase().includes('press') || art.category.toLowerCase().includes('መግለጫ');
        if (activeTab === 'Cabinet Decisions' || activeTab === 'የካቢኔ ውሳኔዎች') return art.category.toLowerCase().includes('cabinet') || art.category.toLowerCase().includes('ካቢኔ');
        if (activeTab === 'Speeches' || activeTab === 'ንግግሮች') return art.category.toLowerCase().includes('speech') || art.category.toLowerCase().includes('ንግግር');
        if (activeTab === 'Development' || activeTab === 'የልማት ዜናዎች') return art.category.toLowerCase().includes('development') || art.category.toLowerCase().includes('ልማት');
        return true;
      });

  const featuredArticle = filteredArticles[0] || n.articles[0];
  const secondaryArticles = filteredArticles.slice(1);

  return (
    <section id="news" className="py-20 sm:py-28 bg-white dark:bg-slate-950 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
              <Newspaper className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>{n.subtitle}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-serif uppercase">
              {n.title}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
            {n.tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive 
                      ? 'bg-gradient-to-r from-emerald-700 to-emerald-800 text-white shadow-sm ring-1 ring-emerald-500/50' 
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured + Secondary Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Featured Headline Card (Left 7 Cols) */}
          {featuredArticle && (
            <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3.5 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                    {featuredArticle.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-white/90 bg-slate-950/80 backdrop-blur-md px-3.5 py-1 rounded-full border border-slate-700">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {featuredArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> {featuredArticle.readTime}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white font-serif leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="bg-gradient-to-r from-[#0d4a2c] to-[#146039] hover:from-[#125c38] hover:to-[#1a7a49] text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-all cursor-pointer ring-1 ring-amber-500/20"
                >
                  <span>{n.readArticle}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Secondary Feed (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {secondaryArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 hover:border-amber-500 dark:hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex gap-4 group"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-900 flex-shrink-0">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      {article.category}
                    </span>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white font-serif mt-1 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                      {article.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                    <Calendar className="w-3 h-3 text-amber-500" />
                    <span>{article.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Reader Modal */}
      {selectedArticle && (
        <NewsModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
          currentLang={currentLang}
        />
      )}
    </section>
  );
}
