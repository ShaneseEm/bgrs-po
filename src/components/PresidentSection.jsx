import React from 'react';
import { Quote, FileText, Mic, Award, CheckCircle2, ChevronRight, Mail } from 'lucide-react';

export function PresidentSection({ content, onOpenSpeeches }) {
  const p = content.presidentSection;

  return (
    <section id="president" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      {/* Subtle background seal watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 opacity-[0.03] pointer-events-none">
        <img src="/images/emblem.svg" alt="" className="w-[600px] h-[600px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-amber-600" />
            <span>{p.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif uppercase">
            {p.title}
          </h2>
          <div className="w-20 h-1 bg-amber-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* President Profile Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              
              {/* Gold frame shadow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-amber-500 via-emerald-700 to-amber-600 rounded-2xl opacity-40 blur-xs group-hover:opacity-60 transition duration-500"></div>
              
              <div className="relative bg-slate-900 rounded-xl overflow-hidden shadow-xl border-2 border-amber-500/80">
                <img 
                  src="/images/president-portrait.svg" 
                  alt={p.name}
                  className="w-full h-auto object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />

                <div className="bg-gradient-to-t from-slate-950 via-slate-900/90 to-transparent p-5 text-center">
                  <h3 className="text-xl font-bold text-white font-serif tracking-wide">{p.name}</h3>
                  <p className="text-xs text-amber-400 font-medium mt-0.5">{p.role}</p>
                </div>
              </div>

              {/* Verified Presidential Seal Badge */}
              <div className="absolute -bottom-4 right-4 bg-emerald-800 text-white border-2 border-amber-400 rounded-full px-3.5 py-1 text-xs font-bold shadow-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>Verified Executive</span>
              </div>

            </div>
          </div>

          {/* Details & Quote Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Presidential Quote Box */}
            <div className="relative bg-slate-50 border-l-4 border-amber-500 p-6 sm:p-8 rounded-r-xl shadow-xs">
              <Quote className="w-10 h-10 text-amber-500/30 absolute top-4 right-4" />
              <p className="text-lg sm:text-xl italic font-serif text-slate-800 leading-relaxed">
                "{p.quote}"
              </p>
              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-900">{p.name}</span>
                  <span className="text-xs text-slate-500 block">{p.role}</span>
                </div>
                <img src="/images/emblem.svg" alt="" className="w-8 h-8 opacity-40" />
              </div>
            </div>

            {/* Bio Excerpt */}
            <p className="text-slate-600 leading-relaxed text-base">
              {p.bioExcerpt}
            </p>

            {/* Key Leadership Metrics / Achievements */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="bg-emerald-50/70 border border-emerald-100 p-4 rounded-lg flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-emerald-800 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-emerald-950">{p.decreeCount}</div>
                  <div className="text-xs text-slate-500">Executive Reforms & Directives</div>
                </div>
              </div>

              <div className="bg-amber-50/70 border border-amber-100 p-4 rounded-lg flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center flex-shrink-0">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-sm font-bold text-amber-950">{p.speechesCount}</div>
                  <div className="text-xs text-slate-500">Public & Policy Addresses</div>
                </div>
              </div>
            </div>

            {/* Action Links */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#news"
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-md font-semibold text-sm transition-all shadow-sm flex items-center gap-2"
              >
                <span>{p.viewSpeeches}</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#services"
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-5 py-2.5 rounded-md font-semibold text-sm transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-emerald-700" />
                <span>Message the President</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
