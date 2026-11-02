import React from 'react';
import { Zap, MapPin, Building2, Trees, TrendingUp } from 'lucide-react';

export function StatisticsSection({ content }) {
  const stats = content.stats;
  const icons = [Zap, MapPin, Building2, Trees];

  return (
    <section className="bg-gradient-to-r from-[#061d11] via-[#0d4a2c] to-[#061d11] text-white py-16 border-y-4 border-amber-500 shadow-2xl relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div 
                key={idx} 
                className="group relative bg-emerald-950/70 backdrop-blur-md border border-emerald-600/40 hover:border-amber-400/80 rounded-2xl p-7 text-center transition-all duration-300 transform hover:-translate-y-1.5 shadow-xl hover:shadow-amber-500/10"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/15 text-amber-400 flex items-center justify-center mb-4 border border-amber-500/30 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="text-3xl sm:text-4xl font-black text-amber-400 tracking-tight font-serif mb-1 group-hover:text-amber-300 transition-colors">
                  {stat.value}
                </div>
                <div className="text-sm font-bold text-white tracking-wide uppercase mb-1.5">
                  {stat.label}
                </div>
                <div className="text-xs text-emerald-200/90 font-light leading-relaxed">
                  {stat.subtext}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
