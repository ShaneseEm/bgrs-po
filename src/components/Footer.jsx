import React, { useState } from 'react';
import { Shield, ExternalLink, ArrowRight, Check, Heart, Mail, Sparkles } from 'lucide-react';

export function Footer({ content }) {
  const f = content.footer;
  const [emailSub, setEmailSub] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!emailSub) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmailSub('');
    }, 2000);
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 border-t-4 border-amber-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Emblem + About (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/images/bgrs-emblem-new.png" alt="BGRS Official Emblem" className="w-16 h-16 object-contain" />
              <img src="/images/bgrs-flag-new.png" alt="BGRS Official Flag" className="w-12 h-8 object-cover rounded shadow-xs border border-slate-700 hidden sm:block" />
              <div>
                <h3 className="text-white font-bold font-serif text-lg leading-tight uppercase">
                  {content.meta.region}
                </h3>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                  {content.meta.office}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-light">
              {f.aboutText}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Subscribe to Executive Press Releases</span>
              </div>
              {subscribed ? (
                <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs py-2 px-3 rounded-lg flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Subscribed to regional press dispatches!</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input 
                    type="email" 
                    required
                    value={emailSub}
                    onChange={(e) => setEmailSub(e.target.value)}
                    placeholder="Enter official email..."
                    className="bg-slate-900 border border-slate-700 rounded-lg px-3.5 py-2 text-xs text-white placeholder-slate-500 flex-1 focus:outline-hidden focus:border-amber-400"
                  />
                  <button 
                    type="submit"
                    className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-lg transition-colors cursor-pointer uppercase tracking-wider"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif border-b border-slate-800 pb-2">
              {f.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#president" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.president}</span>
                </a>
              </li>
              <li>
                <a href="#initiatives" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.initiatives}</span>
                </a>
              </li>
              <li>
                <a href="#news" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.news}</span>
                </a>
              </li>
              <li>
                <a href="#administration" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.administration}</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.services}</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-500" />
                  <span>{content.nav.contact}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Federal Governmental Links (4 Cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-serif border-b border-slate-800 pb-2">
              {f.federalLinks}
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="https://www.pmo.gov.et" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-400 hover:text-white group"
                >
                  <span>Prime Minister's Office (pmo.gov.et)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.ena.et" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-400 hover:text-white group"
                >
                  <span>Ethiopian News Agency (ENA)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://nbe.gov.et" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-400 hover:text-white group"
                >
                  <span>National Bank of Ethiopia (NBE)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://mowr.gov.et" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-400 hover:text-white group"
                >
                  <span>Ministry of Water & Energy (GERD Coordination)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://moa.gov.et" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-amber-400 transition-colors flex items-center justify-between text-slate-400 hover:text-white group"
                >
                  <span>Ministry of Agriculture</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400" />
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>

      {/* Bottom Legal, Design & Copyright Ribbon */}
      <div className="bg-black py-4 px-4 sm:px-6 lg:px-8 border-t border-slate-900 text-[11px] text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>{f.copyright}</span>
          </div>

          <div className="text-slate-400">
            {f.designedNotice}
          </div>
        </div>
      </div>
    </footer>
  );
}
