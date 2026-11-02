import React, { useState } from 'react';
import { Compass, ArrowRight, Zap, Gem, Wheat, ShieldCheck, X, Sparkles } from 'lucide-react';

export function InitiativesSection({ content }) {
  const init = content.initiatives;
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="initiatives" className="py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800/80 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{init.subtitle}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-serif uppercase">
            {init.title}
          </h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed">
            {init.description}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {init.items.map((item) => (
            <div 
              key={item.id}
              className="bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1"
            >
              {/* Image Preview with category badge */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded-full border border-amber-500/40 shadow-sm">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors font-serif line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2.5 py-1 rounded-lg mb-3">
                    {item.metrics}
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full text-center text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 py-1.5 rounded flex items-center justify-center gap-1.5 group-hover:translate-x-1 transition-all cursor-pointer"
                  >
                    <span>Read Strategic Plan</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-700">
            <div className="relative h-64 bg-slate-900">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-800 text-white p-2 rounded-full transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
                {selectedItem.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white font-serif">
                {selectedItem.title}
              </h3>
              
              <div className="inline-block bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs px-3 py-1 rounded-lg">
                Impact Target: {selectedItem.metrics}
              </div>

              <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
                {selectedItem.desc}
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 leading-relaxed space-y-2">
                <div className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  Strategic Roadmap & Execution Framework
                </div>
                <p>
                  Coordinated by the Office of the Regional President in synergy with the Federal Ministry of Water and Energy, the Ethiopian Mining Corporation, and the Ministry of Agriculture.
                </p>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close Overview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
