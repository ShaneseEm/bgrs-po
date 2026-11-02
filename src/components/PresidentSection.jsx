import React, { useState } from 'react';
import { 
  Quote, FileText, Mic, Award, CheckCircle2, ChevronRight, 
  Mail, Calendar, Shield, Building2, Sparkles, BookOpen, Layers
} from 'lucide-react';

export function PresidentSection({ content, onOpenSpeeches }) {
  const p = content.presidentSection;
  const [activeTab, setActiveTab] = useState('vision');
  const [activePhoto, setActivePhoto] = useState('official'); // 'official' or 'press'

  const currentPhoto = activePhoto === 'official' 
    ? p.portraitOfficial 
    : p.portraitPress;

  return (
    <section id="president" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Subtle regional emblem watermark in the background */}
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-[0.035] pointer-events-none select-none">
        <img src="/images/bgrs-official-emblem.png" alt="" className="w-[750px] h-[750px] object-contain" />
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
            
            {/* Left Column: Official Presidential Portrait Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              
              {/* Main Portrait Frame with Golden Border */}
              <div className="relative group w-full max-w-sm rounded-2xl overflow-hidden border-2 border-amber-500/80 shadow-2xl bg-slate-900">
                
                {/* Image */}
                <div className="relative h-[480px] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
                  <img 
                    src={currentPhoto} 
                    alt={p.name}
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />

                  {/* Gradient shadow at bottom of photo */}
                  <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent"></div>

                  {/* Floating Flag Badge on top left */}
                  <div className="absolute top-4 left-4 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 flex items-center gap-2 shadow-lg">
                    <img src="/images/bgrs-official-flag.png" alt="Flag" className="w-5 h-3.5 object-cover rounded-xs" />
                    <span className="text-[11px] font-bold text-amber-300 tracking-wider">BGRS EXECUTIVE</span>
                  </div>

                  {/* Official Verified Badge on top right */}
                  <div className="absolute top-4 right-4 bg-emerald-800 text-white border border-emerald-600 rounded-full p-1.5 shadow-lg" title="Official Verified Portrait">
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                  </div>

                  {/* Text on bottom of photo */}
                  <div className="absolute bottom-4 inset-x-4 text-center">
                    <h3 className="text-xl sm:text-2xl font-black text-white font-serif tracking-wide drop-shadow-md">
                      {p.name}
                    </h3>
                    <p className="text-xs text-amber-400 font-semibold tracking-wider mt-0.5 uppercase drop-shadow-sm">
                      {p.role}
                    </p>
                    <div className="inline-block mt-2 bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 px-3 py-0.5 rounded-full text-[11px] font-medium">
                      {p.tenure}
                    </div>
                  </div>
                </div>

              </div>

              {/* Photo Switcher / Gallery Controls (Allows toggling between Standing Portrait and Press Conference) */}
              <div className="flex items-center gap-3 mt-5 bg-slate-100 p-1.5 rounded-xl border border-slate-200">
                <button
                  onClick={() => setActivePhoto('official')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePhoto === 'official' 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Standing Portrait</span>
                </button>

                <button
                  onClick={() => setActivePhoto('press')}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activePhoto === 'press' 
                      ? 'bg-emerald-800 text-white shadow-sm' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <Mic className="w-3.5 h-3.5 text-amber-400" />
                  <span>Executive Briefing</span>
                </button>
              </div>

            </div>

            {/* Right Column: Tabbed Content, Vision, Biography, Key Pillars (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Navigation Tabs for President Page */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
                <button
                  onClick={() => setActiveTab('vision')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
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
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
                    activeTab === 'pillars' 
                      ? 'bg-[#0d4a2c] text-white shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  <span>Key Priorities</span>
                </button>

                <button
                  onClick={() => setActiveTab('bio')}
                  className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center gap-2 ${
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
                    <Quote className="w-12 h-12 text-amber-500/20 absolute top-4 right-4" />
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

              {/* Tab 3: Detailed Biography */}
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
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-emerald-900/30 flex items-center gap-2"
                >
                  <Mic className="w-4 h-4 text-amber-400" />
                  <span>{p.viewSpeeches}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>

                <a
                  href="#services"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-emerald-700" />
                  <span>Message the President</span>
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
