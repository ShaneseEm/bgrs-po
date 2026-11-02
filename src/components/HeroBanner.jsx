import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

export function HeroBanner({ content, onSelectNews }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = content.hero.slides;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section 
      className="relative bg-slate-950 text-white overflow-hidden border-b border-emerald-950/60"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-slate-900/90 z-0" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content - Clean & Non-Bulky */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            <div className="inline-flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/50 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-200 shadow-sm">
              <img src="/images/bgrs-flag-new.png" alt="BGRS Flag" className="w-4 h-3 object-cover rounded-xs" />
              <span>{content.hero.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-serif transition-all duration-500">
              {slides[currentSlide].headline}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-light max-w-2xl transition-all duration-500">
              {slides[currentSlide].subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#president"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
              >
                <span>{slides[currentSlide].actionPrimary}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#initiatives"
                className="bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 px-5 py-2.5 rounded-lg font-semibold text-xs transition-all flex items-center gap-2"
              >
                <span>{slides[currentSlide].actionSecondary}</span>
              </a>
            </div>

            {/* Compact Indicators */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevSlide}
                  className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-1.5">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-6 bg-amber-400' : 'w-2 bg-slate-700 hover:bg-slate-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-[11px] text-slate-400 font-mono ml-2">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual - Dignified Aspect Ratio */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm rounded-xl overflow-hidden border border-amber-500/40 shadow-xl bg-slate-900 group">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="w-full h-72 sm:h-80 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              
              <div className="absolute bottom-3 left-3 right-3 bg-slate-950/85 backdrop-blur-xs p-2.5 rounded-lg border border-slate-700/80">
                <div className="text-[10px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>{content.hero.tag}</span>
                </div>
                <div className="text-xs text-slate-200 font-medium truncate mt-0.5">
                  {slides[currentSlide].alt}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Official Briefing Ticker Bar */}
      <div className="bg-slate-950/90 border-t border-slate-800 text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 text-white px-2 py-0.5 rounded font-black tracking-wider text-[10px] uppercase">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
            </span>
            <span>{content.hero.tickerLabel}</span>
          </div>
          
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-block animate-marquee text-slate-300 text-xs font-normal">
              {content.hero.tickerText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
