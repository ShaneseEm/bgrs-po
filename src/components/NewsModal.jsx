import React from 'react';
import { X, Calendar, Clock, Share2, Printer, Bookmark, Tag, Sparkles } from 'lucide-react';

export function NewsModal({ article, onClose, currentLang }) {
  if (!article) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.summary,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(currentLang === 'am' ? 'ማገናኛው ተገልብጧል!' : 'Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              {article.category}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">• Official Press Release</span>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handlePrint}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
              title="Print Statement"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button 
              onClick={handleShare}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors ml-2 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 flex-1">
          
          {/* Article Header */}
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans leading-tight">
              {article.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400 pt-1 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-500" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Office of the Regional President, Assosa</span>
            </div>
          </div>

          {/* Featured Image */}
          {article.image && (
            <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-900 shadow-md">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="bg-slate-950 text-slate-400 text-[11px] px-4 py-2 italic">
                Photo: Communications Directorate of the President's Office, Benishangul Gumuz Regional State.
              </div>
            </div>
          )}

          {/* Lead Summary */}
          <div className="bg-emerald-50/80 dark:bg-emerald-950/50 border-l-4 border-emerald-700 dark:border-emerald-500 p-4 rounded-r-xl text-emerald-950 dark:text-emerald-200 font-medium text-sm sm:text-base leading-relaxed">
            {article.summary}
          </div>

          {/* Full Content */}
          <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 text-sm sm:text-base">
            <p>{article.content}</p>
            <p>
              The Regional Government reiterates its unwavering pledge to ensure equitable prosperity, safeguard public peace, and coordinate seamlessly with all federal institutions, developmental partners, and community elders.
            </p>
          </div>

          {/* Official Sign-off Badge */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-50 dark:bg-slate-850 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <img src="/images/bgrs-emblem-new.png" alt="" className="w-10 h-10 object-contain" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white uppercase">Press Secretariat Directorate</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">Benishangul Gumuz Regional State • Assosa</div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
            >
              Close Statement
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
