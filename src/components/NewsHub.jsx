import React, { useState } from 'react';
import { Newspaper, Calendar, Clock, ArrowRight, Filter, ChevronRight } from 'lucide-react';
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
    <section id="news" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              <Newspaper className="w-3.5 h-3.5 text-amber-600" />
              <span>{n.subtitle}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
              {n.title}
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-lg border border-slate-200">
            {n.tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    isActive 
                      ? 'bg-emerald-800 text-white shadow-xs' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
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
            <div className="lg:col-span-7 bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition-all group flex flex-col justify-between">
              <div>
                <div className="relative h-64 sm:h-80 overflow-hidden bg-slate-900">
                  <img 
                    src={featuredArticle.image} 
                    alt={featuredArticle.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded shadow-md uppercase tracking-wider">
                    {featuredArticle.category}
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-3 text-xs text-white/90 bg-slate-950/70 backdrop-blur-xs px-3 py-1 rounded-full">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-400" /> {featuredArticle.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-400" /> {featuredArticle.readTime}</span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-serif leading-snug group-hover:text-emerald-800 transition-colors">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed line-clamp-3">
                    {featuredArticle.summary}
                  </p>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => setSelectedArticle(featuredArticle)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded flex items-center gap-2 shadow-xs transition-colors"
                >
                  <span>{n.readArticle}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Secondary News Stream (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-200 pb-2 flex items-center justify-between">
              <span>Recent Statements</span>
              <span className="text-emerald-700 font-semibold">{filteredArticles.length} Updates</span>
            </h4>

            <div className="space-y-4">
              {secondaryArticles.length > 0 ? (
                secondaryArticles.map((art) => (
                  <div 
                    key={art.id}
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white p-4 rounded-xl border border-slate-200 hover:border-emerald-600 hover:shadow-md transition-all cursor-pointer flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                      <img 
                        src={art.image} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          <span className="text-[11px] text-slate-400">{art.date}</span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors line-clamp-2 font-serif">
                          {art.title}
                        </h4>
                      </div>

                      <div className="text-[11px] text-amber-700 font-bold flex items-center gap-1 mt-2">
                        <span>Read statement</span>
                        <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-slate-50 rounded-xl border border-slate-200 text-slate-500 text-xs">
                  No additional updates in this category.
                </div>
              )}
            </div>

            {/* Media Archive Link Banner */}
            <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-xl border border-emerald-700 shadow-md">
              <h5 className="font-bold text-sm text-amber-300 font-serif mb-1">Official Press Registry</h5>
              <p className="text-xs text-slate-300 leading-relaxed mb-3">
                Access executive communiqués, regional statistical gazettes, and high-resolution presidential photographs.
              </p>
              <button
                onClick={() => setSelectedArticle(n.articles[0])}
                className="text-xs font-bold text-white bg-amber-600 hover:bg-amber-500 px-3 py-1.5 rounded uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
              >
                <span>{n.viewAll}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Reader Modal */}
      <NewsModal 
        article={selectedArticle} 
        onClose={() => setSelectedArticle(null)}
        currentLang={currentLang}
      />
    </section>
  );
}
