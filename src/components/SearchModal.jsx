import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, Compass, Building, Calendar } from 'lucide-react';

export function SearchModal({ isOpen, onClose, content, currentLang, onSelectNews }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  // Search through articles
  const matchingArticles = q
    ? content.news.articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.category.toLowerCase().includes(q)
      )
    : [];

  // Search through initiatives
  const matchingInitiatives = q
    ? content.initiatives.items.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          i.desc.toLowerCase().includes(q) ||
          i.category.toLowerCase().includes(q)
      )
    : [];

  // Search through bureaus
  const matchingBureaus = q
    ? content.administration.bureaus.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.head.toLowerCase().includes(q) ||
          b.email.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchingArticles.length + matchingInitiatives.length + matchingBureaus.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50 dark:bg-slate-950">
          <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={content.nav.searchPlaceholder}
            className="w-full bg-transparent text-base text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1 cursor-pointer"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Results Container */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {q === '' ? (
            <div className="text-center py-8 text-slate-400 dark:text-slate-500 text-xs space-y-2">
              <Search className="w-8 h-8 mx-auto opacity-30 text-emerald-800 dark:text-emerald-400" />
              <p>Type keywords like "GERD", "Gold", "Agriculture", "Speech", or "Cabinet" to find documents.</p>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-slate-500 dark:text-slate-400 text-xs">
              No government records or news found matching "{query}".
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Articles & Speeches */}
              {matchingArticles.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                    <span>News & Speeches ({matchingArticles.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingArticles.map((art) => (
                      <div
                        key={art.id}
                        onClick={() => {
                          onSelectNews(art);
                          onClose();
                        }}
                        className="p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all cursor-pointer"
                      >
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mb-1">
                          <span className="font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded">
                            {art.category}
                          </span>
                          <span>•</span>
                          <span>{art.date}</span>
                        </div>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white font-sans">{art.title}</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-1">{art.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Initiatives */}
              {matchingInitiatives.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Flagship Initiatives ({matchingInitiatives.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingInitiatives.map((item) => (
                      <a
                        key={item.id}
                        href="#initiatives"
                        onClick={onClose}
                        className="block p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-amber-50 dark:hover:bg-slate-800 hover:border-amber-300 transition-all"
                      >
                        <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase">{item.category}</span>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white font-sans">{item.title}</h5>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 mt-0.5">{item.desc}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Bureaus */}
              {matchingBureaus.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                    <span>Executive Bureaus ({matchingBureaus.length})</span>
                  </h4>
                  <div className="space-y-2">
                    {matchingBureaus.map((bureau, idx) => (
                      <a
                        key={idx}
                        href="#administration"
                        onClick={onClose}
                        className="block p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                      >
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white">{bureau.name}</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{bureau.head} • {bureau.email}</p>
                      </a>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </div>

      </div>
    </div>
  );
}
