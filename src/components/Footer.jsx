import React from 'react';
import { Shield, ExternalLink } from 'lucide-react';

export function Footer({ content, setActiveSection }) {
  const f = content.footer;

  const navigateTo = (section) => {
    if (setActiveSection) {
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t-2 border-emerald-800/80 transition-colors duration-300">
      {/* Sleek, Non-Bulky Ministerial Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Identity & Seal */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <img 
              src="/images/bgrs-emblem-new.png" 
              alt="BGRS Emblem" 
              className="w-10 h-10 object-contain drop-shadow-sm cursor-pointer" 
              onClick={() => navigateTo('home')}
            />
            <div>
              <div 
                className="text-white font-bold text-sm tracking-wide uppercase cursor-pointer hover:text-amber-400 transition-colors"
                onClick={() => navigateTo('home')}
              >
                {content.meta.region}
              </div>
              <div className="text-amber-400 text-xs font-medium">
                {content.meta.office} • {content.meta.hq}
              </div>
            </div>
          </div>

          {/* Inline Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300">
            <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.home}</button>
            <button onClick={() => navigateTo('president')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.president}</button>
            <button onClick={() => navigateTo('initiatives')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.initiatives}</button>
            <button onClick={() => navigateTo('news')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.news}</button>
            <button onClick={() => navigateTo('administration')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.administration}</button>
            <button onClick={() => navigateTo('services')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.services}</button>
            <button onClick={() => navigateTo('contact')} className="hover:text-amber-400 transition-colors cursor-pointer">{content.nav.contact}</button>
          </nav>

          {/* Federal Portals Links */}
          <div className="flex items-center gap-3 text-xs">
            <a 
              href="https://www.pmo.gov.et" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white text-slate-400 transition-colors flex items-center gap-1 group"
              title="Office of the Prime Minister of Ethiopia"
            >
              <span>PMO Ethiopia</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href="https://www.ena.et" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white text-slate-400 transition-colors flex items-center gap-1 group"
            >
              <span>ENA</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
            </a>
            <span className="text-slate-700">•</span>
            <a 
              href="https://nbe.gov.et" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white text-slate-400 transition-colors flex items-center gap-1 group"
            >
              <span>NBE</span>
              <ExternalLink className="w-3 h-3 text-slate-500 group-hover:text-amber-400" />
            </a>
          </div>

        </div>

        {/* Bottom Legal / Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>© 2026 Office of the President, Benishangul Gumuz Regional State. All rights reserved.</span>
          </div>
          <div className="text-slate-500">
            Official Portal • Assosa, Ethiopia
          </div>
        </div>
      </div>
    </footer>
  );
}
