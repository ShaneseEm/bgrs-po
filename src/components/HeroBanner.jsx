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
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section 
      className="relative bg-slate-900 text-white overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 opacity-95 z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[460px]">
          
          {/* Left Column: Headlines & Actions */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="inline-flex items-center gap-2.5 bg-emerald-950/80 border border-emerald-600/70 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-200 backdrop-blur-md shadow-lg">
              <img src="/images/bgrs-official-flag.png" alt="BGRS Flag" className="w-5 h-3.5 object-cover rounded-xs shadow-xs" />
              <span>{content.hero.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-serif">
              {slides[currentSlide].headline}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
              {slides[currentSlide].subheadline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#president"
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-3 rounded font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-amber-500/25 flex items-center gap-2"
              >
                <span>{slides[currentSlide].actionPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#initiatives"
                className="bg-slate-800/80 hover:bg-slate-700 text-white border border-slate-600 px-6 py-3 rounded font-semibold text-sm transition-all backdrop-blur-xs flex items-center gap-2"
              >
                <span>{slides[currentSlide].actionSecondary}</span>
              </a>
            </div>

            {/* Carousel Controls & Indicators */}
            <div className="flex items-center gap-4 pt-6 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <span className="text-xs text-slate-400 font-mono ml-auto">
                0{currentSlide + 1} / 0{slides.length}
              </span>
            </div>

          </div>

          {/* Right Column: High Profile Visual Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md">
              
              {/* Outer Golden Glow Border */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-emerald-600 rounded-2xl blur-xs opacity-50"></div>
              
              <div 
                key={currentSlide}
                className="relative bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 animate-fade-in"
              >
                <img 
                  src={slides[currentSlide].image} 
                  alt={slides[currentSlide].alt}
                  className="w-full h-80 sm:h-96 object-cover object-top transition-all duration-700 hover:scale-105"
                />
                
                {/* Floating Caption Overlay */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[11px] font-bold tracking-widest text-emerald-400 uppercase">
                      Official Archive
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white font-serif line-clamp-2">
                    {slides[currentSlide].alt}
                  </h4>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Breaking News Ticker (Below Hero) */}
      <div className="relative z-10 bg-[#082216] border-y border-emerald-800 text-slate-200 py-2.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 bg-amber-600 text-slate-950 font-black px-2.5 py-1 rounded text-[11px] uppercase tracking-wider flex-shrink-0">
            <BellRing className="w-3.5 h-3.5 animate-bounce" />
            <span>{content.hero.tickerLabel}</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap flex-1">
            <p className="animate-marquee inline-block font-medium text-emerald-100">
              {content.hero.tickerText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
