import React, { useState, useEffect } from 'react';
import { 
  Quote, FileText, Mic, ChevronRight, ChevronLeft,
  Mail, BookOpen, Layers, Maximize2, X, Camera, MapPin, Play, Pause, Sparkles
} from 'lucide-react';

export function PresidentSection({ content, onOpenSpeeches }) {
  const p = content.presidentSection;
  const photos = p.photos || [];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [prevPhotoIdx, setPrevPhotoIdx] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('vision');
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  // Auto-transition slides every 3 seconds
  useEffect(() => {
    if (!isAutoPlaying || fullscreenPhoto || photos.length === 0) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length, fullscreenPhoto]);

  const nextPhoto = () => {
    if (photos.length === 0) return;
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    if (photos.length === 0) return;
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[activePhotoIdx] || photos[0];

  return (
    <section id="president" className="py-12 sm:py-16 bg-white dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header - Crisp & Concise */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-widest mb-2.5">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>{p.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-sans uppercase">
            {p.title}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-2.5 rounded-full"></div>
        </div>

        {/* Executive Profile Layout (Classic Translucent Glass & Dignified Transitions) */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-white/60 dark:border-slate-700/60 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-emerald-950/10 dark:shadow-black/50 transition-all duration-500">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            
            {/* Left Column: Dignified Portrait & Compact Thumbnails (5 cols) */}
            <div 
              className="lg:col-span-5 flex flex-col items-center"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              {/* Portrait Frame with Classic Border & Hover Transition */}
              <div className="relative group/portrait w-full max-w-sm rounded-2xl overflow-hidden border-2 border-amber-500/70 shadow-2xl bg-slate-950 transition-all duration-500 hover:shadow-amber-500/30 hover:-translate-y-1">
                <div className="relative h-[430px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  {/* Interactive Shimmer Sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover/portrait:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none z-20" />

                  {/* Cross-fade photo stack */}
                  {photos.map((photo, idx) => (
                    <img
                      key={photo.id}
                      src={photo.url}
                      alt={photo.title}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-700 ${
                        idx === activePhotoIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                      } group-hover/portrait:scale-108`}
                      style={{ transitionProperty: 'opacity, transform', transitionDuration: '700ms' }}
                    />
                  ))}

                  {/* Subtle bottom shadow overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent pointer-events-none"></div>

                  {/* Top Badge */}
                  {currentPhoto && (
                    <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-xs px-2.5 py-1 rounded-full border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                      <img src="/images/bgrs-flag-new.png" alt="BGRS Flag" className="w-4 h-2.5 object-cover rounded-xs" />
                      <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                        {currentPhoto.tag}
                      </span>
                    </div>
                  )}

                  {/* Controls */}
                  <div className="absolute top-3 right-3 flex items-center gap-1">
                    <button
                      onClick={() => setFullscreenPhoto(currentPhoto)}
                      className="bg-slate-900/80 hover:bg-emerald-800 text-white p-1.5 rounded-full border border-slate-700 transition-colors cursor-pointer"
                      title="View High-Resolution"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Arrows */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-md cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Caption on Photo */}
                  {currentPhoto && (
                    <div className="absolute bottom-3 inset-x-3 text-center z-10">
                      <h3 className="text-lg sm:text-xl font-bold text-white font-sans tracking-wide drop-shadow-sm">
                        {p.name}
                      </h3>
                      <p className="text-[11px] text-amber-400 font-semibold tracking-wider uppercase mt-0.5">
                        {p.role}
                      </p>
                      <div className="mt-1.5 text-[10px] text-slate-300 truncate bg-slate-950/80 py-0.5 px-2.5 rounded-full border border-slate-800 inline-flex items-center gap-1 max-w-full">
                        <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{currentPhoto.caption}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Progress Line */}
                {isAutoPlaying && (
                  <div className="w-full bg-slate-800 h-0.5 overflow-hidden">
                    <div 
                      key={activePhotoIdx}
                      className="bg-amber-400 h-full w-full"
                      style={{ animation: 'marquee 3s linear infinite' }}
                    />
                  </div>
                )}

                {/* Photo Dot Indicators */}
                <div className="flex items-center justify-center gap-2 py-2.5 bg-slate-950">
                  {photos.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setActivePhotoIdx(idx); setIsAutoPlaying(false); }}
                      className={`rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activePhotoIdx
                          ? 'w-6 h-2 bg-amber-400'
                          : 'w-2 h-2 bg-slate-600 hover:bg-slate-400'
                      }`}
                      aria-label={`Photo ${idx + 1}`}
                    />
                  ))}
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="ml-2 text-slate-500 hover:text-amber-400 transition-colors cursor-pointer"
                    title={isAutoPlaying ? 'Pause' : 'Resume auto-cycle'}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Executive Overview & Tabs (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              
              {/* Dignified Header Badge */}
              <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-sans">
                    {p.name}
                  </h3>
                  <p className="text-sm text-amber-700 dark:text-amber-400 font-bold uppercase tracking-wide">
                    {p.role}
                  </p>
                </div>
                <img src="/images/bgrs-emblem-new.png" alt="" className="w-10 h-10 object-contain" />
              </div>

              {/* Navigation Tabs - Clean & Non-Bulky */}
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'vision', label: 'Executive Vision', icon: Quote },
                  { id: 'pillars', label: 'Key Priorities', icon: Layers },
                  { id: 'gallery', label: `Photos (${photos.length})`, icon: Camera },
                  { id: 'bio', label: 'Biography', icon: BookOpen },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        isActive 
                          ? 'bg-emerald-800 text-white shadow-xs' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 text-amber-400" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab 1: Vision */}
              {activeTab === 'vision' && (
                <div className="space-y-4 animate-fade-in">
                  <div className="relative bg-white dark:bg-slate-800/80 border-l-4 border-amber-500 p-5 rounded-r-xl shadow-xs border-y border-r border-slate-200 dark:border-slate-700">
                    <p className="text-lg sm:text-2xl italic font-sans text-slate-800 dark:text-slate-100 leading-relaxed">
                      "{p.quote}"
                    </p>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
                    {p.bioExcerpt}
                  </p>

                  <div className="grid grid-cols-2 gap-3 pt-1">
                    <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 p-3 rounded-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-emerald-950 dark:text-emerald-300">{p.decreeCount}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Executive Decrees</div>
                      </div>
                    </div>

                    <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-3 rounded-lg flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                        <Mic className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-base font-bold text-amber-950 dark:text-amber-300">{p.speechesCount}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-400">Policy Briefings</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Key Priorities */}
              {activeTab === 'pillars' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {p.keyPillars.map((pillar, idx) => (
                      <div 
                        key={idx}
                        className="bg-white dark:bg-slate-800/80 p-3.5 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs"
                      >
                        <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mb-1 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 flex items-center justify-center text-[10px] font-black">
                            {idx + 1}
                          </span>
                          <span>{pillar.title}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Photo Archive */}
              {activeTab === 'gallery' && (
                <div className="space-y-3 animate-fade-in">
                  <div className="grid grid-cols-2 gap-2.5">
                    {photos.map((item, idx) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setActivePhotoIdx(idx);
                          setFullscreenPhoto(item);
                        }}
                        className="p-2.5 bg-white dark:bg-slate-800/80 rounded-lg border border-slate-200 dark:border-slate-700 hover:border-amber-500 transition-all cursor-pointer flex gap-2.5 items-center group"
                      >
                        <div className="w-14 h-14 rounded-md overflow-hidden bg-slate-900 flex-shrink-0">
                          <img 
                            src={item.url} 
                            alt={item.title} 
                            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-bold text-emerald-800 dark:text-emerald-300 uppercase block truncate">
                            {item.tag}
                          </span>
                          <h5 className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {item.title}
                          </h5>
                          <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate block">
                            {item.location}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Biography */}
              {activeTab === 'bio' && (
                <div className="space-y-3 animate-fade-in text-slate-700 dark:text-slate-200 text-base sm:text-lg leading-relaxed">
                  <div className="bg-white dark:bg-slate-800/80 p-6 rounded-xl border border-slate-200 dark:border-slate-700 space-y-4">
                    <p className="leading-relaxed">{p.biographyDetails.intro}</p>
                    <p className="leading-relaxed">{p.biographyDetails.career}</p>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <a
                  href="#news"
                  onClick={onOpenSpeeches}
                  className="bg-emerald-800 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 text-amber-400" />
                  <span>{p.viewSpeeches}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#services"
                  className="bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
                  <span>Message the President</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen Lightbox */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-3xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                {fullscreenPhoto.title} • {fullscreenPhoto.location}
              </span>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 flex items-center justify-center overflow-hidden bg-black/60">
              <img 
                src={fullscreenPhoto.url} 
                alt={fullscreenPhoto.title} 
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>

            <div className="p-3 bg-slate-950 border-t border-slate-800 text-slate-300 text-xs flex justify-between items-center">
              <span className="text-slate-400">{fullscreenPhoto.caption}</span>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 py-1.5 rounded uppercase tracking-wider"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
