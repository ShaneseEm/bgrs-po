import React, { useState } from 'react';
import { Compass, ArrowRight, Zap, Gem, Wheat, ShieldCheck, X } from 'lucide-react';

export function InitiativesSection({ content }) {
  const init = content.initiatives;
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section id="initiatives" className="py-16 sm:py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-900 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-amber-700" />
            <span>{init.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {init.title}
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            {init.description}
          </p>
          <div className="w-20 h-1 bg-emerald-700 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {init.items.map((item) => (
            <div 
              key={item.id}
              className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* Image Preview with category badge */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-xs text-amber-300 text-[11px] font-bold px-2.5 py-1 rounded border border-amber-500/40">
                  {item.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors font-serif">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-1 rounded mb-3">
                    {item.metrics}
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="w-full text-center text-xs font-bold text-amber-700 hover:text-amber-800 py-1.5 rounded flex items-center justify-center gap-1 group-hover:translate-x-0.5 transition-all"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            <div className="relative h-64 bg-slate-900">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-4 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded shadow-md">
                {selectedItem.category}
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
              <h3 className="text-2xl font-black text-slate-900 font-serif">
                {selectedItem.title}
              </h3>
              
              <div className="inline-block bg-emerald-100 text-emerald-900 font-bold text-xs px-3 py-1.5 rounded">
                Impact Metric: {selectedItem.metrics}
              </div>

              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                {selectedItem.desc}
              </p>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 space-y-2 text-xs text-slate-600">
                <div className="font-bold text-slate-800 uppercase tracking-wide">Key Regional Milestones:</div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Coordinated with Federal Ministry of Innovation, Water & Energy, and Mines.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Direct employment generation for thousands of local youth in Benishangul Gumuz.</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>Community benefit-sharing protocols ratified by Regional Cabinet.</span>
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs px-5 py-2.5 rounded uppercase tracking-wider transition-colors"
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
