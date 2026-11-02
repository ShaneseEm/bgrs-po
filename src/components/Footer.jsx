import React, { useState } from 'react';
import { Shield, ExternalLink, ArrowRight, Check, Heart, Mail } from 'lucide-react';

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
              <img src={content.meta.emblem || "/images/emblem.png"} alt="BGRS Emblem" className="w-14 h-14 object-contain" />
              <div>
                <h3 className="text-white font-bold font-serif text-lg leading-tight uppercase">
                  {content.meta.region}
                </h3>
                <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
                  {content.meta.office}
                </p>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {f.aboutText}
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>Subscribe to Executive Press Releases</span>
              </div>
              {subscribed ? (
                <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 text-xs py-2 px-3 rounded flex items-center gap-2">
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
                    className="bg-slate-900 border border-slate-700 rounded px-3 py-2 text-xs text-white placeholder-slate-500 flex-1 focus:outline-hidden focus:border-amber-400"
                  />
                  <button 
                    type="submit"
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3.5 py-2 rounded text-xs uppercase tracking-wider transition-colors"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Col 2: Quick Links (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold font-serif text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              {f.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#president" className="hover:text-amber-400 transition-colors">President's Biography</a></li>
              <li><a href="#initiatives" className="hover:text-amber-400 transition-colors">GERD Mega-Project</a></li>
              <li><a href="#initiatives" className="hover:text-amber-400 transition-colors">Mineral & Gold Policies</a></li>
              <li><a href="#news" className="hover:text-amber-400 transition-colors">Official Communiqués</a></li>
              <li><a href="#administration" className="hover:text-amber-400 transition-colors">Zonal Administrations</a></li>
              <li><a href="#services" className="hover:text-amber-400 transition-colors">Public Petitions</a></li>
            </ul>
          </div>

          {/* Col 3: Federal Portals (Modeled after PMO Ethiopia) (2 Cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold font-serif text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              {f.federalLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://www.pmo.gov.et" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>PMO Ethiopia</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://mfa.gov.et" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>Foreign Affairs</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://mowe.gov.et" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>Water & Energy</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.ena.et" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>Ethiopian News Agency</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.nbe.gov.et" target="_blank" rel="noreferrer" className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <span>National Bank of Ethiopia</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Executive Address & Seal (3 Cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold font-serif text-sm uppercase tracking-wider border-b border-slate-800 pb-2">
              {f.contactHq}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              {f.address}
            </p>
            <div className="pt-2 text-xs text-slate-400 font-mono space-y-1">
              <div>Emergency Hotline: <span className="text-amber-400 font-bold">8181</span></div>
              <div>Direct Line: <span className="text-slate-200">+251 57 775 0012</span></div>
              <div>Postal Box: 32, Assosa, Ethiopia</div>
            </div>
            <div className="pt-2 text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
              <Shield className="w-3.5 h-3.5 text-amber-400" />
              <span>Official FDRE Regional State Web Node</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Design Credits */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <p>{f.copyright}</p>
          <p className="text-[11px] text-slate-400">
            {f.designedNotice}
          </p>
        </div>

      </div>

      {/* Tricolor Bottom Accent Strip */}
      <div className="ethiopian-tricolor-bar w-full" />
    </footer>
  );
}
