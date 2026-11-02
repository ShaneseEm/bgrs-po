import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroBanner({ content, onSelectNews }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slides = content.hero.slides;

  // 3D Card Tilt State
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  // Auto transition slides
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  // Mouse move handler for realistic 3D perspective tilt
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates (-0.5 to 0.5)
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Max tilt angles: 14deg
    setTilt({
      x: -normY * 16,
      y: normX * 16,
      glareX: (x / rect.width) * 100,
      glareY: (y / rect.height) * 100,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPaused(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  return (
    <section 
      className="relative bg-slate-950 text-white overflow-hidden border-b border-emerald-950/60"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-slate-950 to-slate-900/90 z-0" />
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Slide Content - Clean & Non-Bulky */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Headlines & Actions (No arrows, no dot counters) */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            <div className="inline-flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/50 px-3.5 py-1 rounded-full text-xs font-bold text-emerald-200 shadow-sm">
              <img src="/images/bgrs-flag-new.png" alt="BGRS Flag" className="w-4 h-3 object-cover rounded-xs" />
              <span>{content.hero.badge}</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight text-white font-sans transition-all duration-500">
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

          </div>

          {/* Right Column: Interactive 3D Holographic Perspective Card */}
          <div 
            className="lg:col-span-5 relative flex items-center justify-center py-2"
            style={{ perspective: '1200px' }}
          >
            <div
              ref={cardRef}
              onClick={nextSlide}
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="relative w-full max-w-sm rounded-2xl overflow-hidden cursor-pointer transition-transform duration-200 ease-out select-none border-2 border-amber-400/50 shadow-2xl group"
              style={{
                transform: isHovered 
                  ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.03, 1.03, 1.03)` 
                  : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
                boxShadow: isHovered
                  ? '0 30px 60px -15px rgba(13, 74, 44, 0.6), 0 0 35px rgba(234, 179, 8, 0.35)'
                  : '0 20px 40px -10px rgba(0, 0, 0, 0.5)',
                transformStyle: 'preserve-3d',
              }}
              title="Click to explore next regional showcase"
            >
              {/* Image layer */}
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].alt}
                className="w-full h-80 sm:h-96 object-cover object-top transition-transform duration-700 pointer-events-none"
              />

              {/* 3D Dynamic Glare Effect */}
              {isHovered && (
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-60 z-20"
                  style={{
                    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 65%)`
                  }}
                />
              )}

              {/* Gradient Bottom Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

              {/* 3D Elevated Label Card */}
              <div 
                className="absolute bottom-4 left-4 right-4 bg-slate-950/85 backdrop-blur-md p-3 rounded-xl border border-amber-500/30 shadow-lg pointer-events-none transition-transform duration-300"
                style={{
                  transform: isHovered ? 'translateZ(30px)' : 'translateZ(0px)',
                }}
              >
                <div className="flex items-center justify-between text-[10px] text-amber-400 font-bold uppercase tracking-wider mb-1">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>{content.hero.tag}</span>
                  </span>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-700/60 font-mono">
                    Slide {currentSlide + 1} / {slides.length} • Click
                  </span>
                </div>
                <div className="text-xs text-slate-200 font-semibold truncate">
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
