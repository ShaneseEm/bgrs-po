import React, { useState, useEffect } from 'react';
import { 
  Quote, FileText, Mic, Award, CheckCircle2, ChevronRight, ChevronLeft,
  Mail, Calendar, Shield, Building2, Sparkles, BookOpen, Layers,
  Maximize2, X, Camera, MapPin, Eye, Play, Pause
} from 'lucide-react';

export function PresidentSection({ content, onOpenSpeeches }) {
  const p = content.presidentSection;
  const photos = p.photos || [
    {
      id: 1,
      url: p.portraitOfficial || '/images/president-official.png',
      title: p.name,
      caption: p.role,
      tag: 'Official Portrait',
      location: 'Assosa'
    }
  ];

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState('vision');
  const [fullscreenPhoto, setFullscreenPhoto] = useState(null);

  // Auto-transition slides every 5 seconds
  useEffect(() => {
    if (!isAutoPlaying || fullscreenPhoto) return;
    const interval = setInterval(() => {
      setActivePhotoIdx((prev) => (prev + 1) % photos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, photos.length, fullscreenPhoto]);

  const nextPhoto = () => {
    setActivePhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setActivePhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const currentPhoto = photos[activePhotoIdx];

  return (
    <section id="president" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Background regional watermark */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none">
        <img src="/images/bgrs-official-emblem.png" alt="" className="w-[800px] h-[800px] object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3.5 shadow-xs">
            <img src="/images/bgrs-official-emblem.png" alt="" className="w-4 h-4 object-contain" />
            <span>{p.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-serif uppercase">
            {p.title}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 via-emerald-600 to-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Executive Profile Card Layout */}
        <div className="bg-gradient-to-b from-slate-50 via-white to-slate-50 rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left Column: Animated Presidential Photo Showcase (5 cols) */}
            <div 
              className="lg:col-span-5 flex flex-col items-center"
              onMouseEnter={() => setIsAutoPlaying(false)}
              onMouseLeave={() => setIsAutoPlaying(true)}
            >
              
              {/* Main Portrait Frame with Golden Border & Animations */}
              <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-2xl bg-slate-950">
                
                {/* Active Photo Container with Smooth Fade & Scale Transition */}
                <div className="relative h-[490px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img 
                    key={currentPhoto.id}
                    src={currentPhoto.url} 
                    alt={currentPhoto.title}
                    className="w-full h-full object-cover object-top transition-all duration-700 animate-fade-in group-hover:scale-105"
                  />

                  {/* Gradient shadow overlay at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950 via-slate-950/75 to-transparent pointer-events-none"></div>

                  {/* Top Left: Regional Flag Badge */}
                  <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 flex items-center gap-2 shadow-lg">
                    <img src="/images/bgrs-official-flag.png" alt="BGRS Flag" className="w-5 h-3.5 object-cover rounded-xs" />
                    <span className="text-[10px] font-bold text-amber-300 tracking-wider uppercase">
                      {currentPhoto.tag}
                    </span>
                  </div>

                  {/* Top Right: Fullscreen Expand & Auto-Play indicator */}
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <button
                      onClick={() => setFullscreenPhoto(currentPhoto)}
                      className="bg-slate-900/80 hover:bg-emerald-800 text-white p-2 rounded-full border border-slate-700 transition-colors shadow-lg cursor-pointer"
                      title="View High-Resolution Photo"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="bg-slate-900/80 hover:bg-slate-800 text-slate-300 p-2 rounded-full border border-slate-700 transition-colors shadow-lg cursor-pointer"
                      title={isAutoPlaying ? "Pause Slideshow" : "Resume Slideshow"}
                    >
                      {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                    </button>
                  </div>

                  {/* Manual Arrow Controls (Overlay) */}
                  <button
                    onClick={prevPhoto}
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                    aria-label="Previous Photo"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={nextPhoto}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-900/70 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer"
                    aria-label="Next Photo"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dynamic Caption on Bottom */}
                  <div className="absolute bottom-4 inset-x-4 text-center z-10">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-serif tracking-wide drop-shadow-md">
                      {p.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold tracking-wider mt-0.5 uppercase drop-shadow-sm">
                      {p.role}
                    </p>
                    <div className="mt-2 text-[11px] text-slate-300 line-clamp-1 bg-slate-950/70 py-1 px-3 rounded-full border border-slate-800 flex items-center justify-center gap-1.5">
                      <MapPin className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span className="truncate">{currentPhoto.caption}</span>
                    </div>
                  </div>
                </div>

                {/* Animated Auto-Play Progress Bar */}
                {isAutoPlaying && (
                  <div className="w-full bg-slate-800 h-1 overflow-hidden">
                    <div 
                      key={activePhotoIdx}
                      className="bg-gradient-to-r from-amber-400 to-emerald-500 h-full w-full"
                      style={{
                        animation: 'marquee 5s linear infinite'
                      }}
                    />
                  </div>
                )}

              </div>

              {/* Thumbnails Navigation Row (5 Photos Selector) */}
              <div className="w-full max-w-sm mt-4">
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1.5 px-1">
                  <span className="flex items-center gap-1">
                    <Camera className="w-3 h-3 text-emerald-700" />
                    <span>Official Media Stream</span>
                  </span>
                  <span className="font-mono text-slate-400">0{activePhotoIdx + 1} / 0{photos.length}</span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {photos.map((item, idx) => {
                    const isSelected = activePhotoIdx === idx;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActivePhotoIdx(idx);
                          setIsAutoPlaying(false);
                        }}
                        className={`relative rounded-lg overflow-hidden border-2 transition-all cursor-pointer h-16 bg-slate-900 group/thumb ${
                          isSelected 
                            ? 'border-amber-500 ring-2 ring-amber-400/50 scale-105' 
                            : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-emerald-600'
                        }`}
                        title={item.title}
                      >
                        <img 
                          src={item.url} 
                          alt={item.title} 
                          className="w-full h-full object-cover object-top"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-amber-500/15 pointer-events-none" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Tabbed Content, Vision, Biography, Key Pillars (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Navigation Tabs for President Page */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'vision' 
                      ? 'bg-[#0d4a2c] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Quote className="w-3.5 h-3.5 text-amber-400" />
                  <span>Executive Vision</span>
                </button>

                <button
                  onClick={() => setActiveTab('pillars')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'pillars' 
                      ? 'bg-[#0d4a2c] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Priorities</span>
                </button>

                <button
                  onClick={() => setActiveTab('gallery')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'gallery' 
                      ? 'bg-[#0d4a2c] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Camera className="w-3.5 h-3.5 text-amber-400" />
                  <span>Photo Archive ({photos.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('bio')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === 'bio' 
                      ? 'bg-[#0d4a2c] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Biography</span>
                </button>
              </div>

              {/* Tab 1: Executive Vision */}
              {activeTab === 'vision' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* President's Quote Callout */}
                  <div className="relative bg-gradient-to-br from-amber-50/80 via-white to-emerald-50/50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-2xl shadow-xs border-y border-r border-slate-200/80">
                    <Quote className="w-12 h-12 text-amber-500/20 absolute top-4 right-4 pointer-events-none" />
                    <p className="text-lg sm:text-xl italic font-serif text-slate-800 leading-relaxed">
                      "{p.quote}"
                    </p>
                    <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img src="/images/bgrs-official-emblem.png" alt="" className="w-7 h-7 object-contain" />
                        <div>
                          <span className="font-bold text-sm text-slate-900 block">{p.name}</span>
                          <span className="text-xs text-amber-700 font-semibold">{p.role}</span>
                        </div>
                      </div>
                      <img src="/images/bgrs-official-flag.png" alt="" className="w-9 h-6 object-cover rounded shadow-xs border border-slate-200" />
                    </div>
                  </div>

                  {/* Bio Excerpt summary */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                    {p.bioExcerpt}
                  </p>

                  {/* 2 Achievement Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/90 border border-emerald-200 p-4 rounded-xl flex items-center gap-3.5 shadow-xs">
                      <div className="w-11 h-11 rounded-full bg-emerald-800 text-amber-400 flex items-center justify-center flex-shrink-0 shadow-xs">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-extrabold text-emerald-950">{p.decreeCount}</div>
                        <div className="text-xs text-slate-600 font-medium">Reforms & Executive Decrees</div>
                      </div>
                    </div>

                    <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-xl flex items-center gap-3.5 shadow-xs">
                      <div className="w-11 h-11 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                        <Mic className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-base font-extrabold text-amber-950">{p.speechesCount}</div>
                        <div className="text-xs text-slate-600 font-medium">Policy Addresses & Briefings</div>
                      </div>
                    </div>
                  </div>

                </div>
              )}

              {/* Tab 2: Key Priorities */}
              {activeTab === 'pillars' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                    Strategic Execution Pillars Under President Ashadli Hassan
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {p.keyPillars.map((pillar, idx) => (
                      <div 
                        key={idx}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-600 hover:shadow-md transition-all group"
                      >
                        <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-2 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                          0{idx + 1}
                        </div>
                        <h4 className="font-bold text-sm text-slate-900 font-serif mb-1 group-hover:text-emerald-800 transition-colors">
                          {pillar.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {pillar.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 3: Photo Archive Grid */}
              {activeTab === 'gallery' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-bold flex items-center justify-between">
                    <span>Executive Photographic Documentation</span>
                    <span className="text-emerald-800">{photos.length} Verified Photos</span>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {photos.map((item, idx) => (
                      <div 
                        key={item.id}
                        onClick={() => {
                          setActivePhotoIdx(idx);
                          setFullscreenPhoto(item);
                        }}
                        className="p-3 bg-white rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all cursor-pointer flex gap-3 group"
                      >
                        <div className="w-20 h-20 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                          <img 
                            src={item.url} 
                            alt={item.title} 
                            className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {item.tag}
                            </span>
                            <h5 className="font-bold text-xs text-slate-900 font-serif mt-1 line-clamp-1 group-hover:text-emerald-800 transition-colors">
                              {item.title}
                            </h5>
                          </div>
                          <div className="text-[11px] text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span className="truncate">{item.location}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab 4: Detailed Biography */}
              {activeTab === 'bio' && (
                <div className="space-y-4 animate-fade-in text-slate-700 text-sm leading-relaxed">
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-3">
                    <h4 className="font-bold text-base text-slate-900 font-serif flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-emerald-800" />
                      <span>Leadership Record & Public Service</span>
                    </h4>
                    <p>{p.biographyDetails.intro}</p>
                    <p>{p.biographyDetails.career}</p>
                    <p>{p.biographyDetails.education}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-slate-200">
                <a
                  href="#news"
                  onClick={onOpenSpeeches}
                  className="bg-[#0d4a2c] hover:bg-[#125c38] text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-900/30 flex items-center gap-2 cursor-pointer"
                >
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>{p.viewSpeeches}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#services"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Message the President</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {fullscreenPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col max-h-[92vh]">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {fullscreenPhoto.tag}
                </span>
                <span className="text-xs text-slate-400">• {fullscreenPhoto.location}</span>
              </div>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 flex-1 flex items-center justify-center overflow-hidden bg-black/60">
              <img 
                src={fullscreenPhoto.url} 
                alt={fullscreenPhoto.title} 
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-lg shadow-lg"
              />
            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 text-slate-300 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h4 className="font-bold text-sm text-white font-serif">{fullscreenPhoto.title}</h4>
                <p className="text-slate-400 text-xs mt-0.5">{fullscreenPhoto.caption}</p>
              </div>
              <button
                onClick={() => setFullscreenPhoto(null)}
                className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-md uppercase tracking-wider transition-colors cursor-pointer"
              >
                Close Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
