import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, BellRing, Sparkles, ShieldCheck } from 'lucide-react';

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
      {/* Background Decorative Gradient & Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-950 to-slate-900 opacity-95 z-0" />
      <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2.5 bg-emerald-950/90 border border-emerald-500/60 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-200 backdrop-blur-md shadow-lg">
              <img src="/images/bgrs-flag-new.png" alt="BGRS Flag" className="w-5 h-3.5 object-cover rounded shadow-xs" />
              <span>{content.hero.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-serif transition-all duration-500">
              {slides[currentSlide].headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light transition-all duration-500">
              {slides[currentSlide].subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#president"
                className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 px-6 py-3 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2 ring-1 ring-amber-300/40"
              >
                <span>{slides[currentSlide].actionPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#initiatives"
                className="bg-slate-800/80 hover:bg-slate-700/80 text-white border border-slate-600 px-6 py-3 rounded-lg font-semibold text-xs sm:text-sm transition-all backdrop-blur-xs flex items-center gap-2"
              >
                <span>{slides[currentSlide].actionSecondary}</span>
              </a>
            </div>

            {/* Carousel Controls & Indicators */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Slide Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlide === idx ? 'w-8 bg-amber-400 shadow-xs' : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs text-slate-400 font-mono">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual with Real Image & Border Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl bg-slate-900 group">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-slate-950/80 backdrop-blur-md p-3.5 rounded-xl border border-slate-700/80">
                <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{content.hero.tag}</span>
                </div>
                <div className="text-xs text-slate-300 font-medium line-clamp-1">
                  {slides[currentSlide].alt}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Live Official Briefing Ticker Bar */}
      <div className="bg-slate-950 border-t border-slate-800 text-xs py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <div className="flex-shrink-0 flex items-center gap-1.5 bg-red-600 text-white px-2.5 py-0.5 rounded font-black tracking-wider text-[10px] uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>{content.hero.tickerLabel}</span>
          </div>
          
          <div className="overflow-hidden whitespace-nowrap flex-1">
            <div className="inline-block animate-marquee text-slate-300 text-xs font-medium">
              {content.hero.tickerText}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
