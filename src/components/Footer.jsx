import React from 'react';
import { ExternalLink, MapPin, Phone, Mail, Clock, ArrowUp } from 'lucide-react';

const federalPortals = [
  { label: 'Office of the Prime Minister', href: 'https://www.pmo.gov.et' },
  { label: 'Ethiopian News Agency', href: 'https://www.ena.et' },
  { label: 'National Bank of Ethiopia', href: 'https://nbe.gov.et' },
];

export function Footer({ content, setActiveSection }) {
  const f = content.footer;
  const m = content.meta;

  const links = ['home', 'president', 'initiatives', 'news', 'administration', 'services', 'contact'];

  const ColumnTitle = ({ children }) => (
    <div className="mb-6">
      <h4 className="font-serif text-lg text-white mb-3">{children}</h4>
      <span className="block w-8 h-[2px] bg-[#dab26a]" />
    </div>
  );

  return (
    <footer className="bg-[#0e2f45] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
        {/* Identity */}
        <div className="lg:col-span-4">
          <button onClick={() => setActiveSection('home')} className="flex items-center gap-3 mb-6 text-left cursor-pointer">
            <img src="/images/bgrs-emblem-new.png" alt="BGRS Emblem" className="w-14 h-14 object-contain" />
            <span>
              <span className="block font-serif text-white text-base leading-tight">{m.office}</span>
              <span className="block eyebrow !text-[9px] text-[#dab26a] mt-1">{m.region}</span>
            </span>
          </button>
          <p className="text-sm text-slate-400 leading-relaxed">{f.aboutText}</p>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2">
          <ColumnTitle>{f.quickLinks}</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {links.map((id) => (
              <li key={id}>
                <button onClick={() => setActiveSection(id)} className="hover:text-[#dab26a] transition-colors cursor-pointer text-left">
                  {content.nav[id]}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Federal portals */}
        <div className="lg:col-span-3">
          <ColumnTitle>{f.federalLinks}</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {federalPortals.map((p) => (
              <li key={p.href}>
                <a href={p.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-[#dab26a] transition-colors group">
                  {p.label}
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#dab26a]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="lg:col-span-3">
          <ColumnTitle>{f.contactHq}</ColumnTitle>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="w-4 h-4 mt-1 text-[#dab26a] flex-shrink-0" />
              <span>{f.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-1 text-[#dab26a] flex-shrink-0" />
              <span>{m.hotline}</span>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="w-4 h-4 mt-1 text-[#dab26a] flex-shrink-0" />
              <a href={`mailto:${m.email}`} className="hover:text-white">{m.email}</a>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-4 h-4 mt-1 text-[#dab26a] flex-shrink-0" />
              <span>{m.workingHours}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <span>{f.copyright}</span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 eyebrow !text-[10px] text-slate-300 hover:text-[#dab26a] transition-colors cursor-pointer"
          >
            Back to top
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="bgrs-flag-bar w-full" />
      </div>
    </footer>
  );
}
