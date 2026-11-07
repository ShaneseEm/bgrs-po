import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const primaryTargets = ['president', 'initiatives', 'administration'];
const secondaryTargets = ['initiatives', 'initiatives', 'administration'];

export function HeroBanner({ content, onNavigate }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = content.hero.slides;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const go = (dir) => setCurrent((p) => (p + dir + slides.length) % slides.length);
  const slide = slides[current];

  return (
    <section
      className="relative bg-[#0e2f45] text-white overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image layers (crossfade) */}
      <div className="relative h-[min(82vh,720px)] min-h-[520px]">
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? 'opacity-100' : 'opacity-0'}`}
            aria-hidden={i !== current}
          >
            <img
              src={s.image}
              alt={s.alt}
              className={`w-full h-full object-cover object-center ${i === current ? 'animate-kenburns' : ''}`}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2233]/95 via-[#0e2f45]/70 to-[#0e2f45]/10" />
        <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-[#0a2233]/80 to-transparent" />

        {/* Copy */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
            <div key={current} className="max-w-2xl animate-fade-in">
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#dab26a]" />
                <span className="eyebrow text-[#dab26a]">{content.hero.badge}</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] text-white mb-5">
                {slide.headline}
              </h2>
              <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed mb-8 max-w-xl">
                {slide.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onNavigate?.(primaryTargets[current % primaryTargets.length])}
                  className="min-h-11 inline-flex items-center justify-center gap-2 bg-[#dab26a] hover:bg-white text-[#0e2f45] px-7 py-3.5 text-[15px] font-semibold shadow-lg transition-all active:scale-95 cursor-pointer"
                >
                  {slide.actionPrimary}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate?.(secondaryTargets[current % secondaryTargets.length])}
                  className="min-h-11 inline-flex items-center justify-center border-2 border-white/70 hover:bg-white hover:text-[#0e2f45] text-white px-7 py-3 text-[15px] font-semibold transition-all active:scale-95 cursor-pointer"
                >
                  {slide.actionSecondary}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide controls */}
        <div className="absolute bottom-6 inset-x-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {slides.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => setCurrent(i)}
                  className="group flex items-center gap-2 cursor-pointer py-2"
                  aria-label={`Slide ${i + 1}`}
                >
                  <span className={`text-xs font-bold tabular-nums ${i === current ? 'text-[#dab26a]' : 'text-white/50 group-hover:text-white'}`}>
                    0{i + 1}
                  </span>
                  <span className={`h-[2px] transition-all duration-500 ${i === current ? 'w-12 bg-[#dab26a]' : 'w-6 bg-white/30 group-hover:bg-white/60'}`} />
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => go(-1)} aria-label="Previous slide" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={() => go(1)} aria-label="Next slide" className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all cursor-pointer">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Briefing ticker */}
      <div className="bg-white dark:bg-[#0a1a26] border-b border-slate-200 dark:border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch">
          <div className="flex-shrink-0 flex items-center bg-[#1a4f6d] text-white px-4 sm:px-6 py-3 eyebrow">
            {content.hero.tickerLabel}
          </div>
          <div className="overflow-hidden whitespace-nowrap flex-1 min-w-0 flex items-center px-4">
            <div className="inline-block animate-marquee text-slate-600 dark:text-slate-300 text-[13px]">
              {content.hero.tickerText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
